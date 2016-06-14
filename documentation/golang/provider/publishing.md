# Publish Pact Files to a Pact Broker

See the [Pact Broker](http://docs.pact.io/documentation/sharings_pacts.html)
documentation for more details on the Broker and this [article](http://rea.tech/enter-the-pact-matrix-or-how-to-decouple-the-release-cycles-of-your-microservices/)
on how to make it work for you.

## Publishing from Go code

```go
pact.PublishPacts(&types.PublishRequest{
	PactBroker:             "http://pactbroker:8000",
	PactURLs:               []string{"./pacts/my_consumer-my_provider.json"},
	ConsumerVersion:        "1.0.0",
	Tags:                   []string{"latest", "dev"},
})
```

## Publishing from the CLI

Use a cURL request like the following to PUT the pact to the right location,
specifying your consumer name, provider name and consumer version.

```
curl -v -XPUT \-H "Content-Type: application/json" \
-d@spec/pacts/a_consumer-a_provider.json \
http://your-pact-broker/pacts/provider/A%20Provider/consumer/A%20Consumer/version/1.0.0
```

### Using the Pact Broker with Basic authentication

The following flags are required to use basic authentication when
publishing or retrieving Pact files to/from a Pact Broker:

* `BrokerUsername` - the username for Pact Broker basic authentication.
* `BrokerPassword` - the password for Pact Broker basic authentication.
