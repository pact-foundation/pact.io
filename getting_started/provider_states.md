# Provider states

Each interaction in a pact should be verified in isolation, with no context maintained from the previous interactions. Tests that depend on the outcome of previous tests are brittle and land you back in integration test hell, which is the nasty place you're trying to escape by using pacts.

So how do you test a request that requires data to already exist on the provider? Provider states allow you to set up data on the provider by injecting it straight into the data source before the interaction is run, so that it can make a response that matches what the consumer expects. The name of the provider state is specified in the `given` clause of an interaction in the consumer, and then used to find the block of code to run in the provider to set up the right data. If you need to stub a downstream system, or return an error response that is difficult to cause in the normal scheme of things \(e.g. a 500\), this is the place where you can set up stubs.

Provider states also allow the consumer to make the same request with different expected responses \(e.g. different response codes, or the same resource with a different subset of data\).

Keep in mind that a provider state is all about the state of the _provider_ \(eg. what data is there, how it is going to handle a given response\), not about the state of the consumer, or about what is in the request.

Refer to the the [Ruby example](../implementation_guides/ruby/provider_states.md) to see how this plays out in code.

