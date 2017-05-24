# Convince me: Why should I use Pact?

* Faster execution.
* Reliable responses from mock service reduce likelihood of flakey tests.
* Causes of failure are easier to identify as only one component is being tested at a time.
* Design of service provider is improved by considering first how the data is actually going to be used, rather than how it is most easily retrieved and serialised.
* No separate integration environment(s) required to be managed for automated integration tests - pact tests run in standalone CI builds.
* Integration flows that would traditionally require running multiple services at the same time can be broken down and each integration point tested separately.

## What if I think end-to-end (E2E) integration tests are good?
Read the following:

* [http://googletesting.blogspot.com.au/2015/04/just-say-no-to-more-end-to-end-tests.html](http://googletesting.blogspot.com.au/2015/04/just-say-no-to-more-end-to-end-tests.html)
* [http://blog.thecodewhisperer.com/permalink/integrated-tests-are-a-scam](http://blog.thecodewhisperer.com/permalink/integrated-tests-are-a-scam)
* and if you're really keen, [Defect Analysis and Prevention for Software Process Quality Improvement](http://www.ijcaonline.org/volume8/number7/pxc3871759.pdf)

Research tells us that integration tests are more costly in terms of time, effort and maintenance without giving us any more guarantees.


## Common Excuses
### ...but I already have a local Mock Server (e.g. VCR, MockServer)

Pact is like VCR in reverse. VCR records actual provider behaviour, and verifies that the consumer behaves as expected. Pact records consumer behaviour, and verifies that the provider behaves as expected. The advantages Pact provides are:

* The ability to develop the consumer (eg. a Javascript rich client UI) before the provider (eg. the JSON backend API).
* The ability to drive out the requirements for your provider first, meaning you implement exactly and only what you need in the provider.
* Well documented use cases ("Given ... a request for ... will return ...") that show exactly how a provider is being used.
* The ability to see exactly which fields each consumer is interested in, allowing unused fields to be removed, and new fields to be added in the provider API without impacting a consumer.
* The ability to immediately see which consumers will be broken if a change is made to the provider API.
* When using the [Pact Broker](https://github.com/bethesque/pact_broker), the ability to map the relationships between your services.

See [https://github.com/realestate-com-au/pact/wiki/FAQ#how-does-pact-differ-from-vcr](https://github.com/realestate-com-au/pact/wiki/FAQ#how-does-pact-differ-from-vcr) for more examples of similar technologies.

### ...but I use Swagger/OpenAPI?

OpenAPIs and Pact are designed with different ends in mind. The differences can be summarised below:

The Swagger / OpenAPI specification aims to standardise the description and structure of an API. It can tell you what APIs are available and what fields/structure it expects and can generate documentation/UI to interact with one. What it is not, is a testing framework.

Pact on the other hand, is essentially a unit testing framework using _specification by example_. It just so happens that to be able to run those tests on the API consumer and provider side, it needs to generate an intermediate format to be able to communicate that structure - this is the specification. 

In fact, the authors of the OpenAPI specification predicted such use cases by announcing:

> Additional utilities can also take advantage of the resulting files, such as testing tools.
Potentially, for example, we could use vendor extensions to document this extra metadata that is captured in our spec. This is one way the two projects could come together.

If you are using Swagger, maybe take a look at [Swagger Request Validator](https://bitbucket.org/atlassian/swagger-request-validator), a plugin developed at Atlassian that aims to unify these worlds.

See [https://github.com/pact-foundation/pact-specification/issues/28](https://github.com/pact-foundation/pact-specification/issues/28) for more.

### ...but I already have an end-to-end (E2E) integration suite that runs for an hour?

There are a few key problems with end-to-end (E2E) testing:

* E2E tests are slow - slow build times result in batching of changes. Batching is bad for Continuous Delivery
* E2E tests are hard to coordinate. How do you ensure the exact correct versions of _all_ software components are exactly as they should be?
* E2E complexity is non-linear - it gets harder and messier over time.
* Why should you care about how other systems behave

The litmus test is this: if you can look someone straight in the eyes, and say that you don't spend a lot of time maintaining E2E environments or have constant challenges managing the tests, then it's time for another approach. If you have one or more people dedicated to managing release processes, this is probably a good sign you are heading in the wrong direction.

If you really want to hang onto these, consider pushing a subset of your E2E scenarios further down your pipeline as a type of "Smoke Test", running just a few key scenarios prior to releasing to customers. 

*NOTE: Obviously, there is an element of not wanting to throw the baby out with the bathwater here. Please factor accordingly *

### ...but I use Docker?
See "but I already have an E2E integration suite that runs for an hour?". All of the problems still exist, but Docker numbs the pain (or defers it).

### ...but our company develops APIs before consumers (e.g. API/Document Driven Design)

Then you are probably developing for _many consumers_, am I right? If you don't know who these consumers are going to be, then Pact may not be for you. If you have control over any of them, then Pact could be a good fit - you just won't be driving the design from the consumer (that's OK too).

### ...but I don't trust you and your dodgy code

Good, you shouldn't. You should evaluate Pact on a smaller project to prove its worthiness before downing the Kool-aid.

In fact, you don't even have to use Pact to implement contract testing and gain the glorious benefits - Pact just makes it easier. 

## OK, I'm convinced but I can't convince my friends

Are you just saying that so we don't feel bad?

Here are some suggestions to win them over:

* Watch some of the great talks over lunch with your team and some popcorn
* [Ask](https://gitter.im/realestate-com-au/pact) one of the pact contributors to do a brown-bag talk at your office or over hangouts
* [Chat](https://gitter.im/realestate-com-au/pact) to us in real-time and we'll see if we can debate as your proxy
