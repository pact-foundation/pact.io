# Work In Progress pacts

A "work in progress" pact is a pact that is the latest for its tag \(eg. `/pacts/provider/Foo/consumer/Bar/latest/feat-x`\) that does not have any successful verification results.

When verifying pacts, the verification task can be configured to include all "work in progress" pacts \(as well as the pacts that you specify by tag, like `master` or `prod`\). This allows any new pacts to be automatically verified without the provider team having to make configuration changes. When using this feature, it is best to also turn on the `pending pacts` feature, so that any failures caused by the WIP pacts do not cause the build to fail.

This feature is in beta release and may not yet be implemented in your language. You can read about how it works here: [http://blog.pact.io/2020/02/24/introducing-wip-pacts/](http://blog.pact.io/2020/02/24/introducing-wip-pacts/)

## To start using the WIP pacts feature

* You need to either be using [pactflow.io](https://pactflow.io), or have the latest version of the OSS Pact Broker running with the environment variable `PACT_BROKER_FEATURES=pacts_for_verification`
* You need to be on the latest version of the Pact client library for Javascript, Go, Ruby, .Net or Python (pact-python, not pactman)
* You need to find the verification documentation for your langage, and set the "includeWipPactsSince" date to your chosen date (eg. try a week ago). The reason this date is required is that if you included all the pacts that were considered work in progress, you may include many years of outstanding pacts!
