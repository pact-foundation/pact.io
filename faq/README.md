# FAQ

## Table of Contents

* [What is Pact good for?](./#what-is-pact-good-for)
* [What is Pact not good for?](./#what-is-pact-not-good-for)
* [Who would typically implement Pact?](./#who-would-typically-implement-pact)
* [What is the difference between contract testing and functional testing?](./#what-is-the-difference-between-contract-testing-and-functional-testing)
* [Can I generate my pact file from something like Swagger?](./#can-i-generate-my-pact-file-from-something-like-swagger)
* [How do I use Pact with UI frameworks like React or Angular?](./#how-do-i-use-pact-with-ui-frameworks-like-react-or-angular)
* [Why doesn't Pact use JSON Schema?](./#why-doesnt-pact-use-json-schema)
* [Why does Pact use concrete JSON documents rather than using more flexible JSONPaths?](./#why-does-pact-use-concrete-json-documents-rather-than-using-more-flexible-jsonpaths)
* [Why is there no support for specifying optional attributes?](./#why-is-there-no-support-for-specifying-optional-attributes)
* [Why are the pacts generated and not static?](./#why-are-the-pacts-generated-and-not-static)
* [How do I test against the latest development and production versions of consumer APIs?](./#how-do-i-test-against-the-latest-development-and-production-versions-of-consumer-apis)
* [What does PACT stand for?](./#what-does-pact-stand-for)
* [Why Pact may not be the best tool for public testing APIs?](./#why-pact-may-not-be-the-best-tool-for-public-testing-apis)
* [Why Pact may not be the best tool for testing pass through APIs?](./#why-pact-may-not-be-the-best-tool-for-testing-pass-through-apis)
* [Do I still need end-to-end tests?](./#do-i-still-need-end-to-end-tests)
* [Can I use Pact for UI tests?](./#can-i-use-pact-for-ui-tests)
* [How can I handle versioning?](./#how-can-i-handle-versioning)
* [Using Pact where the Consumer team is different from the Provider team](./#using-pact-where-the-consumer-team-is-different-from-the-provider-team)
* [How to prevent a consumer from deploying with an invalid contract](./#how-to-prevent-a-consumer-from-deploying-with-an-invalid-contract)
* [How do I test OAuth or other security headers?](./#how-do-i-test-oauth-or-other-security-headers)
* [How do I deal with a situation where there are multiple systems involved in a scenario?](./#how-do-i-deal-with-a-situation-where-there-are-multiple-systems-involved-in-a-scenario)
* [How do I test binary files in responses, such as a download?](./#how-do-i-test-binary-files-in-responses-such-as-a-download)
* [Why is the documentation so ugly?](./#why-is-the-documentation-so-ugly)

### What is Pact good for?

Pact is most valuable for designing and testing integrations where you \(or your team/organisation/partner organisation\) control the development of both the consumer and the provider, and the requirements of the consumer are going to be used to drive the features of the provider. It is fantastic tool for developing and testing intra-organisation microservices.

### What is Pact not good for?

* Testing APIs where the number of consumers is so great that direct relationships cannot be maintained between the consumer teams and the provider team.
* Performance and load testing.
* Functional testing of the provider - that is what the provider’s own tests should do. Pact is about checking the contents and format of requests and responses.
* Situations where you cannot load data into the provider without using the API that you’re actually testing \(eg. public APIs\). [Why?](https://github.com/pact-foundation/pact-ruby/wiki/Why-Pact-may-not-be-the-best-tool-for-testing-public-APIs)
* Testing “pass through” APIs, where the provider merely passes on the request contents to a downstream service without validating them. [Why?](https://github.com/pact-foundation/pact-ruby/wiki/Why-Pact-may-not-be-the-best-tool-for-testing-pass-through-APIs)

### Who would typically implement Pact?

Pact is generally implemented by developers, during development. Business analysts and testers can still benefit from the presence of contracts by using them to understand the underlying interactions between the applications.

The consumer team is responsible for implementing the Pact tests in the consumer codebase that will generate the contract, and for publishing it to a shared location \(usually a [Pact Broker](https://github.com/pact-foundation/pact_broker)\). The provider team is responsible for setting up the Pact verification task in the provider codebase, and for writing the code that sets up the correct data for each `provider state` described in the contract. Both teams are responsible for collaborating and communicating about the API and its usage! Remember that contracts are not a substitute for good communication between teams.

### What is the difference between contract testing and functional testing?

See this [page](../consumer/contract_tests_not_functional_tests.md) under the Consumer best practices section.

### Can I generate my pact file from something like Swagger?

Contract testing allows you to take an integration test that gives you slow feedback and replace it with two sets of "unit" tests that give you fast feedback - one set for the consumer, using a mock provider, and one set for the provider, using a "mock consumer". The pact file is the artifact that keeps these two sets of tests in sync. To generate the pact file from anything other than the consumer tests \(or to hand code it\) would be to defeat the purpose of this type of contract testing. The reason the pact file exists is to ensure the tests in both projects are kept in sync - it is not an end in itself. Manually writing or generating a pact file from something like a Swagger document would be like marking your own exam, and would do nothing to ensure that the code in the consumer and provider are compatibile with each other.

Something that could be useful, however, is to generate skeleton Pact test code from a Swagger document. If you're interested in working on this, have a chat to the maintainers on the Pact Slack.

### How do I use Pact with UI frameworks like React or Angular?

The best way to use Pact on the consumer side is to focus the tests on just the code that makes the HTTP request, and bypass as much of the framework specific code as possible. You can read more about why that is so [here](../consumer/#avoid-using-pact-for-tests-that-involve-the-ui). You can read about how to use Pact to support your UI testing using stub servers [here](https://docs.pact.io/consumer/using_pact_to_support_ui_testing). You can see some examples of using Pact to test consumer code [here](https://github.com/pact-foundation/pact-js/tree/master/examples) and a pact-js workshop [here](https://github.com/pact-foundation/pact-workshop-js). 

### Why doesn't Pact use JSON Schema?

Whether you define a schema or not, you will still need a concrete example of the response to return from the mock server, and a concrete example of the request to replay against the provider. If you just used a schema, then the code would have to generate an example, and generated schemas are not very helpful when used in tests, nor do they give any readable, meaningful documentation. If you use a schema _and_ an example, then you are duplicating effort. The schema can almost be implied from an example.

### Why does Pact use concrete JSON documents rather than using more flexible JSONPaths?

Pact was written by a team that was using microservices that had read/write RESTful interfaces. Flexible JSONPaths are useful when reading JSON documents, but no good for creating concrete examples of JSON documents to POST or PUT back to a service.

### Why is there no support for specifying optional attributes?

Firstly, it is assumed that you have control over the provider's data \(and consumer's data\) when doing the verification tests. If you don't, then maybe Pact is [not the best tool for your situation](https://github.com/pact-foundation/pact-ruby#what-is-it-good-for).

Secondly, if Pact supports making an assertion that element `$.body.name` may be present in a response, then you write consumer code that can handle an optional `$.body.name`, but in fact, the provider gives `$.body.firstname`, no test will ever fail to tell you that you've made an incorrect assumption. Remember that a provider may return extra data without failing the contract, but it must provide at minimum the data you expect.

The same goes for specifying "SOME\_VALUE or null". If all your provider verification test data returned nulls for this key, you might think that you had validated the "SOME\_VALUE", but in fact, you never had. You could get a completely different "SOME\_VALUE" for this key in production, which may then cause issues.

The same goes for specifying an array with length 0 or more. If all your provider verification data returned 0 length arrays, all your verification tests would pass without you ever having validated the contents of the array. This is why you can only specify an array with minimum length 1 OR a zero length array.

Remember that unlike a schema, which describes all possible states of a document, Pact is "contract by examples". If you need to assert that multiple variations are possible, then you need to provide an example for each of those variations. Consider if it's _really_ important to you before you do add a Pact test for each and every variation however. Remember that each interaction comes with a "cost" of maintenance and execution time, and you need to consider if it is worth the cost in your particular situation. You may be better off handling the common scenarios in the pact, and then writing your consumer to code to gracefully handle unexpected variations (eg. by ignoring that data and raising an alert).

### Why are the pacts generated and not static?

* Maintainability: Pact is "contract by example", and the examples may involve large quantities of JSON. Maintaining the JSON files by hand would be both time consuming and error prone. By dynamically creating the pacts, you have the option to keep your expectations in fixture files, or to generate them from your domain \(the recommended approach, as it ensures your domain objects and their JSON representations in the pacts can never get out of sync\).
* Provider states: Dynamically setting expectations on the mock server allows the use of provider states, meaning you can make the same request in different tests, with different expected responses. This allows you to properly test all the code paths in your consumer \(eg. with different response codes, or different states of the resource\). If all the interactions were loaded at start up from a static file, the mock server wouldn't know which response to return. See this [gist](https://gist.github.com/bethesque/7fa8947c107f92ace9a4) as an example.

### How do I test against the latest development and production versions of consumer APIs?

See [this article](http://rea.tech/enter-the-pact-matrix-or-how-to-decouple-the-release-cycles-of-your-microservices/).

### What does PACT stand for?

* Pretty Awesome Contract Testing?
* Provider And Consumer Tests?
* ???

Actually, it doesn't stand for anything. It is the word "pact", as in, another word for a contract. Google defines a "pact" as "a formal agreement between individuals or parties." That sums it up pretty well.

### Why Pact may not be the best tool for public testing APIs?

Each interaction in a pact should be verified in isolation, with no context maintained from the previous interactions. Tests that depend on the outcome of previous tests are brittle and land you back in integration test hell, which is the nasty place you’re trying to escape by using pacts.

So how do you test a request that requires data to already exist on the provider? Provider states allow you to set up data on the provider by injecting it straight into the datasource before the interaction is run, so that it can make a response that matches what the consumer expects. They also allow the consumer to make the same request with different expected responses \(eg. different response codes, or the same resource with a different subset of data\).

If you use Pact to test a public API, the only way to set up the right provider state is to use the very API that you’re actually testing, which will make the tests slower and more brittle compared to the “normal” pact verification tests.

If this is still a better situation for you than integration testing, or using another tool like VCR, then go for it!

### Why Pact may not be the best tool for testing pass through APIs?

During pact verification, Pact does not test the side effects of a request being executed on a provider, it just checks that the response body matches the expected response body. If your API is merely passing on a message to a downstream system \(eg. a queue\) and does not validate the contents of the body before doing so, you could send anything you like in the request body, and the provider would respond the same way. The “contract” that you really want is between the consumer and the downstream system. Checking that the provider responded with a 200 OK does not give you any confidence that your consumer and the downstream system will work correctly in real life.

What you really need is a “non-HTTP” pact between your consumer and the downstream system. Check out this [gist](https://gist.github.com/bethesque/0ee446a9f93db4dd0697) for an example of how to use the Pact contract generation and matching code to test non-HTTP communications.

### Do I still need end-to-end tests?

**TL;DR: It depends**

Contract tests replace a certain class of system integration test \(the ones you do to make sure that you're using the API correctly and that the API responds the way you expect\). They don't replace the tests that ensure that the core business logic of your services is working.

The value of contract tests is that they allow you to shift effort from high maintance, slow feedback tests to low maintenance, fast feedback tests, reducing the overall effort required to release.

#### Before contract tests

![Before contract tests](https://image.slidesharecdn.com/voxxeddays2019-190520032930/95/microservices-test-smarter-not-harder-voxxed-days-2019-27-638.jpg?cb=1558323091)

#### After contract tests

![After contract tests](https://image.slidesharecdn.com/voxxeddays2019-190520032930/95/microservices-test-smarter-not-harder-voxxed-days-2019-29-638.jpg?cb=1558323091)

The real question is: how many end-to-end tests do you really need once you have contract tests, and in which environment - test or production? The answer to _this_ question depends on your organisation's risk profile.

There is generally a trade off between the amount of confidence you have that your system is bug free, and the speed with which you can respond to any bugs you find. A 10 hour test suite may make you feel secure that all the functionality of your system is working, but it will decrease your ability to put out a new release quickly when a bug is inevitably found.

If you work in an environment where you prioritise "agility" over "stability", then maybe you would be better off investing the time that you would have spent maintaining end-to-end tests in improving your ability to _find_ and _fix_ bugs more quickly. For example:

* using semanitic monitoring techniques like synthetic transactions to let you know if any important functions are not working in production
* adding correlation IDs to your code
* setting up aggregated logging
* improving your alerting
* optimising your builds so that they run faster

If you work in a more traditional "Big Bang Release" environment, choose end to end tests that focus on the core business value provided by your system, rather than on tests that try to check that the HTTP requests are being done correctly.

### Can I use Pact for UI tests?

Unless you're using our [stub server](../getting_started/stubs.md) to mock out back end calls, we do not recommend using Pact for this purpose. Please read more on the [Consumer Best Practices](https://github.com/pact-foundation/pact.io/tree/ebbe880cce273dfb0d50f67c3a6933b9e4921a86/faq/best_practices/consumer/README.md#avoid-using-pact-for-tests-that-involve-the-ui) page.

### How can I handle versioning?

Consumer driven contracts to some extent allows you to do away with versioning. As long as all your contract tests pass, you should be able to deploy changes without versioning the API. If you need to make a breaking change to a provider, you can do it in a multiple step process - add the new fields/endpoints to the provider and deploy. Update the consumers to use the new fields/endpoints, then deploy. Remove the old fields/endpoints from the provider and deploy. At each step of the process, all the contract tests remain green.

Using a [Pact Broker](https://github.com/pact-foundation/pact_broker), you can tag the production version of a pact when you make a release of a consumer. Then, any changes that you make to the provider can be checked agains the production version of the pact, as well as the latest version, to ensure backward compatiblity.

If you need to support multiple versions of the provider API concurrently, then you will probably be specifying which version your consumer uses by setting a header, or using a different URL component. As these are actually different requests, the interactions can be verified in the same pact without any problems.

### Using Pact where the Consumer team is different from the Provider team

Pact is "consumer driven contracts", not "dictator driven contracts". Just because it's called "consumer driven" doesn't mean that the team writing the consumer gets to write a pact and throw it at the provider team without talking about it. The pact should be the starting point of a collaborative effort.

The way Pact works, it's the pact verification task \(in the provider codebase\) that fails when a consumer expects things that are different from what a provider responds with, even if the consumer itself is "wrong". This is a little unfortunate, but it's the nature of the beast.

Running the pact verification task in a separate CI build from the rest of the tests for the provider is a good idea - if you have it in the same build, someone is going to get cranky about another team being able to break their build.

It's very important for the consumer team to know when pact verification fails, because it means they cannot deploy the consumer. If the consumer team is using a different CI instance from the provider team, consider how you might communicate to the consumer team when pact verification has failed. You should do one of the following:

* Configure the pact verification build to send an email to the consumer team when the build fails.
* Even better, if you can, have a copy of the provider build run on the consumer CI that just runs the unit tests and pact verification. That way the consumer team has the same red build that the provider team has, and it gives them a vested interest in keeping it green.

Verify a pact by using a URL that you know the latest pact will be made available at. Do not rely on manual intervention \(eg. someone copying a file across to the provider project\) because this process will inevitably break down, and your verification task will give you a false positive. Do not try to "protect" your build from being broken by instigating a manual pact update process. The pact verify task is the canary of your integration - manual updates would be like giving your canary a gas mask.

### How to prevent a consumer from deploying with an invalid contract

**Use** `can-i-deploy`**:**

Use the [can-i-deploy](../pact_broker/advanced_topics/provider_verification_results.md) feature of the [Pact Broker CLI](https://github.com/pact-foundation/pact_broker). It will give you a definitive answer if the version of your consumer that is being deployed, is compatible with all of its providers.

For this to work you need to...

**Ensure the provider verification results are published back to the broker**

As of version 2.0+ of the Pact Broker, and 1.11.1+ of the Pact Ruby implementation, provider verification results can be published back to the broker, and will be displayed on the index page. The consumer team should consult the verification status on the index page before deploying.

One catch - it is only safe to deploy the consumer if it was verified against the _production_ version of the provider.

Some other approaches to consider are:

**Use Pact Broker Webhooks:**

Trigger a build or Slack notification using [webhooks](../pact_broker/advanced_topics/api_docs/webhooks.md) on the Provider as soon as a changed contract is submitted to the server.

**Collaboration**

Well, for starters, you _must_ be collaborating closely with the Provider team!

**Effective use of code branches**

It is of course very important that new assumptions on the contract be validated by the Provider before the Consumer can be safely released. Have branches tested against the Provider before you merge into master.

### How do I test OAuth or other security headers?

For interactions such as OAuth2 defined by a standard and implemented with a library implementing that standard, we would recommend _against_ using Pact for these scenarios. Standards are well defined and don't change often, and likely you have simpler testing options available \(probably something your framework provides\).

For APIs that _use_ these headers, things are a little more complicated, particularly on the provider side - the side that actually needs the token to be valid. Why?

When Pact reads the pact files for verification on the Provider side, it needs to have a valid token, and if that token has been persisted in a Pact file it has probably expired.

**Here are some options**

* Create a Mock authentication service used during testing - this gives you the best control.
* If using the JVM, you can use [request filters](https://github.com/DiUS/pact-jvm/tree/master/pact-jvm-provider-gradle#modifying-the-requests-before-they-are-sent) to modify the request headers before they are sent to the Provider.
* If using Pact JS you can use [request filters](https://github.com/pact-foundation/pact-js#modify-requests-prior-to-verification-request-filters)
* If using Pact Go you can use [request filters](https://github.com/pact-foundation/pact-go#request-filtering)
* Configure a relaxed OAuth2 validation service on the Provider that accepts any valid headers, so long as the match the spec \(e.g. `Authorization` header\). You might leverage the [provider states](http://docs.pact.io/documentation/provider_states.html) feature for this.
* Use Ruby's `Timecop` or similar library to manipulate the runtime clock.
* Use the `--custom-provider-header` option if you are using one of the implementations that wraps the Ruby standalone and there are no other options \(Python, .NET\).
  * In Python, this is available via the the [`header` option](https://github.com/pact-foundation/pact-python/blob/cf5d5bcd64f0537adf9ac187b23b64944f1a2043/pact/verify.py#L54-L60)

_NOTE_: Any option that modifies the request before sending to the running provider increases your chances of missing a key part of the interaction and therefore puts you at risk. Use carefully.

See the following links for some further discussion:

* [https://github.com/pact-foundation/pact-ruby/issues/49\#issuecomment-65346357](https://github.com/pact-foundation/pact-ruby/issues/49#issuecomment-65346357)
* [https://groups.google.com/forum/\#!searchin/pact-support/oauth\|sort:relevance/pact-support/zTnDlOgdYhU/tq\_Yx8MnIgAJ](https://groups.google.com/forum/#!searchin/pact-support/oauth|sort:relevance/pact-support/zTnDlOgdYhU/tq_Yx8MnIgAJ)
* [https://groups.google.com/forum/\#!topic/pact-support/tSyKZMxsECk](https://groups.google.com/forum/#!topic/pact-support/tSyKZMxsECk)
* [http://stackoverflow.com/questions/40777493/how-do-i-verify-pacts-against-an-api-that-requires-an-auth-token/40794800?noredirect=1\#comment69346814\_40794800](http://stackoverflow.com/questions/40777493/how-do-i-verify-pacts-against-an-api-that-requires-an-auth-token/40794800?noredirect=1#comment69346814_40794800)

### How do I deal with a situation where there are multiple systems involved in a scenario?

There are multiple situations where you need to traverse more than 2 systems in a single scenario. For example, consumer A calls provider B, which calls downstream dependency provider C, which then calls another downstream dependencies provider D and and so on.

Another common example is where one system calls out to another system first to fetch an authentication token such as a JWT. In this case, there is an API call from consumer A to auth provider B, which is then able to call auth server C.

Where possible, you should try to isolate interactions between two services at any one time. We would generally recommend stubbing out these systems.

See [https://gist.github.com/bethesque/43eef1bf47afea4445c8b8bdebf28df0](https://gist.github.com/bethesque/43eef1bf47afea4445c8b8bdebf28df0) for some more detail on how you might achieve this, and read our advice on [dealing with auth services](../provider/handling_auth.md).

### How do I test auth cookies?

You have a Provider that sends a `Set-Cookie` header, which is a core part of the contract, and your consumer \(usually a website\) needs to send back a `Cookie: ...` header to authenticate.

The core of the challenge here, is that you're not really writing any code on the consumer side that implements this contract - the browser does it for you.

In this instance you have a few options:

1. Not include them in the tests. After all, the consumer code doesn't know about them and you can mock the validation on the provider side if needed
2. Include them in the Pact tests, and validate the structure + contents of them on the provider side.

\(1\) doesn't fully represent the true contract, but \(2\) would require more code/effort.

In this case, we suggest you need to weigh up the pros/cons. From a purely theoretical perspective, the answer is “you should include it”. But taking a more balanced view, we say test what gives you value. If the cookie is always going to be implicitly added by the browser \(because that’s how browser’s behave\) and it’s a scenario unlikely to give your team more \(useful\) information about how the system behaves, whilst costing you effort in maintaining it. Then maybe it’s not worth it.

Sorry, life isn't black and white!

### How do I test binary files in responses, such as a download?

We suggest matching on the core aspects of the interaction - the request itself, and the response headers e.g.

```text
{
   state: 'I have a picture that can be downloaded',
   uponReceiving: 'a request to download some-file',
   withRequest: {
       method: 'GET',
       path: '/download/somefile'
   },
   willRespondWith: {
       status: 200,
       headers:
       {
           'Content-disposition': 'attachment; filename=some-file.jpg'
       }
   }
}
```

### Why is the documentation so ugly?

Pact is an open source project and the majority of contributions to Pact are done in people's free time. Our number 1 priority is getting new features out, so the aesthetic aspects of our documentation have been somewhat neglected. If you have some skills in website design and implementation and you'd like to give back to the Pact community, please have a chat to us on the Pact [slack](http://slack.pact.io) channel.

### Can I test GraphQL?

Yes.

See below, or the [Pact JS example](https://github.com/pact-foundation/pact-js/tree/feat/message-pact/examples/graphql).

### I use GraphQL, SOAP, Protobufs ... do I need contract tests?

This is a hard one. All we can do is provide some general advice, which can be easily summarised as this:

> if there is a possibility that the provider and consumer can get out of sync, then contract tests can help

GraphQL is simply an abstraction over HTTP, and it is entirely possible that the consumer and provider get out of sync. Writing contract tests with Pact turns out to be a relatively trivial exercise, once you understand how the interactions work under the hood.

SOAP is the same. Yes, there is a strongly defined schema, however if the provider changes that schema and deploys before a consumer has updated, boom - client down.

Protobufs is something we are still thinking about, and we've yet to test it with Pact in the wild. It does appear unnecessary as it has mechanisms to deal with backwards compatibility - but if you're willing to investigate, please chat to us and tell us how you go :\)

