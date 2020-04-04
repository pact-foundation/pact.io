---
description: Automating Pact Broker with Terraform
---

# Terraform Provider

If infrastructure as code is your thing, we have created a Terraform provider to automate some aspects of your Pact Broker setup.

### Using the Provider

Here is a list of resources available for configuration:

| Plugin | Type | Platform Support | Description |
| :--- | :--- | :--- | :--- |
| [Pact](https://github.com/pactflow/terraform/blob/master/docs/provider_pact.html.markdown) | Provider | Pact Broker + Pactflow | Configures a target Pact Broker \(such as a pactflow.io account\) |
| [Pacticipant](https://github.com/pactflow/terraform/blob/master/docs/resource_pacticipant.html.markdown) | Resource | Pact Broker + Pactflow | Create applications \(known as Pacticipants\) |
| [Webhook](https://github.com/pactflow/terraform/blob/master/docs/resource_webhook.html.markdown) | Resource | Pact Broker + Pactflow | Configures a webhook to trigger on certain platform events |
| [Secret](https://github.com/pactflow/terraform/blob/master/docs/resource_secret.html.markdown) | Resource | Pactflow | Create an encrypted secret for use in Webhooks |
| [API Token](https://github.com/pactflow/terraform/blob/master/docs/resource_token.html.markdown) | Resource | Pactflow | Manage Pactflow API Tokens |

Learn more at the official website:

{% embed url="https://github.com/pactflow/terraform" %}





