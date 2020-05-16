## 6. Ensure backwards compatiblity between the latest provider and production consumer

It's all very well knowing that your consumer/provider are compatible with the head versions of each other, but if you want to be able to deploy your consumer and provider independently, you also need to be sure that the latest version of the provider is compatible with the production version of the consumer. The ability to do this is a major selling point of Pact.

Tags allow you ensure backwards compatibility between production and head versions of your applications by allowing the provider to verify the pact associated with the latest production version as well as the latest master version. This enables the safe deployment workflow described in step 7.

1. Add a step to your deployment process so that when the consumer is deployed to production, the relevant pacticipant version in the broker is tagged as the “production” version. This functionality is provided by the [pact broker CLI](https://github.com/pact-foundation/pact_broker-client#create-version-tag) which is available as a standalone executable, and a Docker image.
2. Add the "production" tagged pact to the list of pacts the provider will verify.
