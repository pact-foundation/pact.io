# Sharing Pacts

At some point in your Pact journey, you are going to be generating lots of `Pact` files for your `Provider` to verify, ensuring the `Provider` has access to the latest version of the `Pacts` at all times. This is great, but very quickly this becomes cumbersome to manage.

## Pact Broker

This is where the [Pact Broker](https://github.com/bethesque/pact_broker) comes in. It enables you to share your `Pacts` between projects, and make them useful for people too. It is the recommended way forward for serious Pact development, featuring:

* Auto-generated documentation
* Dynamically generated network diagrams
* The ability to tag a `Pact` (i.e. "prod") so a `Provider` can verify itself against a fixed version of a `Pact` to ensure backwards compatibility.
* Webhooks to trigger provider builds when a `Pact` is published.
* Ability to decouple the release cycle of your `Consumer` and `Provider`
* Ability to cross test the head/prod versions of `Pacts`

For more information, head over to the Pact Broker [website](https://github.com/bethesque/pact_broker).

## Alternative approaches

##### 1. `Consumer` CI build commits pact to `Provider` codebase

Pretty self explanatory.

##### 2. Publish pacts as CI build artefacts

Work out the URL to the pact created by the most recent successful build, and configure the pact:verify task to point to this URL.

##### 3. Use Github/Bitbucket URL

This only works for repositories that don't require authentication to read. Make sure that you always regenerate the pacts before committing if you make any changes to the pact specs, and that the specs are always passing before you commit, because you don't want to verify the pact from a broken build.

##### 4. Publish pacts to Amazon S3

[Pact::Retreaty](https://github.com/fairfaxmedia/pact-retreaty) is a tool which provides a ultra light mechanism for
pushing and pulling pact contracts to/from S3.
