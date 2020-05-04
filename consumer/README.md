# Writing Consumer tests

The art of writing good consumer Pact tests is mostly about knowing what _not_ to test. Getting this right will make the difference between Pact tests that are lightweight and helpful, and Pact tests that make you wish you'd stuck with integration testing. Your Pact tests should be as loose as they possibly can be, while still ensuring that the provider can't make changes that will break compatiblity with the consumer.

{% hint style="warning" %}
It is easy to write brittle, unnecessarily strict, burdensome Pact tests if you don't know what you're doing. It's worth taking the time to make sure you understand what to focus on before starting to write Pact tests for real.
{% endhint %}

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

## Only make assertions about things that will affect the consumer if they change

Avoid the temptation to make assertions about general business rules that you know about the provider \(eg. the customer ID is expected to be in the format `[A-Z][A-Z][A-Z]\-\d\d\d`\). Only make assertions about things that would affect your consumer if they changed \(eg. a link must start with `http` because your app is expecting absolute URLs, and would error if it received a relative one\). This allows the provider to evolve without getting false alerts from unncessarily strict pact verification tests.

## Use `Pact` for isolated \(unit\) tests

* as a mock \(calls to mocks are verified after a test\) not a stub \(calls to stubs are not verified\). Using `Pact` as a stub defeats the purpose of using `Pacts`.
* for _isolated tests_ \(ie. unit tests\) of the class\(es\) that will be responsible for making the HTTP calls from your `Consumer` application to your `Provider` application, not for integrated tests of your entire consumer codebase.
* _carefully_, for any sort of functional or integrated tests within your consumer codebase.

  **Why?**

If you use `Pact` with exact matching for tests that cover multiple layers of your application \(especially your UI\), you will drive yourself nuts. You will have very brittle `Consumer` tests, as `Pact` checks every outgoing path, JSON node, query param and header. You will also end up with a cartesian explosion of interactions that need to be verified on the `Provider` side. This will increase the amount of time you spend getting your `Provider` tests to pass, without usefully increasing the amount of test coverage.

## Avoid using Pact for tests that involve the UI

If you use Pact for your UI tests you will likely end up with:

* consumer tests that are very hard to debug because you will be setting up multiple interactions on the mock server at a time, and potentially using multiple mock servers at a time.
* multiple redundant calls to the same endpoint with slight variations of data that increase the maintenance required, but don't helpfuly increase the amount of test coverage of your API.

Ideally, your Pact tests be scoped to cover as little consumer code as possible while still being a useful exercise \(ie. don't just test a raw HTTP client call\), and use as few mocked interactions at a time as possible.

A better approach than using Pact for UI tests is to use shared fixtures, or the generated pact itself, to provide HTTP stubs for tests that cover all layers of your consumer. Following the "testing pyramid" approach, most of the tests for your UI components should be isolated tests anyway, and tests covering the full stack of your consumer should be kept to a minimum.

## Think carefully about how you use it for non-isolated tests \(functional, integration tests\)

* Keep your isolated, exact match tests. These will make sure that you’re mapping the right data from your domain objects into your requests.
* For the integration tests, use loose, type based matching for the requests to avoid brittleness, and pull out the setup into a method that can be shared between tests so that you do not end up with a million interactions to verify \(this will help because the interactions collection in the `Pact` acts like a set, and discards exact duplicates\).

If you don’t care about verifying your interactions, you could use something like Webmock for your integrated tests, and use shared fixtures for requests/responses between these tests and the `Pact` tests to ensure that you have some level of verification happening.

## Make the latest pact available to the `Provider` via a URL

See [Sharing pacts between `Consumer` and `Provider`](https://github.com/pact-foundation/pact-ruby/wiki/Sharing-pacts-between-consumer-and-provider) for options to implement this.

## Ensure all calls to the `Provider` go through classes that have been tested with `Pact`

Do not hand create any HTTP requests directly in your `Consumer` app. Testing through a client class \(a class with the sole responsibility of handling the HTTP interactions with the `Provider`\) gives you much more assurance that your `Consumer` app will be creating the HTTP requests that you think it should.

## Ensure the models you use in other tests could actually be created from the responses you expect

Sure, you’ve checked that your client deserialises the HTTP response into the Alligator class you expect, but then you need to make sure when you create an Alligator in another test, that you create it with valid attributes \(eg. is the Alligator’s last\_login\_time a Time or a DateTime?\). One way to do this is to use factories or fixtures to create the models for all your tests. See this [gist](https://gist.github.com/bethesque/69ae590e8312523e5337) for a more detailed explanation.

## Beware of Garbage In, Garbage Out with PUT/POST/PATCH

Each interaction is tested in isolation, meaning you can’t do a PUT/POST/PATCH, and then follow it with a GET to ensure that the values you sent were actually read successfully by the `Provider`. For example, if you have an optional `surname` field, and you send `lastname` instead, a `Provider` will most likely ignore the misnamed field, and return a 200, failing to alert you to the fact that your `lastname` has gone to the big `/dev/null` in the sky.

To ensure you don’t have a Garbage In Garbage Out situation, expect the response body to contain the newly updated values of the resource, and all will be well.

If you can't include the updated resource in the response, another way to avoid GIGO is to use a shared fixture between a GET response body, and a PUT/POST request body. That way, you know that the fields you are PUTing or POSTing are the same fields that you will be GETing.

## Use `can-i-deploy`

Use the [can-i-deploy](https://github.com/pact-foundation/pact_broker/wiki/Provider-verification-results) feature of the [Pact Broker CLI](https://github.com/pact-foundation/pact_broker-client#can-i-deploy). It will give you a definitive answer if the version of your consumer that is being deployed, is compatible with all of its providers.

