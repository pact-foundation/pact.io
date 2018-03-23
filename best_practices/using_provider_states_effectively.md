# Using Provider States Effectively

The purpose of contract testing is to ensure that the consumer and provider have a shared understanding of the messages that will pass between them. When we verify a pact, we are not only ensuring that the provider returns the expected data to the consumer, we are also verifying that the consumer is calling the API correctly.

Ensuring that the API is being called correctly in contract tests can be somewhat tricky, as a provider written in accordance with Postel's Law (be relaxed with what you accept) will often ignore incorrect input, rather than raising an error.

Ensuring a consumer is using the right query params for a search is a classic example of this. Query params with invalid names are likely to be ignored, resulting in the following situation:

1. Consumer declares in the pact: given "an alligator with name Mary exists" for a request for "/search-alligators?name=mary" will return a list of alligators with min length 1 and the name "mary".
1. The provider team sets up the relevant provider state by creating 1 alligator with the name Mary.
1. The pact verification passes
1. Consumer and provider deploy
1. A user enteres a search for alligators by name and EVERY SINGLE ALLIGATOR IN THE DATABASE is returned!

How did this happen?

Actually, the correct parameter to use in the alligator was "firstname" not "name". When we ran the pact verification, the "name" query param was ignored, and it was interpreted as "/search-alligators", which then returned all the alligators - which was just the one that was in the database a the time, and it was called "Mary".

We have a test that gave us a false positive.

