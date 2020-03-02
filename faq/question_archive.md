# Question archive

Some less commonly, but no less importantly, asked questions.

## My team wants to run the application inside docker as they feel that running it inside a docker with http server is much more realistic scenario in line with production.

Contract testing is not about providing a realistic situation. It's about testing your requests and responses in focussed way, isolating the application under test from causes of failure that are unrelated to the contents of the requests and responses \(eg. networking issues, deployment problems, race conditions, downstream service unavailability\)

The types of tests that are about providing realistic situations are end-to-end tests, smoke tests, canary tests, performance tests etc. Incidentally, these types of tests are really bad at checking request/response correctness because their scope is so broad, it's hard to tell exactly what has gone wrong when something fails.

## Should pact files be used for postman collections to execute integration tests?

You can do this, but would you be getting any extra benefit from it over your existing contract tests? Using contract tests should mean that the boring "when I send this request, I get this response" kind of tests are already done. Viewing the pacts and the verification results in a Pact Broker \(including interaction level results if using Pactflow\) will allow QAs to see what has already been covered, and allow them to identify any gaps, rather than just repeating existing automated tests. This should allow them to spend more time on high value exploratory manual testing.

## Does Implementing contract tests means we have to get rid of existing integration tests with Postman?

The introduction of contract testing allows you to reduce your integrated and e2e tests - but how much they reduce them depends heavily on your situation. Some teams skip the integrated and e2e tests altogether, and some teams keep a smaller set that is focussed on the "business value" scenarios rather than the "is this request/response right" kind of scenarios.

## What's the difference between the pact broker and the mock service?

The mock service \(and stub service\) runs on your local development or CI machine for the duration of the pact tests. The Pact Broker is a permanently running, externally hosted service that allows you exchange the pacts and verification results.

