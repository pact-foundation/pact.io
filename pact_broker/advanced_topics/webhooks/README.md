# Webhooks

## Webhooks

Webhooks allow you to trigger an HTTP request when a pact is changed, a pact is published, or a verification is published. The most common use case for webhooks is to trigger a provider build every time a pact changes, and to trigger a consumer build every time a verification is published.

Webhooks can be used in conjunction with the [can-i-deploy](https://docs.pact.io/pact_broker/can_i_deploy) tool \(a CLI that allows you to easily check the verification status of your pacts\), to allow you to fully automate the CI/CD process for all the applications that use the Pact Broker, ensuring both sides of the contract are fulfilled before deploying.

## The 'contract content changed' event

The broker uses the following logic to determine if a pact has changed:

* If the relevant consumer version has any tags, then for each tag, check if the content is different from the previous latest version for that tag. It is 'changed' if any of the checks are true. One side effect of this is that brand new tags will trigger a pact changed event, even if the content is the same as a previous version.
* If the relevant consumer version has no tags, then check if the content has changed since the previous latest version.

## The 'contract published' event

This is triggered every time a pact is published, regardless of whether it has changed or not.

## The 'provider verification published' event.

This is triggered every time a verification is published.

## The 'provider verification succeeded' event.

This is triggered every time a verification is published with a successful status.

## The 'provider verification failed' event.

This is triggered every time a verification is published with a failed status.

## Example CI/CD and webhook configuration

![](https://raw.githubusercontent.com/wiki/pact-foundation/pact_broker/images/webhook_end_to_end.png)

Note that if the pact content has not changed, it is "pre verified", and the provider verification portion of this diagram can be skipped.

![](https://raw.githubusercontent.com/wiki/pact-foundation/pact_broker/images/webhook_end_to_end_skip.png)

**What to do if your Pact Broker webhooks can't contact your CI because it is in a private network**

If your consumer and provider builds are both within the same private network, you can achieve a similar result by having your builds trigger each other directly. You'll just end up with a provider build for every consumer build, rather than a provider build for every _pact change_.

### Consumer CI

* `Consumer test job` - runs unit tests, runs pact tests, publishes pact. Triggers `Consumer pact check job`
* `Consumer pact check job` - this is the point where you decide if you can deploy the consumer straight away, or if you need to wait for the pact to be verified. It checks the status of the pacts using `can-i-deploy`. If `can-i-deploy` is successful, this job triggers `Consumer deploy`. If it is unsuccessful, it should fail the job to provide visibility of the status of your pacts in the build pipeline. Having this as a separate job rather than bundling it in with the test or deploy jobs means that the reason for a "failure" is obvious at a glance. If you have set up a webhook to trigger the provider verification on pact changes, then you can make can-i-deploy wait for a result before continuing using the `--retry-while-unknown` parameter.
* `Consumer deploy job` - deploys consumer

### Provider CI

* `Provider test job` - your normal provider pipeline. Runs unit tests, runs pact verification tests, publishes verification results. Typically, the pacts with `master`/`dev`/`test` and the `prod` tags would be verified during this job.
* `Changed pact verification job` - triggered by the 'contract\_content\_changed' webhook, this job verifies only the changed pact, and publishes the verification results back to the broker. This pact verification job configuration will be different to the one configured as part of the main provider pipeline, and should accept the URL of the changed pact as a configurable parameter. To do this, you must use webhook [template parameters](https://github.com/pact-foundation/pact_broker/blob/master/lib/pact_broker/doc/views/webhooks.markdown#dynamic-variable-substitution) to pass the URL of the changed pact through to the CI, which can then pass it in to the verification task. See the pact verification configuration documentation for your language.

### Pact Broker

* `contract_content_changed` webhook - triggers `Pact verification job`. Note that this webhook will only be triggered if the content of the pact has changed. If it hasn't changed, then the new publication of the pact will inherit the verification from the previous publication and be "pre-verified" \(or "pre-failed"\).
* `provider_verification_published` webhook - triggers `Consumer pact check job`. This webhook will be triggered every time a verification is published. The `can-i-deploy` tool will need to be used in conjunction with a query to the state of your own infrastructure to let you decide whether or not you need to deploy the consumer. ie. the provider may verify the same version of the pact multiple times, invoking the webhook each time, but you only want to deploy a certain version of your consumer once.

## Related resources

* [Debugging webhooks](debugging_webhooks.md)
* [Webhook API documentation](../api_docs/webhooks.md) - note that there is not yet a UI for creating webhooks. If you're interested in creating one, contact us on the Pact Broker [gitter](https://gitter.im/pact-foundation/pact_broker) channel.
* [can-i-deploy documentation](https://github.com/pact-foundation/pact_broker-client#can-i-deploy) - Documentation for the Pact Broker `can-i-deploy` CLI, which allows you to retrieve the verification results and determine whether your application is safe to deploy.
* [Webhook template library](template_lib.md) - a library of useful webhook templates

