# Overview

The Pact Broker is a service that supports contract testing by enabling the exchange of pacts and verification results.

## How a Continuous Integration machine interacts with a Pact Broker

* The consumer CI build generates the pacts during execution of its isolated tests, and then publishes the generated pacts.
* The provider CI retrieves the pacts, performs the verification locally, and then publishes the verification results back to the broker.
* Consumer and provider CI deployment builds check with the broker before deploying to ensure the application version they are about deploy will be compatible with the versions of the other applications that are already in that environment.

## Pacts

A pact is published using the consumer name, the provider name, and the consumer _application_ version as an identifying key \(`PUT /pacts/provider/PROVIDER/consumer/CONSUMER/version/CONSUMER_APPLICATION_VERSION`\). The versioning of the _pact content_ itself is done behind the scenes by the broker, and is not something that the user needs to manage.

## Pacticipants

`Consumer` and `provider` applications are known as `pacticipants` \(a bad pun which the Pact Broker author now regrets.\) A `pacticipant` may be both a `consumer` and a `provider`. Pacticipants are automatically created when a pact is published for the first time.

## Pacticipant versions

A pacticipant has many pacticipant versions \(ie. application versions\). A version is identified by its [version number](pacticipant_version_numbers.md) which would typically be a git sha \(or subversion revision number\), or a semantic version number with a repository reference as metadata. A pacticipant version resource will be automatically created every time a pact or a verification result is published \(if it did not already exist\). A pacticipant version will have a pact associated with it if it is a consumer version, and it will have a verification result if is a provider version.

## Verification results

When a pact is published, we know the `provider`, the `consumer` and the `consumer version`. We don't know the `provider version` until the pact is verified, and the verification results are published. A verification is published using the consumer name, the provider name, and the SHA of the pact _content_. This means that if a new pact is published with exactly the same content as a previously verified one, it will automatically inherit the verification results of the existing content.

## Tags

Tags are used to "bookmark" important versions of an application \(known as a `pacticipant` in the API\). They are generally used for identifying stages \(eg. `dev`, `staging`, `prod`\) or branches \(eg. `feat-some-new-thing`\) of your application. For example you might tag version `1.2.3+c6d6a4` of application `Foo` as the `prod` version \(`PUT /pacticipants/PACTICIPANT/versions/VERSION/tags/TAG`. A version can have multiple tags, and the same tag can be used on many versions. Typically, however, we're interested in the latest version that has a particular tag eg. the latest `prod` version.

While tags belong to pacticipant _versions_, they are mostly used for retrieving _pacts_. For example, retrieving the latest `prod` pact or the latest `feat-some-new-thing` pact \(`GET /pacts/provider/PROVIDER/consumer/CONSUMER/latest/TAG`\)

## Webhooks

Webhooks are configurable HTTP requests that run when certain events happen in the Pact Broker. The most common use of webhooks is for triggering a provider build when a pact with new content is published, and triggering a consumer build when provider verification results are published.

## The Matrix

"The Matrix" is the table that is created when you join every pact publication with every verification result publication. It shows you what consumer and provider versions are \(and are not\) compatible with each other.

| Consumer | Consumer version | Provider | Provider version | Success? |
| :--- | :--- | :--- | :--- | :--- |
| Foo | 1 | Bar | 3 | true |
| Foo | 1 | Bar | 4 | true |
| Foo | 2 | Bar | 4 | false |
| Foo | 2 | Bar | 5 | true |

In the above table, Foo published a pact for v1, and Bar v3 verified it successfully. Bar v4 also verified it successfully. Then, Foo published a pact for v2, but Bar v4 verification failed because Foo had added a new interaction without telling the Bar team about it in advance \(naughty!\). Bar made a code change so that they could successfully verify in v5.

## Can I deploy?

The [can-i-deploy](https://docs.pact.io/pact_broker/can_i_deploy) CLI is a tool that uses the Matrix to ensure that you can release your application safely. It checks that the application version you are about to release is compatible with the existing versions of the other applications in that environment. It effectively makes sure there is a row in the Matrix with matching values for the consumer and provider versions, and a `success` value of true.

## Navigating the API

The Pact Broker API uses [HAL](http://stateless.co/hal_specification.html) \(Hypertext Application Language\) as its hypermedia implementation \(that is, the method of providing links within a resource to navigate from that resource to related resources\). The Broker comes with an embedded HAL browser that lets you navigate the API in your browser window by using the HAL relations in each resource. You can start with the index resource and navigate to almost any resource in the API just by clicking the `GET` button the appropriate relation. Any programmatic client of the Pact Broker will use these links rather than constructing URLs manually, to allow the API to evolve without breaking its clients.

The HAL specification also provides a built in method for providing documentation about a relation. You can navigate to this documentation in the HAL browser by clicking on the book icon next to that relation in the HAL browser.
