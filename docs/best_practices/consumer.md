# Consumer Best Practices
### Use `Pact` for isolated (unit) tests

* as a mock (calls to mocks are verified after a test) not a stub (calls to stubs are not verified). Using `Pact` as a stub defeats the purpose of using `Pacts`.
* for *isolated tests* (ie. unit tests) of the class(es) that will be responsible for making the HTTP calls from your `Consumer` application to your `Provider` application, not for integrated tests of your entire consumer codebase.
* *carefully*, for any sort of functional or integrated tests within your consumer codebase.

**Why?**

If you use `Pact` with exact matching for integrated tests, you will drive yourself nuts. You will have very brittle `Consumer` tests, as `Pact` checks every outgoing path, JSON node, query param and header. You will also end up with a cartesian explosion of interactions that need to be verified on the `Provider` side. This will increase the amount of time you spend getting your `Provider` tests to pass, without usefully increasing the amount of test coverage.

### Think carefully about how you use it for non-isolated tests (functional, integration tests)

* Keep your isolated, exact match tests. These will make sure that you’re mapping the right data from your domain objects into your requests.
* For the integration tests, use loose, type based matching for the requests to avoid brittleness, and pull out the setup into a method that can be shared between tests so that you do not end up with a million interactions to verify (this will help because the interactions collection in the `Pact` acts like a set, and discards exact duplicates).

If you don’t care about verifying your interactions, you could use something like Webmock for your integrated tests, and use shared fixtures for requests/responses between these tests and the `Pact` tests to ensure that you have some level of verification happening.

### Make the latest pact available to the `Provider` via a URL

See [Sharing pacts between `Consumer` and `Provider`](https://github.com/realestate-com-au/pact/wiki/Sharing-pacts-between-consumer-and-provider) for options to implement this.

### Ensure all calls to the `Provider` go through classes that have been tested with `Pact`

Do not hand create any HTTP requests directly in your `Consumer` app. Testing through a client class (a class with the sole responsibility of handling the HTTP interactions with the `Provider`) gives you much more assurance that your `Consumer` app will be creating the HTTP requests that you think it should.

### Ensure the models you use in other tests could actually be created from the responses you expect

Sure, you’ve checked that your client deserialises the HTTP response into the Alligator you expect, but then you need to make sure when you create an Alligator another test, that you create it with valid attributes (eg. is the Alligator’s last_login_time a Time or a DateTime?). One way to do this is to use factories or fixtures to create the models for all your tests. See this gist for a more detailed explanation.

### Beware of Garbage In, Garbage Out with PUT/POST/PATCH

Each interaction is tested in isolation, meaning you can’t do a PUT/POST/PATCH, and then follow it with a GET to ensure that the values you sent were actually read successfully by the `Provider`. For example, if you have an optional `surname` field, and you send `lastname` instead, a `Provider` will most likely ignore the misnamed field, and return a 200, failing to alert you to the fact that your `lastname` has gone to the big `/dev/null` in the sky.

To ensure you don’t have a Garbage In Garbage Out situation, expect the response body to contain the newly updated values of the resource, and all will be well.

If, for performance reasons, you don’t want to include the updated resource in the response, another way to avoid GIGO is to use a shared fixture between a GET response body, and a PUT/POST request body. That way, you know that the fields you are PUTing or POSTing are the same fields that you will be GETing.
