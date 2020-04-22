# Work In Progress Pacts

A "work in progress" pact is a pact that is the latest for its tag (eg. `/pacts/provider/Foo/consumer/Bar/latest/feat-x`) that does not have any successful verification results.

When verifying pacts, the verification task can be configured to include all "work in progress" pacts (as well as the pacts that you specify by tag, like `master` or `prod`). This allows any new pacts to be automatically verified without the provider team having to make configuration changes. When using this feature, it is best to also turn on the `pending pacts` feature, so that any failures caused by the WIP pacts do not cause the build to fail.

This feature is in beta release and may not yet be implemented in your language. You can read about how it works here: http://blog.pact.io/2020/02/24/introducing-wip-pacts/
