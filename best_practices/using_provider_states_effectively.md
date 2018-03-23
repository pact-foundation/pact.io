# Using Provider States Effectively

The purpose of contract testing is to ensure that the consumer and provider have a shared understanding of the messages that will pass between them. When we verify a pact, we are not only ensuring that the provider returns the expected data to the consumer, we are also verifying that the consumer is calling the API correctly.

Ensuring that the API is being called correctly in contract tests can be somewhat tricky, as a provider written in accordance with Postel's Law (be relaxed with what you accept) will often ignore incorrect input, rather than raising an error.

Ensuring a consumer is using the right query params for a search is a classic example of this. 
