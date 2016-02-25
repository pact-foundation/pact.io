---
layout: page
title: Best Practices
---

## In your consumer project

### Use Pact for isolated (unit) tests, think carefully about how you use it for integrated tests.

Use Pact:

1. as a _mock_ (calls to mocks are verified after a test) not a stub (calls to stubs are not verified). Using Pact as a stub defeats the purpose of using Pacts.
2. for _isolated tests_ (ie. unit tests) of the class(es) that will be responsible for making the HTTP calls from your consumer application to your provider application, not for integrated tests of your entire consumer codebase.
3. _carefully_, for any sort of functional or integrated tests within your consumer codebase.

Why? If you use Pact with exact matching for integrated tests, you will drive yourself nuts. You will have very brittle consumer tests, as Pact checks every outgoing path, JSON node, query param and header. You will also end up with a cartesian explosion of interactions that need to be verified on the provider side. This will increase the amount of time you spend getting your provider tests to pass, without usefully increasing the amount of test coverage.

If you want to use Pact for non-isolated tests (functional, integration tests):

1. Keep your isolated, exact match tests. These will make sure that you're mapping the right data from your domain objects into your requests.
2. For the integration tests, use loose, [type based matching](https://github.com/realestate-com-au/pact/wiki/Regular-expressions-and-type-matching-with-Pact#type-matching) for the requests to avoid brittleness, and pull out the setup into a method that can be shared between tests so that you do not end up with a million interactions to verify (this will help because the interactions collection in the Pact acts like a set, and discards exact duplicates).

If you don't care about verifying your interactions, you could use something like Webmock for your integrated tests, and use shared fixtures for requests/responses between these tests and the Pact tests to ensure that you have some level of verification happening.

### Make the latest pact available to the provider via a URL

See [Sharing pacts between consumer and provider](https://github.com/realestate-com-au/pact/wiki/Sharing-pacts-between-consumer-and-provider) for options to implement this.

### Ensure all calls to the provider go through classes that have been tested with Pact

Do not hand create any HTTP requests directly in your consumer app. Testing through a client class (a class with the sole responsibility of handling the HTTP interactions with the provider) gives you much more assurance that your consumer app will be creating the HTTP requests that you think it should.

### Ensure the models you use in other tests could actually be created from the responses you expect

Sure, you've checked that your client deserialises the HTTP response into the Alligator you expect, but then you need to make sure when you create an Alligator another test, that you create it with valid attributes (eg. is the Alligator's last_login_time a Time or a DateTime?). One way to do this is to use factories or fixtures to create the models for all your tests. See this gist for a more detailed explanation.

### Beware of Garbage In Garbage Out with PUT/POST/PATCH

Each interaction is tested in isolation, meaning you can't do a PUT/POST/PATCH, and then follow it with a GET to ensure that the values you sent were actually read successfully by the provider. For example, if you have an optional `surname` field, and you send `lastname` instead, a provider will most likely ignore the misnamed field, and return a 200, failing to alert you to the fact that your `lastname` has gone to the big /dev/null in the sky.

To ensure you don't have a Garbage In Garbage Out situation, expect the response body to contain the newly updated values of the resource, and all will be well.

If, for performance reasons, you don't want to include the updated resource in the response, another way to avoid GIGO is to use a shared fixture between a GET response body, and a PUT/POST request body. That way, you know that the fields you are PUTing or POSTing are the same fields that you will be GETing.

## In your provider project

### Ensure that the latest pact is being verified

Use a URL that you know the latest pact will be made available at. Do not rely on manual intervention (eg. someone copying a file across to the provider project) because this process will inevitably break down, and your verification task will give you a false positive. Do not try to "protect" your build from being broken by instigating a manual pact update process. pact:verify is the canary of your integration - manual updates would be like giving your canary a gas mask.

### Ensure that pact `verify` runs as part of your CI build

It should run with all your other tests.

### Only stub layers beneath where contents of the request body are extracted

If you don't have to stub anything in the provider when running pact `verify`, then don't. If you do need to stub something (eg. a downstream system), make sure that you only stub the code that gets executed after the contents of the request body have been extracted and validated. Otherwise, you could send any old garbage in a POST or PUT body, and no test would fail.

### Stub calls to downstream systems

Consider making a separate pact with the downstream system and using shared fixtures.
