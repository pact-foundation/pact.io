# Getting Started

### How does Pact work?

1. In the tests for the provider facing code in the consumer project, expectations are set up on a mock service provider.
2. When the tests are run, the mock service returns the expected responses. The requests, and their expected responses, are then written to a “pact” file.
3. The requests in the pact file are later replayed against the provider, and the actual responses are checked to make sure they match the expected responses.

![](https://raw.githubusercontent.com/pact-foundation/pact-foundation.github.io/test/media/pact.png)
