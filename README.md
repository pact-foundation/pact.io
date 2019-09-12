# Introduction

![](.gitbook/assets/pact-logo.png)

Pact is a contract testing tool. Contract tests assert that inter-application messages conform to a shared understanding which is documented in a contract. Without contract testing, the only way to ensure that applications will work correctly together is by using expensive and brittle integration tests.

Do you [set your house on fire to test your smoke alarm?](https://dius.com.au/2014/05/19/simplifying-micro-service-testing-with-pacts/) No, you test the contract it holds with your ears by using the testing button. Pact provides that testing button for your code, allowing you to safely confirm that your applications will work together without having to deploy the world first.

## Contract Testing

Contract testing ensures that a pair of applications will work correctly together by using automated test suites that check each application in isolation to ensure that the messages they exchange conform to a shared understanding which is documented in a "contract".

In practise, a common way of achieving this is to check that all the calls to your test doubles [return the same results](https://martinfowler.com/bliki/ContractTest.html) as a call to the real application would.

Contract testing is immediately applicable anywhere where you have two services that need to communicate - such as an API client and a web front-end. Although a single client and a single service is a common use case, contract testing really shines in an environment with many services \(as is common for a microservice architecture\). Having well-formed contract tests makes it easy for developers to avoid version hell. Contract testing is the killer app for microservice development and deployment.

In general, a contract is between a _consumer_ \(for example, a client that wants to receive some data\) and a _provider_ \(for example, an API on a server that provides the data the client needs\). In microservice architectures, the traditional terms _client_ and _server_ are not always appropriate -- for example, when communication is achieved through message queues. For this reason, we stick to _consumer_ and _provider_ in this documentation.

## Consumer Driven Contracts

Pact is a [consumer-driven](http://martinfowler.com/articles/consumerDrivenContracts.html) contract testing tool. This means the contract is written as part of the consumer tests. A major advantage of this pattern is that only parts of the communication that are actually used by the consumer\(s\) get tested. This in turn means that any provider behaviour not used by current consumers is free to change without breaking tests.

Unlike a schema or specification \(eg. OAS\), which is a static artifact that describes all possible states of a resource, a Pact contract is enforced by executing a collection of test cases, each of which describes a single concrete request/response pair - Pact is, in effect, "contract by example".

## Next steps

To learn more, read [how a pact test works](how_pact_works.md).

