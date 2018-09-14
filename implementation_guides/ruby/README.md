# Ruby

This getting started guide should help you get off the ground using Pact with Ruby. For more detail or advanced topics, head on over to the [Ruby Pact GitHub repository](https://github.com/pact-foundation/pact-ruby).

## Getting Started Guide

This [workshop](https://github.com/DiUS/pact-workshop-ruby-v2) walks you through an example problem from start to finish, exploring most concepts that Pact supports. It takes approximately 2 hours to complete.

## Installation

Add this line to your application's Gemfile:

```text
gem 'pact'
```

And then execute:

```text
$ bundle
```

Or install it yourself as:

```text
$ gem install pact
```

## Usage - an example scenario

We're going to write an integration, with Pact tests, between a `Consumer`, the Zoo App, and its `Provider`, the Animal Service. In the `Consumer` project, we're going to need to need a model \(the Alligator class\) to represent the data returned from the Animal Service, and a client \(the `AnimalServiceClient`\) which will be responsible for making the HTTP calls to the Animal Service.

![Example](../../.gitbook/assets/zoo_app-animal_service.png)

### In the Zoo App \(`Consumer`\) project

#### 1. Start with your model

Imagine a model class that looks something like this. The attributes for a Alligator live on a remote server, and will need to be retrieved by an HTTP call to the Animal Service.

```ruby
class Alligator
  attr_reader :name

  def initialize name
    @name = name
  end

  def == other
    other.is_a?(Alligator) && other.name == name
  end
end
```

#### 2. Create a skeleton Animal Service client class

Imagine an Animal Service client class that looks something like this.

```ruby
require 'httparty'

class AnimalServiceClient
  include HTTParty
  base_uri 'http://animal-service.com'

  def get_alligator
    # Yet to be implemented because we're doing Test First Development...
  end
end
```

#### 3. Configure the mock Animal Service

The following code will create a mock service on `localhost:1234` which will respond to your application's queries over HTTP as if it were the real "Animal Service" app. It also creates a mock provider object which you will use to set up your expectations. The method name to access the mock service provider will be what ever name you give as the service argument - in this case `animal_service`

```ruby
# In /spec/service_providers/pact_helper.rb

require 'pact/consumer/rspec'
# or require 'pact/consumer/minitest' if you are using Minitest

Pact.service_consumer "Zoo App" do
  has_pact_with "Animal Service" do
    mock_service :animal_service do
      port 1234
    end
  end
end
```

#### 4. Write a failing spec for the Animal Service client

```ruby
# In /spec/service_providers/animal_service_client_spec.rb

# When using RSpec, use the metadata `:pact => true` to include all the pact functionality in your spec.
# When using Minitest, include Pact::Consumer::Minitest in your spec.

describe AnimalServiceClient, :pact => true do

  before do
    # Configure your client to point to the stub service on localhost using the port you have specified
    AnimalServiceClient.base_uri 'localhost:1234'
  end

  subject { AnimalServiceClient.new }

  describe "get_alligator" do

    before do
      animal_service.given("an alligator exists").
        upon_receiving("a request for an alligator").
        with(method: :get, path: '/alligator', query: '').
        will_respond_with(
          status: 200,
          headers: {'Content-Type' => 'application/json'},
          body: {name: 'Betty'} )
    end

    it "returns a alligator" do
      expect(subject.get_alligator).to eq(Alligator.new('Betty'))
    end
  end
end
```

#### 5. Run the specs

Running the `AnimalServiceClient` spec will generate a pact file in the configured pact dir \(`spec/pacts` by default\). Logs will be output to the configured log dir \(`log` by default\) that can be useful when diagnosing problems.

Of course, the above specs will fail because the Animal Service client method is not implemented, so next, implement your provider client methods.

#### 6. Implement the Animal Service client consumer methods

```ruby
class AnimalServiceClient
  include HTTParty
  base_uri 'http://animal-service.com'

  def get_alligator
    name = JSON.parse(self.class.get("/alligator").body)['name']
    Alligator.new(name)
  end
end
```

#### 7. Run the specs again.

Green! You now have a pact file that can be used to verify your expectations of the Animal Service provider project.

Now, rinse and repeat for other likely status codes that may be returned. For example, consider how you want your client to respond to a:

* `404` \(return null, or raise an error?\)
* `500` \(specifying that the response body should contain an error message, and ensuring that your client logs that error message will make your life much easier when things go wrong\)
* `401/403` if there is authorisation.

### In the Animal Service \(`Provider`\) project

#### 1. Create the skeleton API classes

Create your API class using the framework of your choice \(the Pact authors have a preference for \[Webmachine\]\[webmachine\] and \[Roar\]\[roar\]\) - leave the methods unimplemented, we're doing Test First Development, remember?

#### 2. Tell your provider that it needs to honour the pact file you made earlier

Require `pact/tasks` in your Rakefile.

```ruby
# In Rakefile
require 'pact/tasks'
```

Create a `pact_helper.rb` in your service provider project. The recommended place is `spec/service_consumers/pact_helper.rb`.

See [Verifying Pacts](https://github.com/pact-foundation/pact-ruby/wiki/Verifying-pacts) and [the configuration documentation](configuration.md) for more information.

```ruby
# In specs/service_consumers/pact_helper.rb

require 'pact/provider/rspec'

Pact.service_provider "Animal Service" do

  honours_pact_with 'Zoo App' do

    # This example points to a local file, however, on a real project with a continuous
    # integration box, you would use a [Pact Broker](https://github.com/pact-foundation/pact_broker) or publish your pacts as artifacts,
    # and point the pact_uri to the pact published by the last successful build.

    pact_uri '../zoo-app/specs/pacts/zoo_app-animal_service.json'
  end
end
```

#### 3. Run your failing specs

```text
$ rake pact:verify
```

Congratulations! You now have a failing spec to develop against.

At this stage, you'll want to be able to run your specs one at a time while you implement each feature. At the bottom of the failed `pact:verify` output you will see the commands to rerun each failed interaction individually. A command to run just one interaction will look like this:

```text
$ rake pact:verify PACT_DESCRIPTION="a request for an alligator" PACT_PROVIDER_STATE="an alligator exists"
```

#### 4. Implement enough to make your first interaction spec pass

Rinse and repeat.

#### 5. Keep going til you're green

Yay! Your Animal Service `Provider` now honours the pact it has with your Zoo App `Consumer`. You can now have confidence that your `Consumer` and `Provider` will play nicely together.

### Using provider states

Each interaction in a pact is verified in isolation, with no context maintained from the previous interactions. So how do you test a request that requires data to already exist on the provider? Read about provider states [here](https://github.com/pact-foundation/pact-ruby/wiki/Provider-states).

