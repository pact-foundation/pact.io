# Verifying pacts

"Verifying a pact" is the second step of the Pact testing process. Each request in the pact file is replayed against
the provider, and the response that is returned is compared with the expected response in the pact file, and if the two
match, then we know the consumer and provider are compatible.

To verify a pact, we must:

1. Configure the location of the pact to be verified. This can be a HTTP URL, or a local file system path.
1. Set up the data for the [provider states](./provider_states.md).
1. Optionally, configure the service provider app that will be used to run the requests against.

Refer to the [Ruby example](ruby/verifying_pacts.md) for how this plays out in code.

## Using a language that is not Pact-native?

If you are using a language that doesn't provide native support for verification, you can still verify the Provider API! Check out the [provider verifier](https://github.com/DiUS/pact-provider-verifier-docker) command line tool.

### Using Docker?

Check out the pact provider verifier [Docker image](https://hub.docker.com/r/dius/pact-provider-verifier-docker/) image.
