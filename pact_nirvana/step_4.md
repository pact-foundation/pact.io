## 4. Automate the contract and verification results exchange

Now you have two different sets of tests in two different codebases. The artifacts that tie these tests together are the Pact file, and the verification results. The next step is to automate the exchange of these artifacts.

The [Pact Broker](https://github.com/pact-foundation/pact_broker) is a service that allows your projects to exchange pacts and verification results in an automated way.

While you can use Pact without a Pact Broker, using one allows you to get the most out of Pact. Without the Broker, you will have to work out how to create your own feedback loop that lets you know the results of the pact verifications, and your pacts will not enable to you release your services independently and safely using the `can-i-deploy` tool \(more on this later\).

{% hint style="info" %}
**Quick Start**

The Pact Broker is an open source tool that requires you to deploy, administer and host it yourself. If you would prefer a plug-and-play option, we've created [Pactflow](https://pactflow.io/?utm_source=ossdocs&utm_campaign=effective_pact_setup), a fully managed Pact Broker with additional features to simplify teams getting started and scaling with Pact.

Get started for free on our [Developer Plan](https://pactflow.io/pricing/?utm_source=ossdocs&utm_campaign=effective_pact_setup_dev_plan).
{% endhint %}

### A. Set up a Pact Broker

1. Read the Pact Broker [home page](https://github.com/pact-foundation/pact_broker), \(taking note of the various deployment options available to you\) and the [quick start guide](https://github.com/pact-foundation/pact_broker/wiki#quick-start-guide), or sign up to a hosted Developer plan at [Pactflow](https://pactflow.io/pricing/?utm_source=ossdocs&utm_campaign=effective_pact_setup_step_1).
2. Deploy a Pact Broker to a network that has access to both consumer and provider CI systems so it can trigger builds.

### B. Do the CI/CD workshop

Before setting up Pact in your own environment, it can help to have an idea of what a working pipeline might look like. Completing the [Pact CI/CD workshop](https://github.com/pactflow/ci-cd-workshop) will give you a good understanding of how the Pact client libaries interact with the Pact Broker and where these interactions fit into your release pipeline.

{% hint style="warning" %}
Note that if you are using your own instance of the open source Pact Broker, it does not support secrets, and it does not have a user interface for managing webhooks. You'll need to use the API to create the webhook, and your Travis CI token will have to be stored in plain text in the webhook.
{% endhint %}

### C. Configure pact publication

1. Configure your consumer build to run the Pact tests and publish its pact to the Broker as part of its main build \(consult the documentation for your chosen language\). Consumer Pact tests typically run after the unit tests, and before deploying to a test environment.

### D. Configure pact to be verified when provider changes

1. Configure your provider build to fetch the pact from the broker and publish the verification results as part of its main build \(consult the documentation for your chosen language\). This would typically happen after the unit tests, and before deploying to a test environment.

### E. Configure pact to be verified when contract changes

1. Create a new CI job that performs just the provider pact verification step for a given pact URL \(consult the documentation for your chosen language for how to configure this\). The job should accept the URL of the changed pact in the HTTP request parameters or body (you'll need to consult the documentation for your CI application to learn how to pass in parameters to a builld).
2. Configure a [webhook](/pact_broker/advanced_topics/webhooks/README.md) to kick off the provider verification build when a pact changes, and use [webhook templates](/pact_broker/advanced_topics/api_docs/webhooks.md#dynamic-variable-substitution) to pass the URL of the changed pact to the build.

As you have two different builds running the pact verifications \(one when the provider changes, one when the contract changes\) it is best to use a provider version number that is deterministic \(eg. does not include your CI build number\) so that a verification from either job is recorded with the same version number. The recommended approach is to use the git sha \(or equivalent for your version control system\) wherever possible. This will help you when it comes to using the `can-i-deploy` tool in step 7. Please read the section on [versioning in the Pact Broker](getting_started/versioning_in_the_pact_broker.md) to ensure your version numbers will help you get the most out of your Pact Broker.

Useful links:

* [Installing a Docker Pact Broker](https://hub.docker.com/r/pactfoundation/pact-broker)
* [Publishing verification results](/pact_broker/advanced_topics/provider_verification_results.md)
* [Configuring webhooks in the Pact Broker](/pact_broker/advanced_topics/webhooks/README.md)
* [Adding verification badges to your READMEs](/pact_broker/advanced_topics/provider_verification_badges.md)
* [Versioning in the Pact Broker](/getting_started/versioning_in_the_pact_broker.md)
