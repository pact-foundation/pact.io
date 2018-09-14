# Terminology

## Service Consumer

A component that initiates a HTTP request to another component \(the service _provider_\). Note that this does not depend on the way the data flows - whether it is a `GET` or a `PUT` / `POST` / `PATCH`, the _consumer_ is the initiator of the HTTP request.

## Service Provider

A server that responds to an HTTP request from another component \(the service consumer\). A service provider may have one or more HTTP endpoints, and should be thought of as the "deployable unit" - endpoints that get deployed together should be considered part of the same provider.

## Mock Service Provider

Used by tests in the consumer project to mock out the actual service provider, meaning that integration-like tests can be run without requiring the actual service provider to be available.

## Interaction

A request and response pair. A pact consists of a collection of _interactions_.

## Pact file

A file containing the JSON serialised interactions \(requests and responses\) that were defined in the consumer tests. This is the _Contract_. A Pact defines:

* the consumer name
* the provider name
* a collection of interactions
* the pact specification version \(see below\)

## Pact verification

To verify a _Pact contract_, the requests contained in a _Pact file_ are replayed against the provider code, and the responses returned are checked to ensure they match those expected in the Pact file.

## Provider state

A name describing a “_state_” \(like a fixture\) that the provider should be in when a given request is replayed against it - e.g. “when user John Doe exists” or “when user John Doe has a bank account”. These allow the same endpoint to be tested under different scenarios.

A provider state name is specified when writing the consumer specs, then, when the pact verification is set up in the provider the same name will be used to identify the set up code block that should be run before the request is executed.

## Pact Specification

The [Pact Specification](https://github.com/pact-foundation/pact-specification) is a document that governs the structure of the actual generated Pact files to allow for interoperability between languages \(consider, for example, a JavaScript consumer connecting to a Scala JVM-based provider\) , using semantic versioning to indicate breaking changes.

Each language implementation of Pact needs to implement the rules of this specification, and advertise which version\(s\) are supported, corresponding closely to which features are available.

The current version of the specification is [3.0](https://github.com/pact-foundation/pact-specification/tree/version-3) for the JVM implementation, and [2.0](https://github.com/pact-foundation/pact-specification/tree/version-2) for all others.

