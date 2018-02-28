# Matching

This section describes the various request/response matching techniques available in your `Consumer` tests. Note the examples below demonstrate use of the Ruby DSL, please refer to your particular language and framework as implementations differ.

## Best practice
As a rule of thumb, you generally want to use exact matching when you're setting up the expectations for a request (`upon_receiving(...).with(...)`) because you're under control of the data at this stage, and according to Postel's Law, we want to be "strict" with what we send out. Note that the request matching does not allow "unexpected" values to be present in JSON request bodies.

You want to be _as loose as possible_ with the matching for the response (`will_respond_with(...)`) though. This stops the tests being brittle on the provider side. Generally speaking, it doesn't matter what value the provider actually returns during verification, as long as the types match. When you need certain formats in the values (eg. URLS), you can use `terms` (see docs below). Really really consider before you start introducing too many matchers however - for example, yes, the provider might be currently returning a GUID, but would anything in your consumer really break if they returned a different format of string ID? (If it did, that's a nasty code smell!) Note that during provider verification, following Postel's Law of being "relaxed" with what we accept, "unexpected" values in JSON response bodies are ignored. This is expected and is perfectly OK. Another consumer may have an expectation about that field.

###### NOTE
*If you are writing tests on the `Consumer` side to a different language on the `Provider` side, you must ensure you use a common Pact Specification between them or you will be unable to validate.*

### Regular expressions 

Sometimes you will have keys in a request or response with values that are hard to know beforehand - timestamps and generated IDs are two examples.

What you need is a way to say "I expect something matching this regular expression, but I don't care what the actual value is".

```ruby
animal_service.given("an alligator named Mary exists").
  upon_receiving("a request for an alligator").
  with(
    method: "get",
    path: "/alligators/Mary",
    headers: {"Accept" => "application/json"}).
  will_respond_with(
    status: 200,
    headers: {"Content-Type" => "application/json"},
    body: {
      name: "Mary",
      dateOfBirth: Pact.term(
        generate: "02/11/2013",
        matcher: /\d{2}\/\d{2}\/\d{4}/)
    })
```

Note the use of the `Pact::Term`. When you run the Consumer tests, the mock server will return the value that you specified to "generate", and when you verify the pact in the Provider codebase, it will ensure that the value at that key matches the specified regular expression.

You can also use `Pact::Term` for request matching.

```ruby
animal_service.given("an alligator named Mary exists").
  upon_receiving("a request for an alligator").
  with(
    method: "get",
    path: "/alligators/Mary",
    query: Pact.term(
      generate: "transactionId=1234",
      matcher: /transactionId=\d{4}/),
  will_respond_with(
    status: 200, ...)
```

The `matcher` will be used to ensure that the actual request query was in the right format, and the value specified in the `generate` field will be the one that is replayed against the provider as an example of what a real value would look like. This means that your provider states can still use known values to set up their data, but your Consumer tests can generate data on the fly.

You can use `Pact::Term` for request and response header values, the request query, and inside request and response bodies. Note that regular expressions can only be used on Strings. Furthermore, request queries, when specified as strings are just matched as normal String - no flexible ordering of parameters is catered for. For flexible ordering, specify it as a Hash, which in turn may include `Pact::Terms`

### Type matching

Often, you will not care what the exact value is at a particular path is, you just care that a value is present and that it is of the expected type. For this scenario, you can use `Pact::SomethingLike`(this library is already included in `require 'pact/consumer/rspec'`).

```ruby
animal_service.given("an alligator named Mary exists").
  upon_receiving("a request for an alligator").
  with(
    method: "get",
    path: "/alligators/Mary", 
    headers: {"Accept" => "application/json"}).
  will_respond_with(
    status: 200,
    headers: {"Content-Type" => "application/json"},
    body: Pact.like(
      name: "Mary",
      age: 73)
  )
```

The mock server will return `{"name": "Mary", "age": 73}` in the consumer tests, but when `pact:verify` is run in the provider, it will just check that the type of the `name` value is a String, and that the type of the `age` value is a Fixnum. If you wanted an exact match on "Mary", but to allow any age, you would only wrap the `73` in the `Pact::SomethingLike`. For example:

```ruby
animal_service.given("an alligator named Mary exists").
  upon_receiving("a request for an alligator").
  with(
    method: "get",
    path: "/alligators/Mary", 
    headers: {"Accept" => "application/json"}).
  will_respond_with(
    status: 200,
    headers: {"Content-Type" => "application/json"},
    body: {
      name: "Mary",
      age: Pact.like(73)
    }
  )
```

For request matching, the mock server will allow any values of the same type to be used in the consumer test, but will replay the given values in `pact:verify`.

```ruby
animal_service.given("an alligator named Mary exists").
  upon_receiving("a request to update an alligator").
  with(
    method: "put",
    path: "/alligators/Mary",
    headers: {"Accept" => "application/json"},
    body: {
      age: Pact.like(10)
    }).
  will_respond_with(
    status: 200,
    headers: {"Content-Type" => "application/json"},
    body: {
      age: 10
    })
```

### Query params

Query params can be specified as a string or a hash.
When specified as a string, an exact match will be performed. You may use a Pact::Term, but only over the query string as a whole. Note that the query params must already be URL encoded in the expectation. (This will change for v2 matching.)

```ruby

animal_service.given("some alligators exist").
  upon_receiving("a request to search for alligators").
  with(
    method: "get",
    path: "/alligators",
    query: "name=Mary+Jane&age=8")
  ...

```

Alternatively, if the order of the query parameters does not matter, you can specify the query as a hash. You can embed Pact::Terms or Pact::SomethingLike inside the hash. Remember that all query params will be parsed to strings, so don't use a SomethingLike with a number.

```ruby

animal_service.given("some alligators exist").
  upon_receiving("a request to search for alligators").
  with(
    method: "get",
    path: "/alligators",
    query: {
      # No need to encode params in the hash
      name: 'Mary Jane',
      age: '8',
      # Specify a param with multiple values using an
      # array - order will be enforced
      children: ['Betty', 'Sue']
    })
  ...

```

### Flexible matching
**NOTE:** *Only available in Pact Specification 2.0+*

Flexible length arrays:

```ruby
animal_service.given("an alligator named Mary exists").
  upon_receiving("a request for an alligator").
  with(
    method: "get",
    path: "/alligators/Mary",
    headers: {"Accept" => "application/json"}).
  will_respond_with(
    status: 200,
    headers: {"Content-Type" => "application/json"},
    body: {
      name: "Mary",
      children: each_like(name: "Fred", age: 2)
    })
```

When the provider verification is run, it will ensure that each of the elements in the `children` array has a String name, an Integer age, and that there is at least one element in the array.

To turn the v2 Pact serialisation on, you will need version 1.9.0 of the pact gem, and to configure the `pact_specification_version` in the mock service configuration in the consumer. The provider will pick it up automatically.

```ruby

require 'pact/consumer/rspec'

Pact.service_consumer "Zoo App" do
  has_pact_with "Animal Service" do
    mock_service :animal_service do
      port 1234
      pact_specification_version "2.0.0"
    end
  end
end
```

#### Using v2.0 matching with the Pact Mock Service

To start the standalone pact mock service in v2 matching mode, specify `--pact-specification-version 2.0.0` in the startup options.
