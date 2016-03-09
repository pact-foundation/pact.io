# Terminology

### Service Consumer
A component that initiates a HTTP request to another component (the service `Provider`). Note that this does not depend on the way the data flows - whether it is a `GET` or a `PUT` / `POST` / `PATCH`, the `Consumer` is the initiator of the HTTP request.

### Service Provider
A server that responds to an HTTP request from another component (the service consumer).

### Mock Service Provider
Used by tests in the `Consumer` project to mock out the actual service `Provider`, meaning that integration-like tests can be run without requiring the actual service `Provider` to be available.

### Pact file
A file containing the JSON serialised requests and responses that were defined in the `Consumer` tests. This is the `Contract`.

### Pact verification
To verify a `Pact`, the requests contained in a `Pact` file are replayed against the `Provider` code, and the responses returned are checked to ensure they match those expected in the `Pact` file.

### Provider state
A name describing a “state” (like a fixture) that the `Provider` should be in when a given request is replayed against it - e.g. “when user John Doe exists” or “when user John Doe has a bank account”.

A `Provider` state name is specified when writing the `Consumer` specs, then, when the pact verification is set up in the `Provider` the same name will be used to identify the set up code block that should be run before the request is executed.
