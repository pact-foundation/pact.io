# Ensure backwards compatibility

If you want to ensure your provider is compatible with both the head version of your consumer, and the production version, you can use pact tagging to achieve this. To read more about this idea, check out this [blog post](http://techblog.realestate.com.au/enter-the-pact-matrix-or-how-to-decouple-the-release-cycles-of-your-microservices/) on decoupling the release cycles of your services.

## Step 1. Tag the production version of the pact

* Determine the production version of your consumer. eg. "1.0.0".
* Send a request to the Pact Broker's RESTful API to tag the given consumer version with the name of your choice. eg "prod"

  $ curl -v -X PUT -H "Content-Type: application/json" [http://pact-broker/pacticipants/Zoo App/versions/1.0.0/tags/prod](http://pact-broker/pacticipants/Zoo%20App/versions/1.0.0/tags/prod)

## Step 2. Configure the provider to verify the production pact

* Add a new pact URL to the verification configuration of your provider project. The new URL will be the same as the normal "latest" url, with the name of the tag appended. 

  eg. `http://pact-broker/pacts/provider/Animal%20Service/consumer/Zoo%20App/latest/prod`

If you are using Ruby, the provider configuration will look like this.

```ruby
Pact.service_provider 'Animal Service' do

  honours_pact_with "Zoo App" do
    pact_uri 'http://pact-broker/pacts/provider/Animal%20Service/consumer/Zoo%20App/latest'
  end

  honours_pact_with "Zoo App" do
    pact_uri 'http://pact-broker/pacts/provider/Animal%20Service/consumer/Zoo%20App/latest/prod'
  end

end
```

