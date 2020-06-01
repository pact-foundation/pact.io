---
description: >-
  How to use Pact + the can-i-deploy tool to ensure that you are safe to deploy
  your application.
---

# Can I Deploy

Before you deploy a new version of an application to a production environment, you need to know whether or not the version you're about to deploy is compatible with the versions of the other apps that already exist in that environment. The old-fashioned way of managing these dependencies involved deploying sets of pre-tested applications together, creating a bottleneck, and meaning that speedy development and testing on one application may be negated by slow development and testing on another.

The Pact way of managing these dependencies is to use the Pact Matrix - this is the matrix created when you create a table of all the consumer and provider versions that have been tested against each other using Pact. \(When a pact is published, the version of the consumer that generated the pact is recorded. When a pact is verified against a provider, the verification results are published to the Pact Broker, along with the version of the provider that verified the pact. When you put all of the consumer versions and provider versions that have been tested against each other into a table, you end up with the "Pact Matrix".\)

You can view the Pact Matrix for any pair of applications by clicking on the little grid icon for your pact in the Pact Broker index page.

Imagine the pact verification matrix for consumer Foo and provider Bar. It shows the consumer version, the provider version, and whether or not the verification passed.

| Foo version \(consumer\) | Bar version \(provider\) | Verification success? |
| :--- | :--- | :--- |
| 22 | 56 | true |
| 23 | 56 | true |
| 23 | 57 | false |
| 23 | 58 | true |
| 24 | 58 | true |
| 25 | 58 | false |

So how does this help us? Well, if we know that version 56 of Bar is already in our prod environment, looking at the matrix tells us that we are safe to deploy version 22 or 23 to prod, but not any of the versions after. Conversely, if we know that version of 24 of Foo is in prod, then we know we're safe to deploy version 58 of Bar, but not any of the versions before.

Let's see how the Pact Matrix helps us deploy safely in practice.

In the deployment script for each application that uses Pact, we need to add a step that checks the Pact Matrix to make sure we're safe to deploy. The tool that we use to check the matrix is called [can-i-deploy](https://github.com/pact-foundation/pact_broker-client#can-i-deploy). It is part of the Pact Broker client command line interface, and is available via Docker, or an executable that you can install via a script.

Here is how we would check to see if we were safe to deploy Foo version 23 to production, given that we know version 56 of Bar is in production. \(The Pact Broker URL and credentials have been skipped for clarity.\) Note that "pacticipant" is not a typo - it's the Pact term for "an application that participates in a pact".

`$ pact-broker can-i-deploy --pacticipant Foo --version 24 --pacticipant Bar --version 56` \(exit code 0 means yes!\)

This works, but there's one problem - how do we get the production version of Bar in that line?

This is where "tags" come in. Tags are metadata \(just simple string values\) that are stored with the pacticipant version object in the database. A version may have many tags, and the same tag can be applied to many versions. \(You can think of the time ordered list of pacticipant versions that share the same tag as forming a "pseudo-branch" of versions.\)

When an application version is deployed to an environment, the relevant pacticipant version needs to be "tagged" with the name of that environment, so that the Pact Broker knows what is deployed where. Let's see what that looks like in code.

`$ pact-broker create-version-tag --pacticipant Bar --version 56 --tag prod`

This line would be added to the end of the deployment script for any application that uses Pact. There's no need to untag the previous `prod` version, as we specify "the latest `prod` version", rather than just "the `prod` version" in our commands. We're just using `prod` in our example, but it's recommended to do exactly the same thing with all your pre-prod environments too.

Now let's go back to our Foo can-i-deploy check. Let's ask the broker if we can deploy version 24 of Foo with the latest `prod` version of Bar \(that is, the latest version of Bar that has the tag `prod`.\)

`$ pact-broker can-i-deploy --pacticipant Foo --version 24 --pacticipant Bar --latest prod` \(exit code 0 means yes!\)

Great! The broker can work out which is the "latest `prod` version of Bar" because of the tags we gave it, and it can then work out if version 24 of Foo is compatible with it.

Now, what happens when Foo gets another provider, Baz. Do we need to add `--pacticipant Baz --latest prod` to the command? Well, actually, if all the providers are using tags, we don't need to specify the pacticipant names at all. The Pact Broker already knows which providers version 24 of Foo has pacts with, so we just need to say "can i deploy version 24 of Foo to prod?" and it can work out the rest.

`$ pact-broker can-i-deploy --pacticipant Foo --version 24 --to prod`

## Summary

To stay safe while avoiding "big bang" deployments, add the following line before deploying:

`$ pact-broker can-i-deploy --pacticipant PACTICIPANT --version VERSION --to STAGE`

and add the following line after deploying:

`$ pact-broker create-version-tag --pacticipant PACTICIPANT --version VERSION --tag STAGE`

## Further reading

Please see the [Pact Broker Client CLI documentation](https://github.com/pact-foundation/pact_broker-client#can-i-deploy) for an explanation of all the parameters for can-i-deploy.



\`\`

