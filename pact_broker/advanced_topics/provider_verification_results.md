# Provider verification results

## Provider verification results

## Publishing

When a pact is verified against a provider, the outcome of that verification \(pass or fail\) needs to be made available to the consumer and provider teams, so they know whether or not the code in either project can be safely deployed. The pact verification tool can automatically publish the verification results back to the broker, and they will be displayed on the index page next to the pact details.

To use the verifications feature, you will need version 2.0+ of the Pact Broker, and a Pact implementation that wraps version &gt;= 1.11.1 of the pact gem, or pact-jvm &gt;= 3.5.4.

Note that you can only publish verification results for pacts that were retrieved from a pact broker. You cannot publish results for local pact files.

### Configuration

The exact method of configuration will depend on the implementation you are using, but the principle remains the same. You will need to set the provider application version, and turn the `publish_verification_results` setting on. Please check the documentation for your pact verification tool for instructions on how to configure verification publishing.

The recommended way to do this so that you only publish verifications from your CI is to detect some environment variable that is only available during CI \(eg. `BUILD_NUMBER`\).

```ruby
#assuming BUILD_NUMBER is only available in your CI
build_number = ENV.fetch('BUILD_NUMBER','dev') 
publish_flag = !!ENV['BUILD_NUMBER']

Pact.service_provider "My Service Provider" do
  app_version "1.3.#{build_number}"
  publish_verification_results publish_flag
end
```

If your pact URL includes basic auth configurations for the pact broker, these will be used to publish the verification.

## Querying

Once your verification is published, your consumer build will need some way of determining the verification results before releasing to production.

To do this, you need to know the version number of your candidate release eg. `1.2.3`, and you will need the [Pact Broker CLI](https://github.com/pact-foundation/pact-ruby-standalone/releases). The documentation for the `can-i-deploy` tool is [here](../can_i_deploy.md).

The `can-i-deploy` tool should be added to your consumer deployment script, before you do the actual deployment. If all the pacts for the given consumer version are not successfully verified the command will exit with an error code \(and will output the current verification results and let you know what is missing/failed\). If your deployment script is configured to stop on error \(as would be normal\), the rest of the deployment will not proceed.

Something to note is that if the content of your contract has not changed since the previous verification, then the contract will be "pre-verified" with the results of the last verification. This means that most of the time, you should be able to go straight from the consumer test/package phase into the deploy phase.

Changes to the contract that may cause the initial provider verification to fail should be introduced using [tags](using_tags/).

