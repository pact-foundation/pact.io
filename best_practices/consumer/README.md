# Consumer

## Use `Pact` for contract testing, not functional testing of the provider

* Functional testing is about ensuring the provider does the right thing with a request. These tests belong in the provider codebase, and it's not the job of the consumer team to be writing them.
* Contract testing is about making sure your consumer team and provider team have a shared understanding of what the requests and responses will be in each possible scenario.
* Pact tests should focus on
  * exposing _bugs_ in how the consumer creates the requests or handles responses
  * exposing _misunderstandings_ about how the provider will respond
* Pact tests should **not** focus on
  * exposing bugs in the provider \(though this might come up as a by product\)

You can read more about the difference between contract and functional tests [here](contract_tests_not_functional_tests.md).

**The rule of thumb for working out what to test or not test is - if I don't include this scenario, what bug in the consumer or what misunderstanding about how the provider responds might be missed. If the answer is none, don't include it.**

## Use `Pact` for isolated \(unit\) tests

* as a mock \(calls to mocks are verified after a test\) not a stub \(calls to stubs are not verified\). Using `Pact` as a stub defeats the purpose of using `Pacts`.
* for _isolated tests_ \(ie. unit tests\) of the class\(es\) that will be responsible for making the HTTP calls from your `Consumer` application to your `Provider` application, not for integrated tests of your entire consumer codebase.
* _carefully_, for any sort of functional or integrated tests within your consumer codebase.

**Why?**

If you use `Pact` with exact matching for integrated tests, you will drive yourself nuts. You will have very brittle `Consumer` tests, as `Pact` checks every outgoing path, JSON node, query param and header. You will also end up with a cartesian explosion of interactions that need to be verified on the `Provider` side. This will increase the amount of time you spend getting your `Provider` tests to pass, without usefully increasing the amount of test coverage.

## Think carefully about how you use it for non-isolated tests \(functional, integration tests\)

* Keep your isolated, exact match tests. These will make sure that you’re mapping the right data from your domain objects into your requests.
* For the integration tests, use loose, type based matching for the requests to avoid brittleness, and pull out the setup into a method that can be shared between tests so that you do not end up with a million interactions to verify \(this will help because the interactions collection in the `Pact` acts like a set, and discards exact duplicates\).

If you don’t care about verifying your interactions, you could use something like Webmock for your integrated tests, and use shared fixtures for requests/responses between these tests and the `Pact` tests to ensure that you have some level of verification happening.

## Make the latest pact available to the `Provider` via a URL

See [Sharing pacts between `Consumer` and `Provider`](https://github.com/pact-foundation/pact-ruby/wiki/Sharing-pacts-between-consumer-and-provider) for options to implement this.

## Ensure all calls to the `Provider` go through classes that have been tested with `Pact`

Do not hand create any HTTP requests directly in your `Consumer` app. Testing through a client class \(a class with the sole responsibility of handling the HTTP interactions with the `Provider`\) gives you much more assurance that your `Consumer` app will be creating the HTTP requests that you think it should.

## Ensure the models you use in other tests could actually be created from the responses you expect

Sure, you’ve checked that your client deserialises the HTTP response into the Alligator you expect, but then you need to make sure when you create an Alligator in another test, that you create it with valid attributes \(eg. is the Alligator’s last\_login\_time a Time or a DateTime?\). One way to do this is to use factories or fixtures to create the models for all your tests. See this [gist](https://gist.github.com/bethesque/69ae590e8312523e5337) for a more detailed explanation.

## Beware of Garbage In, Garbage Out with PUT/POST/PATCH

Each interaction is tested in isolation, meaning you can’t do a PUT/POST/PATCH, and then follow it with a GET to ensure that the values you sent were actually read successfully by the `Provider`. For example, if you have an optional `surname` field, and you send `lastname` instead, a `Provider` will most likely ignore the misnamed field, and return a 200, failing to alert you to the fact that your `lastname` has gone to the big `/dev/null` in the sky.

To ensure you don’t have a Garbage In Garbage Out situation, expect the response body to contain the newly updated values of the resource, and all will be well.

If, for performance reasons, you don’t want to include the updated resource in the response, another way to avoid GIGO is to use a shared fixture between a GET response body, and a PUT/POST request body. That way, you know that the fields you are PUTing or POSTing are the same fields that you will be GETing.

## Use `can-i-deploy`

Use the [can-i-deploy](../../pact_broker/advanced_topics/provider_verification_results.md) feature of the [Pact Broker CLI](https://github.com/pact-foundation/pact_broker-client#can-i-deploy). It will give you a definitive answer if the version of your consumer that is being deployed, is compatible with all of its providers.

