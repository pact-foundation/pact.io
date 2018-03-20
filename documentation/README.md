# Getting Started

### How does Pact work?

1. In the tests for the provider facing code in the consumer project, expectations are set up on a mock service provider.
2. When the tests are run, the mock service returns the expected responses. The requests, and their expected responses, are then written to a “pact” file.
3. The requests in the pact file are later replayed against the provider, and the actual responses are checked to make sure they match the expected responses.

![](https://raw.githubusercontent.com/pact-foundation/pact-foundation.github.io/test/media/pact.png)

It is important to understand that Pacts are _not_ schemas. A schema describes every possible valid combination of a document in one artifact. Pact operates on the principle of "contract by example". Each request/response pair only validates one of the possible states of the request/response.
