## 7. Use The Pact "Matrix" as a gateway to deployments

Before you deploy to a production environment, you need to know whether or not your app is compatible with the versions of the other apps that already exist in that environment. The old-fashioned way of managing these dependencies involved deploying sets of pre-tested applications together, creating a bottleneck and meaning that speedy development and testing on one application may be negated by slow development and testing on another.

The Pact way of managing these dependencies is to use the Pact Matrix - this is the matrix generated when you create a table of all the consumer and provider versions that have been tested against each other using Pact. You can view the Pact Matrix for any pair of applications by opening `/matrix/provider/PROVIDER/consumer/CONSUMER` in your Pact Broker.

![Pact matrix](.gitbook/assets/pact-matrix.png)

One very important thing to note is that a verification is associated with the pact _content_ itself, not with a specific consumer version. This means that if a pact does not change between publications, any previous verifications are automatically be applied to the new pact publication, effectively “pre-verifying” it. \(For this reason, it is best not to use any random data in a pact, as this will cause the broker to consider it a new revision of the pact.\) Linking a verification to the pact content rather than to the application version also means that we can do a “cartesian join” of pacts/verifications, resulting in many more "compatible" versions than would otherwise be the case.

The way you check if you are safe to deploy is to determine if there is a row in the matrix that contains the version of the application you’re about to deploy and the version of the other application that already exists in that environment. You can do this with the [`can-i-deploy`](https://github.com/pact-foundation/pact_broker-client#can-i-deploy) tool, which will be described in more detail below.

The need for this check increases proportionately with the time that elapses between your pact test execution and your release. If you practice continuous deployment, and you go straight from a test build into a production deployment build, then you can be pretty sure that the version of the other application that is in production probably hasn’t changed in the meantime. If there is a considerable amount of time, however, it is best to do a compatibility check again just before deploying.

For example, if you run a pact verification on Monday that verifies the recommended “master” and “production” pacts, but you don’t deploy the provider artifact until Friday, the version of the consumer that is now in production may have changed.

Alternatively, a pact may have been verified by the “master” version of the provider, but that version of the provider may not yet have been deployed to production. The consumer cannot be deployed to production until the version of the provider that it depends on is in production \(unless it has been specifically written to fail gracefully, which is actually the best approach, but is one that isn’t always followed\).

The [`can-i-deploy`](https://github.com/pact-foundation/pact_broker-client#can-i-deploy) tool is a CLI that has been written to query the Matrix to ensure that you are safe to deploy.

1. Add a step to your deployment process that uses the `can-i-deploy` tool to ensure that the version that you are about to deploy is compatible with the production versions of its integration partners.
2. Add a step to your deployment process so that when the application is deployed to production, the relevant pacticipant version in the broker is tagged as the “production” version. This functionality is provided by the [pact-broker client CLI](https://github.com/pact-foundation/pact_broker-client#create-version-tag)

Useful link:

* [Checking verification results using the can-i-deploy CLI](https://github.com/pact-foundation/pact_broker-client#can-i-deploy)
