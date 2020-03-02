# Verifying Pacts

## Ensure that the latest pact is being verified

* Use a URL that you know the latest `Pact` will be made available at.
* Do not rely on manual intervention \(eg. someone copying a file across to the `Provider` project\) because this process will inevitably break down, and your verification task will give you a false positive.
* Do not try to "protect" your build from being broken by instigating a manual pact update process.
* `pact:verify` is the canary of your integration - manual updates would be like giving your canary a gas mask.

## Ensure that Pact verify runs as part of your CI build

It should run with all your other tests.

## Only stub layers beneath where contents of the request body are extracted

If you don't have to stub anything in the `Provider` when running `pact:verify`, then don't.

If you do need to stub something \(eg. a downstream system\), make sure that you only stub the code that gets executed after the contents of the request body have been extracted and validated. Otherwise, you could send any old garbage in a `POST` or `PUT` body, and no test would fail.

See [this gist](https://gist.github.com/bethesque/43eef1bf47afea4445c8b8bdebf28df0) for some conceptual background.

## Stub calls to downstream systems

Consider making a separate `Pact` with the downstream system and using shared fixtures.

See [this gist](https://gist.github.com/bethesque/43eef1bf47afea4445c8b8bdebf28df0) for some conceptual background.

### Publish verification results to the Pact Broker

As of version 2.0+ of the Pact Broker, and 1.11.1+ of the Pact Ruby implementation, provider verification results can be [published](https://github.com/pact-foundation/pact_broker/wiki/Provider-verification-results) back to the broker, and will be displayed on the index page. The consumer team should consult the verification status on the index page before deploying.

One catch - it is only safe to deploy the consumer if it was verified against the _production_ version of the provider.

## Use `can-i-deploy`

Use the [can-i-deploy](https://github.com/pact-foundation/pact_broker/wiki/Provider-verification-results) feature of the [Pact Broker CLI](https://github.com/pact-foundation/pact_broker-client#can-i-deploy). It will give you a definitive answer if the version of your provider that is being deployed, is compatible with all of its known consumers.

