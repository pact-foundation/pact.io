# Using provider states effectively

The purpose of contract testing is to ensure that the consumer and provider have a shared understanding of the messages that will pass between them. When we verify a pact, we are not only ensuring that the provider returns the expected data to the consumer, we are also verifying that the consumer is calling the API correctly.

Ensuring that the API is being called correctly in contract tests can be somewhat tricky, as a provider written in accordance with Postel's Law \(be relaxed with what you accept\) will often ignore incorrect input, rather than raising an error.

Ensuring a consumer is using the right query params for a search is a classic example of this. Query params with invalid names are likely to be ignored, resulting in the following situation:

1. Consumer declares in the pact: given `an alligator with name Mary exists` upon receiving a request for `/search-alligators?name=Mary` will return a list of alligators with min length one and the name "Mary".
2. The provider team sets up the relevant provider state by creating one alligator with the name Mary.
3. The pact verification passes
4. Consumer and provider deploy
5. A user performs a search for alligators by name and EVERY SINGLE ALLIGATOR IN THE DATABASE is returned!

How did this happen? We had a contract test for this and it passed, right?

Actually, the correct parameter to use for the alligator search was "firstname", not "name". When we ran the pact verification, the "name" query param was ignored, and it was interpreted as `/search-alligators`, which then returned all the alligators - which was just the one that was in the database at the time, and it was called "Mary".

We have a test that gave us a false positive.

So how do we avoid this situation?

The easiest solution to ensure that the right parameters are used for a query is for the provider to echo the params that it used from the query in its response. Note, this only works if the provider just extracts the params it cares about - if it echoes the entire query string, it would defeat the purpose!

eg. Given `an alligator with name Mary exists` upon receiving a request for `/search-alligators?name=Mary` will return `{"query": {"name": ["Mary"]}, "alligators": [...] }`

If the above pact was verified by the provider, it would correctly fail because it would return `{"query": {}}`. Once the consumer updated its test to expect `/search-alligators?firstname=Mary` and `{"query": {"firstname": ["Mary"]}, "alligators": [...] }` it would pass.

If that is not possible, then an alternative but more complicated set up is required.

This solution takes cooperation on both sides of the contract. As you would hopefully have read elsewhere, we don't want to fall into the trap of using our contracts to do functional testing. Those tests belong in the provider's codebase. But in this situation, unfortunately the only way to check that we have used the right parameter name is to check the results that are returned. Here is one solution.

1. Consumer declares in the pact: given `an alligator with name Mary exists and an alligator named John exists` upon receiving a request for `/search-alligators?name=Mary` will return a list of alligators with length _exactly one_ and the name "Mary".
2. The provider team sets up the relevant provider state by creating one alligator with the name Mary _AND one alligator named John_.
3. The pact verification correctly fails - because two alligators were returned.

