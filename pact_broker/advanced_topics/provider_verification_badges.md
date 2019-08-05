# Provider verification badges

_See the the_ [_Badges_](../configuration.md#Badges) _section of the configuration page for information about accessing the badges._

If you are publishing [Provider verification results](provider_verification_results.md) to your Pact Broker \(v2.3.0+\), you can also display the verification status in your READMEs using a shiny badge like this one:

[![Pact Status](https://cdn.rawgit.com/wiki/pact-foundation/pact_broker/images/foo-bar-badge-verified.svg)](https://test.pact.dius.com.au)

## Quick start

To get your badge, open the HTML version of your `/latest`, `/latest/TAG` or `/latest-untagged` pact in the Pact Broker by copy/pasting its URL into your browser location bar. Your badge will be shown in the top right of the page. When you click on it, a text box will appear with the markdown to include in your README.

## Advanced usage

### Without tags, or with only Consumer tags.

The URL of the badge is the URL of the latest pact with `/badge.svg` appended, and it works for the `/latest/TAG` and `/latest-untagged` pact URLs as well

* Latest pact badge: `https://your-broker/pacts/provider/PROVIDER/consumer/CONSUMER/latest/badge.svg`
* Latest tagged pact badge: `https://your-broker/pacts/provider/PROVIDER/consumer/CONSUMER/latest/TAG/badge.svg`
* Latest un-tagged pact badge: `https://your-broker/pacts/provider/PROVIDER/consumer/CONSUMER/latest-untagged/badge.svg`\)

The markdown to include in your README is as follows:

```text
[![Foo/Bar Pact Status](https://your-broker/pacts/provider/PROVIDER/consumer/CONSUMER/latest/badge.svg)](https://your-broker)
```

For example:

```text
[![Foo/Bar Pact Status](https://test.pact.dius.com.au/pacts/provider/Bar/consumer/Foo/latest/badge.svg)](https://test.pact.dius.com.au)
```

### With consumer and provider tags

_Available in version v2.13.0+ of the Pact Broker gem._

If you are using tags for both the consumer and provider versions \(this is recommended by the way!\) the badge URL will be a little different. The format is:

`/matrix/provider/PROVIDER/latest/PROVIDER_TAG/consumer/CONSUMER/latest/CONSUMER_TAG/badge`

## Options

[![Pact Status](https://cdn.rawgit.com/wiki/pact-foundation/pact_broker/images/long-badge.svg)](https://test.pact.dius.com.au)

If your consumer and provider name make your badge too long to be aesthetically pleasing, you can shorten it in the following ways.

* Show just the consumer or provider name by adding `?label=consumer` or `?label=provider` to the end of the URL.

  [![Pact Status](https://cdn.rawgit.com/wiki/pact-foundation/pact_broker/images/consumer-badge.svg)](https://test.pact.dius.com.au)

* Use the pacticipant's initials by adding `?initials=true`

  [![Pact Status](https://cdn.rawgit.com/wiki/pact-foundation/pact_broker/images/initials-badge.svg)](https://test.pact.dius.com.au)

* Use both the `label` and the `initials` params to show only the initials of the consumer or provider.

