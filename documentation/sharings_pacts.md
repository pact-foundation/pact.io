# Sharing Pacts

At some point in your Pact journey, you are going to be generating lots of `Pact` files for your `Provider` to verify, ensuring the `Provider` has access to the latest version of the `Pacts` at all times. This is great, but very quickly this becomes cumbersome to manage.

## Pact Broker

This is where the [Pact Broker](https://github.com/pact-foundation/pact_broker) comes in. It enables you to share your `Pacts` between projects, and make them useful for people too. It is the recommended way forward for serious Pact development, featuring:

* Auto-generated documentation
* Dynamically generated network diagrams so you can see which services talk to which other services.
* The ability to tag a version of a pact `Pact` (i.e. "prod") so a `Provider` can verify itself against a fixed version of a `Pact` to ensure backwards compatibility.
* The ability to use tags to allow development of new features without breaking your mainline development `Pact`.
* Webhooks to trigger provider builds when a `Pact` is published.
* Provider verification results display
* Change tracking between Pact versions so you can tell when a consumer has changed its expectations.

Most importantly, the `Pact Broker` allows you to easily decouple the release cycle of your `Consumer` and `Provider`, which is one of the goals of writing microservices in the first place.

You can find all the documentation for the `Pact Broker` in the [Pact Broker wiki](https://github.com/pact-foundation/pact_broker/wiki).

Our sponsor [DiUS](https://www.dius.com.au) has kindly provided a [free hosted broker](https://pact.dius.com.au) to get you started quickly.

### Language support

**Ruby**
via the `pact_broker-client` gem:

* [Publishing](https://github.com/pact-foundation/pact_broker-client#consumer)
* [Provider verification](https://github.com/pact-foundation/pact_broker-client#provider)


**Pact JVM - Gradle**
* [Publishing ](https://github.com/DiUS/pact-jvm/tree/master/pact-jvm-provider-gradle#publishing-pact-files-to-a-pact-broker-version-227)
* [Provider verification](https://github.com/DiUS/pact-jvm/tree/master/pact-jvm-provider-gradle#verifying-pact-files-from-a-pact-broker-version-311231)

**Pact JVM - JUnit**
* [Provider verification](https://github.com/DiUS/pact-jvm/tree/master/pact-jvm-provider-junit#download-pacts-from-a-pact-broker)

**Pact JVM - SBT**
* [Provider verification](https://github.com/DiUS/pact-jvm/tree/master/pact-jvm-provider-sbt#verifying-pact-files-from-a-pact-broker)

**Pact JVM - Maven**
* [Publishing](https://github.com/DiUS/pact-jvm/tree/master/pact-jvm-provider-maven#publishing-pact-files-to-a-pact-broker-version-320)
* [Provider verification](https://github.com/DiUS/pact-jvm/tree/master/pact-jvm-provider-maven#verifying-pact-files-from-a-pact-broker-version-311231)

**Golang**

* [Publishing](https://github.com/pact-foundation/pact-go/#publishing-pacts-to-a-broker-and-tagging-pacts)
* [Provider verification](https://github.com/pact-foundation/pact-go/#provider)

**Pact JS**

* [Publishing](https://github.com/pact-foundation/pact-js/#publishing-pacts-to-a-broker)
* [Provider verification](https://github.com/pact-foundation/pact-js/#provider-api-testing)

**Pact .NET**
* [Publishing]()
* [Provider verification](https://github.com/SEEK-Jobs/pact-net#service-provider)

**Manual via HTTP**

* See the [API definition](https://github.com/bethesque/pact_broker/wiki/Publishing-and-retrieving-pacts) with `cURL` examples


For more information head over to the Pact Broker [website](https://github.com/bethesque/pact_broker).

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
