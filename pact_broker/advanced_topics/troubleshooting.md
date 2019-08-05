# Troubleshooting

## 409 when publishing a pact

When a pact is published normally \(via a PUT to `/pacts/provider/PROVIDER/consumer/CONSUMER/version/CONSUMER_APP_VERSION`\) the `consumer`, `provider` and `consumer version` resources are automatically created.

To prevent a pacticipant \(consumer or provider\) being created multiple times with slightly different name variants \(eg. FooBar/foo-bar/foo bar/Foo Bar Service\), if a new pacticipant name is deemed similar enough to an existing name, a 409 will be returned. The response body will contain instructions indicating that the pacticipant name should be corrected if it was intended to be an existing one, or that the pacticipant should be created manually if it was intended to be a new one.

Some Pact Broker clients unfortunately do not show the full error text when this happens. The full text is as follows:

```text
This is the first time a pact has been published for "%{new_name}".
The name "%{new_name}" is very similar to the following existing consumers/providers:
%{existing_names}
If you meant to specify one of the above names, please correct the pact configuration, and re-publish the pact.
If the pact is intended to be for a new consumer or provider, please manually create "%{new_name}" using the following command, and then re-publish the pact:
$ curl -v -XPOST -H "Content-Type: application/json" -d '{"name": "%{new_name}"}' http://broker/pacticipants
If the pact broker requires authentication, include '-u <username>:<password>' in the command.
```

If you wish to turn this name checking feature off, see the [configuration](../configuration.md#checking-for-potential-duplicate-pacticipant-names) page.

