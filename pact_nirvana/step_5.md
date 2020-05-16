## 5. Allow contracts to change without breaking your builds

You now have a workflow where:

* A pact is published with every consumer build
* The latest version of that pact is verified with every provider build
* The verification results are published back to the broker
* Any change to the pact triggers a provider pact verification build.

One of the complications introduced by the "consumer driven" nature of the workflow is that new interactions are usually added to the contract before the functionality has been implemented in the provider. Using the workflow described above, a provider build will be kicked off when you publish a contract with new interactions in it. This build will \(correctly\) fail during the verification task. This is not ideal, as the failure is expected. To solve this, we need to allow contracts to change without breaking the builds.

"Tagging" application versions in the broker allows you to separate your "stable" pacts from your "feature pacts", and to introduce new expectations to a pact without breaking your provider builds. Tags are simple text labels that are applied to application versions, and you can think of the time ordered series of pacts that belong to each tag as forming a "pseudo branch". These psuedo branches can be used in a similar way to git feature branches, where you can keep an unbreaking stable line of development, while adding new, breaking interactions on the side.

![Tags over time](/.gitbook/assets/tags_over_time.png)

To achieve these "pseudo branches", when a pact is published, the associated pacticipant version should be tagged with an identifier that will be used by the provider to differentiate between the stable, safe pacts \(eg. tagged "master"\) and the potentially breaking pacts \(eg. tagged "feat-new-foobar"\).

To keep a green build, in your provider’s CI verify the pact for the latest version tagged with the name of the stable tag, rather than verifying the latest overall pact.

If you use feature branches for your consumer development, it is recommended to tag the pacticipant version with the name of the branch. If you use feature toggles, the tag could be the name of the feature toggle. Your Pact client library will allow you to configure the name of the tag to be applied when you publish your pacts.

1. Configure a tag name to be used for every consumer build that publishes a pact \(again, see your Pact language docs\). The recommended default is to dynamically determine and use the name of your git/svn branch. If this doesn’t work for you, then you could hardcode it to something like "master" or "stable". It will make the configuration simpler if each consumer and provider uses the same tag name for the stable "main line" of development, so it's best to decide on this together.
2. In the provider verification configuration, change the pact that is being verified from the latest pact to the latest pact for the stable tag \(see the relevant documentation for your library\).  This will help keep your provider builds green.
3. Now, when you want to add new expectations to a pact, do it on a feature branch of your consumer codebase \(or with a feature toggle\). If you are dynamically using the branch name as the broker tag, you don’t need to do anything further. However, if you have hardcoded your tag name or are using a feature toggle, you’ll need to manually set the tag to an appropriate value.
4. Use the new "feature pact" as a starting point to discuss the desired new features with the provider team. Remember section 1 on "Talking"!
5. Once the interface has been agreed on, implement the new functionality in the provider using the feature pact and verify it locally rather than in the CI until the new expectations are passing. Your provider should still be verifying against the stable tag on the CI, so any new changes will not cause the build to break.
6. Once the feature pact has been locally verified and you have committed the new provider code to master only then can the consumer  merge in their own changes to master. To reiterate:

    * verify feature pact locally in the provider
    * add the new code to the provider
    * merge the consumer changes after the provider has released their code

    The expectations can be written in the pact before they exist in the provider, but the provider code needs to be released before the consumer code to avoid breaking builds.

In addition to some of the language-specific Pact tools \(eg Grade\), tagging can be done with the [Pact Broker CLI](https://github.com/pact-foundation/pact_broker-client#create-version-tag).

Useful link:

* [Best practices for pacticipant version numbers](getting_started/versioning_in_the_pact_broker.md)
