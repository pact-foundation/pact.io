# Using Tags

Tags are simple String values that that belong to "pacticipant" version \(that is, application version\) resources in the Pact Broker. They are typically used to provide metadata about a version, the most common use cases being to indicate the git branch of a version \(eg. `master`\) or a stage \(eg `test`, `prod`\).

Pacticipant version tags can be used for multiple purposes.

* Tags can be used to enable you to test consumer and provider `head` and `prod` versions against each other. This allows you to decouple the release cycles of your consumer and provider. Read more about this [here](https://github.com/pact-foundation/pact_broker/wiki/How-to-ensure-backwards-compatibility-by-tagging-pacts).
* Tags can be used to enable you to add new interactions without breaking all the builds. Read more about this [here](https://github.com/pact-foundation/pact_broker/wiki/How-to-add-new-interactions-without-breaking-everything).

Note that the tag is actually placed on the `pacticipant version` resource, not the `pact` itself \(conceptually, you are indicating that that particular version of the application is a "prod" version, or a "feature-x" version\). The URL structures, however, then allow you to retrieve pacts by the tags on their associated versions.

As an example, to tag `Foo` application version `b5236e772` as the production version, do a `PUT` to the resource `/pacticipants/Foo/versions/b5236e772/tags/prod`. All the pacts and verifications associated with `Foo` version `b5236e772` are now considered to be the production pacts/verifications. The pact for provider `Bar` and the latest production version of consumer `Foo` can be retrieved from `/pacts/provider/Bar/consumer/Foo/latest/prod`.

\(You may have noticed that the URL for a pacticipant version tag starts with `/pacticipants`, not `/consumers` or `/providers`. That is because `consumer` and `provider` are roles that a pacticipant takes in a pact, not an identities in themselves. An application may be both a consumer and a provider.\)

When you are using tags, you need to ensure that the version numbering scheme you use to identify a "version" cannot give you version that exists on more than one repository branch - don't hard code it. It should either _be_ the git sha \(or equivalent for your repository\), or it should include the git sha as metadata if you are using semantic versioning eg. `1.2.456+405b31ec6`.

## When are tags created?

### When publishing pacts

Your Pact consumer library will allow you to set the "consumer version tags" that will be set for the relevant consumer version when you publish your pacts. The recommended tag value to use is the name of your git branch, if applicable, or `dev`, if not.

### When publishing verification results

Your Pact provider library will allow you to set the "provider version tags" that will be set for the relevant provider version when you publish your verification results. The recommended tag value to use is the name of your git branch, if applicable, or `dev`, if not.

### After deploying to an environment

_Note: making use of this feature is recommended for experienced Pact users, however, if you are just starting with Pact, you can skip it for now._

When you deploy an application that uses Pact to a given environment \(eg `test`, `prod`\) then you should tag the relevant pacticipant version with the name of the stage using the [create version tag](https://github.com/pact-foundation/pact_broker-client#create-version-tag) command from the [Pact Broker client](https://github.com/pact-foundation/pact_broker-client). This allows you to use the [can-i-deploy](https://github.com/pact-foundation/pact_broker/wiki/can-i-deploy) tool to ensure that other applications that are deployed to the same environment can check to make sure they're compatible with the version you just deployed.

## When are tags used?

### When retrieving pacts

Providers can \(and should\) be configured to retrieve pacts by tag name \(usually the "latest pact" for a given tag eg. the latest `master` and latest `prod` pacts\).

### Before deploying to an environment

The `can-i-deploy` tool queries the Pact Broker to determine if the version of the application you are about to deploy is compatible with the versions of the other applications that are already in that environment, and it uses tags to determine this. For example `can-i-deploy --pacticipant Foo --version ad72df2 --to prod` will tell the Pact Broker to look up the latest version with the tag `prod` for each of Foo's integrations partners, and see if there is a successfully verified pact between that version and version ad72df2 of Foo.

## Retrieving pacts

* `/pacts/provider/PROVIDER/consumer/CONSUMER/latest` will return the latest pact, regardless of tags.
* `/pacts/provider/PROVIDER/consumer/CONSUMER/latest/TAG` will return the latest pact associated with the specified tag.
* `/pacts/provider/PROVIDER/consumer/CONSUMER/latest-untagged` will return the latest pact without any tag

## Tagging approaches

### 1. Automatically tag with branch name when pact is published \(recommended\)

With this approach, the consumer version always has a tag, whether it be `master`, `prod` or `feature-x`. This approach works well if you use feature branches for development, and release from a production branch.

An example configuration in a ruby project to achieve this would be:

```ruby
PactBroker::Client::PublicationTask.new do | task |
  task.pact_broker_base_url = "..."
  task.consumer_version = "..."
  task.tag = `git rev-parse --abbrev-ref HEAD`.strip
end
```

The provider CI would then be configured to verify the required branches using the URLs described above - the recommended approach would be to always verify `master` and `prod`.

### 2. Manually tag production or feature pacts

If you release from master, then the production version of the consumer application should be tagged with `prod` as part of the release process. The provider CI should verify the `latest-untagged` and `latest/prod` endpoints described above. You can also [manually tag](https://github.com/pact-foundation/pact_broker/wiki/How-to-add-new-interactions-without-breaking-everything) pacts with the tag name of your choice to allow you to add in new interactions without breaking the provider CI.

