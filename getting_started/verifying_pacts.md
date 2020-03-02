# Verifying Pacts

"Verifying a pact" is the second step of the Pact testing process. Each request in the pact file is replayed against the provider, and the response is compared with the expected response in the pact file. If the two match, then we know the consumer and provider are compatible.

To verify a pact, we must:

1. Configure the location of the pact to be verified. This can be a HTTP URL, or a local file system path.
2. Set up the data for the [provider states](provider_states.md).
3. Configure the service provider app that will be used to run the requests against.

Refer to the [Ruby example](../implementation_guides/ruby/verifying_pacts.md) for how this plays out in code.

## Verifying Pacts from a Pact Broker

If you are verifying a pact from a Pact Broker, you can configure your verification tool to publish the verification results back to the broker. This massively increases the value you get from using Pact, because sharing the contracts is only half the story - you also need to share the verification results so that the communication loop between the consumer and provider teams is complete. Your contract won't give you any confidence about deploying your consumer unless you know it has been verified successfully.

Refer to the configuration documentation for your Pact implementation language for information on how to configure verification publishing.

## Using a language that is not Pact-native?

If you are using a language that doesn't provide native support for verification, you can still verify the Provider API! Check out the [provider verifier](https://github.com/DiUS/pact-provider-verifier-docker) command line tool.

### Using Docker?

Check out the Pact CLI [Docker image](https://hub.docker.com/r/pactfoundation/pact-cli) image.

