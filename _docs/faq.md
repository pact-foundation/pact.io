---
layout: page
title: FAQ
---

* TOC
{:toc}

## Pact

### What does PACT stand for?

It doesn't stand for anything. It is the word "pact", as in, another word for a contract. Google defines a "pact" as "a formal agreement between individuals or parties." That sums it up pretty well.

### What is it good for?

Pact is most valuable for designing and testing integrations where you (or your team/organisation/partner organisation) control the development of both the consumer and the provider, and the requirements of the consumer are going to be used to drive the features of the provider. It is fantastic tool for developing and testing intra-organisation microservices.

### What is it not good for?

- Performance and load testing.
- Functional testing of the provider - that is what the provider's own tests should do. Pact is about checking the contents and format of requests and responses.
- Situations where you cannot load data into the provider without using the API that you're actually testing (eg. public APIs). [Why?](#why-pact-may-not-be-the-best-tool-for-testing-public-apis)
- Testing "pass through" APIs, where the provider merely passes on the request contents to a downstream service without validating them. [Why?](#why-pact-may-not-be-the-best-tool-for-testing-pass-through-apis)

### Why Pact may not be the best tool for testing public APIs

Each interaction in a pact should be verified in isolation, with no context maintained from the previous interactions. Tests that depend on the outcome of previous tests are brittle and land you back in integration test hell, which is the nasty place you're trying to escape by using pacts.

So how do you test a request that requires data to already exist on the provider? Provider states allow you to set up data on the provider by injecting it straight into the datasource before the interaction is run, so that it can make a response that matches what the consumer expects. They also allow the consumer to make the same request with different expected responses (eg. different response codes, or the same resource with a different subset of data).

If you use Pact to test a public API, the only way to set up the right provider state is to use the very API that you're actually testing, which will make the tests slower and more brittle compared to the "normal" pact verification tests.

If this is still a better situation for you than integration testing, or using another tool like VCR, then go for it!

### Why Pact may not be the best tool for testing pass through APIs

During pact verification, Pact does not test the side effects of a request being executed on a provider, it just checks that the response body matches the expected response body. If your API is merely passing on a message to a downstream system (eg. a queue) and does not validate the contents of the body before doing so, you could send anything you like in the request body, and the provider would respond the same way. The "contract" that you really want is between the consumer and the downstream system. Checking that the provider responded with a 200 OK does not give you any confidence that your consumer and the downstream system will work correctly in real life.

What you really need is a "non-HTTP" pact between your consumer and the downstream system. Check out this [gist](https://gist.github.com/bethesque/0ee446a9f93db4dd0697) for an example of how to use the Pact contract generation and matching code to test non-HTTP communications.

### Why is developing and testing with Pact better than using traditional system integration tests?

- Faster execution.
- Reliable responses from mock service reduce likelihood of flakey tests.
- Causes of failure are easier to identify as only one component is being tested at a time.
- Design of service provider is improved by considering first how the data is actually going to be used, rather than how it is most easily retrieved and serialised.
- No separate integration environment required for automated integration tests - pact tests run in standalone CI builds.
- Integration flows that would traditionally require running multiple services at the same time can be broken down and each integration point tested separately.

### Why doesn't Pact use JSON Schema?

Whether you define a schema or not, you will still need a concrete example of the response to return from the mock server, and a concrete example of the request to replay against the provider. If you just used a schema, then the code would have to generate an example, and generated values are not very helpful when used in tests, nor do they give any readable, meaningful documentation. If you use a schema and an example, then you are duplicating effort. The schema can almost be implied from an example. Pact has the ability to specify more flexible matching like "an array of any length" or the type of a field is a number or string.

### Why is there no support for specifying optional attributes?

Firstly, it is assumed that you have control over the provider's data (and consumer's data) when doing the verification tests. If you don't, then maybe Pact is (#what-is-it-good-for)[not the best tool for your situation].

Secondly, if you think about it, if Pact supports making an assertion that element $.body.name may be present in a response, then you write consumer code that can handle an optional $.body.name, but in fact, the provider gives $.body.firstname, no test will ever fail to tell you that you've made an incorrect assumption. Remember that a provider may return extra data without failing the contract, but it must provide at minimum the data you expect.

### How does Pact differ from Pacto?

[Pacto](https://github.com/thoughtworks/pacto) is another Ruby implementation of a library that provides a mock service and provider verification using consumer driven contracts. It differs from Pact in the following ways.

- Pacto has the ability to create contracts by recording interactions with an existing service. This makes the contracts easy to set up.
- Once the Pacto contracts are created, they are static, and are used to verify both the consumer and the provider. This would make it easy to determine whether a broken contract is due to a change in the consumer or a change in the provider.
- Pact's contracts are dynamically generated artefacts. This makes them easier to maintain.
- Pact allows you to make the same request with a different "provider state", allowing you to test different HTTP response codes for the same endpoint, or test the same resource in different states.
- Pact allows you to do regular expression matching.
- Pact has native support for Ruby, the JVM, .Net, Go, PHP and Swift consumers, with a JavaScript wrapper using the Ruby mock server.
- Pact has the [Pact Broker](https://github.com/pact-foundation/pact_broker) which provides auto-generated documentation, network diagrams, and enables cross testing of the production and head versions of your consumer and provider, allowing you to decouple your consumer and provider release cycles.

In summary:

- The ability to record contracts would probably make Pacto a better choice than Pact for stubbing an existing 3rd party service (see their example for Github). The lack of provider states and regular expression matching would probably not matter in this scenario, as you are unlikely to be able to set up data on the provider without using the the very API you are testing.
- Pact is probably a better choice for a new project where the provider service does not yet exist, where the consumer's functionality is driving out the requirements for the provider.

### Do I still need end-to-end tests?

The short answer is: Yes.

The longer answer to this question depends on your organisation's risk profile. There is generally a trade off between the amount of confidence you have that your system is bug free, and the speed with which you can respond to any bugs you find. A 10 hour test suite may make you feel secure that all the functionality of your system is working, but it will decrease your ability to put out a new release quickly when a bug is inevitably found. If you work in an environment where you prioritise "agility" over "stability", then maybe you would be better off investing the time that you would have spent maintaining end-to-end tests in improving your production monitoring. If you work in a more traditional "Big Bang Release" environment, a carefully selected small set of end-to-end tests that focus on the core business value provided by your system should provide the confidence you need to release. Consider "Semantic monitoring" (a type of "testing in production") as an alternative.

Remember that Pact is just one tool in your repertoire of testing tools. You need to use a combination to build
the confidence that you require.

### How can I handle versioning?

Consumer driven contracts to some extent allows you to do away with versioning. As long as all your contract tests pass, you should be able to deploy changes without versioning the API. If you need to make a breaking change to a provider, you can do it in a multiple step process - add the new fields/endpoints to the provider and deploy. Update the consumers to use the new fields/endpoints, then deploy. Remove the old fields/endpoints from the provider and deploy. At each step of the process, all the contract tests remain green.

Using a [Pact Broker](https://github.com/pact-foundation/pact_broker), you can tag the production version of a pact when you make a release of a consumer. Then, any changes that you make to the provider can be checked against the production version of the pact, as well as the latest version, to ensure backward compatibility.

If you need to support multiple versions of the provider API concurrently, then you will probably be specifying which version your consumer uses by setting a header, or using a different URL component. As these are actually different requests, the interactions can be verified in the same pact without any problems.

### How does it work?

1. In the tests for the provider facing code in the consumer project, expectations are set up on a mock service provider.
2. When the tests are run, the mock service returns the expected responses. The requests, and their expected responses, are then written to a "pact" file.
3. The requests in the pact file are later replayed against the provider, and the actual responses are checked to make sure they match the expected responses.

![Pact two parts](/media/pact_two_parts.png "Pact two parts")

### Using pact where the consumer team is different from the provider team

Pact is "consumer driven contracts", not "dictator driven contracts". Just because it's called "consumer driven" doesn't mean that the team writing the consumer gets to write a pact and throw it at the provider team without talking about it. The pact should be the starting point of a collaborative effort.

The way Pact works, it's the pact verification task (in the provider codebase) that fails when a consumer expects things that are different from what a provider responds with, even if the consumer itself is "wrong". This is a little unfortunate, but it's the nature of the beast.

Running the pact verification task in a separate CI build from the rest of the tests for the provider is a good idea - if you have it in the same build, someone is going to get cranky about another team being able to break their build.

It's very important for the consumer team to know when pact verification fails, because it means they cannot deploy the consumer. If the consumer team is using a different CI instance from the provider team, consider how you might communicate to the consumer team when pact verification has failed. You should do one of the following:

* Configure the pact verification build to send an email to the consumer team when the build fails.
* Even better, if you can, have a copy of the provider build run on the consumer CI that just runs the unit tests and pact verification. That way the consumer team has the same red build that the provider team has, and it gives them a vested interest in keeping it green.

Verify a pact by using a URL that you know the latest pact will be made available at. Do not rely on manual intervention (eg. someone copying a file across to the provider project) because this process will inevitably break down, and your verification task will give you a false positive. Do not try to "protect" your build from being broken by instigating a manual pact update process. The pact verify task is the canary of your integration - manual updates would be like giving your canary a gas mask.
