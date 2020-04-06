# Publishing and retrieving pacts

## Publishing

### Publish using CLI tools

The recommended way to publish pacts are to use the [CLI tools](https://github.com/pact-foundation/pact-ruby-standalone/releases) which make administration a breeze:

```text
pact-broker publish --consumer-app-version 1.0.0 --broker-base-url https://dius.pact.dius.com.au --broker-token SomeToken /path/to/pacts/consumer-provider.json --tag master
```

### Publish using HTTP Requests

Pacts are published by making a `PUT` request to the path `/pacts/provider/PROVIDER/consumer/CONSUMER/version/CONSUMER_VERSION_NUMBER` with the pact json document as the body.

For example:

```text
curl -v -XPUT \-H "Content-Type: application/json" \
-d@spec/pacts/a_consumer-a_provider.json \
http://your-pact-broker/pacts/provider/A%20Provider/consumer/A%20Consumer/version/1.0.0+4jvh387gj3
```

Or on Windows:

```text
$res = Invoke-WebRequest -Uri "http://your-pact-broker/pacts/provider/A%20Provider/consumer/A%20Consumer/version/1.0.0+4jvh387gj3" -Method Put -InFile .\a_consumer-a_provider.json -ContentType "application/json"
```

You most likely won't need to get your hands dirty with curl however, as pact publishing is built in to most of the native pact libraries already. See the [Language Support](https://docs.pact.io/getting_started/sharing_pacts#language-support) section of the documentation on "Sharing Pacts" on docs.pact.io to find out how to configure pact publishing in your language.

Please read about [Pacticipant version numbers](pacticipant_version_numbers.md) to ensure you are using the correct format.

## Retrieving

### Latest pact for a provider and consumer

If you are using an older broker, note that the "latest" pact may be determined by inspecting the consumer version number of the pact according to semantic versioning rules, not by the timestamp.

The following URL will return the latest pact between a specified consumer and provider. Keep reading however, as it is not necessarily the URL you should use for retrieving the pact to verify.

```text
http://your-pact-broker/pacts/provider/PROVIDER/consumer/CONSUMER/latest
```

The `latest` endpoint returns the latest pact, _regardless of tags_. If you want to [use tagging](advanced_topics/using_tags/) to enable you to effectively make "feature branch pacts" \(RECOMMENDED!\), then you should use one of the following two URLs to retrieve the "latest" pact for verification.

To retrieve the latest pact for a given tag \(eg.`master`, `prod` or `feature-x`\), use:

```text
http://your-pact-broker/pacts/provider/PROVIDER/consumer/CONSUMER/latest/TAG
```

To retrieve the latest pact without any tags, use:

```text
http://your-pact-broker/pacts/provider/PROVIDER/consumer/CONSUMER/latest-untagged
```

### Latest pacts for a provider

```text
http://your-pact-broker/pacts/provider/PROVIDER/latest
```

### All latest pacts

```text
http://your-pact-broker/pacts/latest
```

Use the built in HAL Browser at `/hal-browser/browser.html` to explore more endpoints in the pact broker.

