# Provider States

See [Provider States](../../provider/using_provider_states_effectively.md) for an introduction into this advanced topic.

The text in the provider state should make sense when you read it as follows \(this is how the auto-generated documentation reads\):

Given **an alligator with the name Mary exists** \* Upon receiving **a request to retrieve an alligator by name** \*\* from Some Consumer With {"method" : "get", "path" : "/alligators/Mary" } Some Provider will respond with { "status" : 200, ...}

\* This is the provider state \*\* This is the request description

## Consumer code base

For example, some code that creates a pact in a consumer project might look like this:

```ruby
describe MyServiceProviderClient do

  subject { MyServiceProviderClient.new }

  describe "get_something" do
    context "when a thing exists" do
      before do
        my_service.given('a thing exists').
          upon_receiving('a request for a thing').
          with(method: 'GET', path: '/thing').
          will_respond_with(
            status: 200,
            headers: { 'Content-Type' => 'application/json' },
            body: { name: 'A small something'})
      end

      it "returns a thing" do
        expect(subject.get_something).to eq(SomethingModel.new('A small something'))
      end
    end

    context "when a thing does not exist" do
      before do
        my_service.given("a thing does not exist").
          upon_receiving("a request for a thing").
          with(method: 'get', path: '/thing').
          will_respond_with(status: 404)
      end

      it "returns nil" do
        expect(subject.get_something).to be_nil
      end
    end
  end
end
```

## Provider codebase

### Non-Ruby applications

To allow the correct data to be set up before each interaction is replayed, you will need to create an HTTP endpoint \(which may or may not actually be in the same application as your provider\) that accepts a JSON document describing the state. The exact format of this document depends on whether you are using the JVM implementation, or one of the wrapped Ruby implementations \(effectively everything that isn't JVM\).

The endpoint should set up the given provider state for the given consumer synchronously, and return an error if the provider state is not recognised. Namespacing your provider states within each consumer will avoid clashes if more than one consumer defines the same provider state with different data.

See the [pact-provider-verifier](https://github.com/pact-foundation/pact-provider-verifier#api-with-provider-states) documentation for the exact details of implementing a `provider-states-setup-url`.

### Ruby

To define service provider states that create the right data for the provider states described above, write the following in the service provider project. \(The consumer name here must match the name of the consumer configured in your consumer project for it to correctly find these provider states.\)

```ruby
# In /spec/service_consumers/provider_states_for_my_service_consumer.rb

Pact.provider_states_for 'My Service Consumer' do

  provider_state "a thing exists" do
    set_up do
      # Create a thing here using your framework of choice
      # eg. Sequel.sqlite[:somethings].insert(name: "A small something")
    end

    tear_down do
      # Any tear down steps to clean up the provider state
    end
  end

  provider_state "a thing does not exist" do
    no_op # If there's nothing to do because the state name is more for documentation purposes,
          # you can use no_op to imply this.
  end

end
```

Require your provider states file in the `pact_helper.rb`

```ruby
# In /spec/service_consumers/pact_helper.rb

require './spec/service_consumers/provider_states_for_my_service_consumer.rb'
```

## Base state

To define code that should run before/after each interaction for a given consumer, regardless of whether a provider state is specified or not, define set\_up/tear\_down blocks with no wrapping provider\_state.

```ruby
Pact.provider_states_for 'My Service Consumer' do

  set_up do
    # This will run before the set_up for provider state specified for the interaction.
    # eg. create API user, set the expected basic auth details
  end

  tear_down do
    # ...
    # This will run after the tear_down for the specified provider state.
  end
end
```

## Global state

Global state will be set up before consumer specific base state. Avoid using the global set up for creating data as it will make your tests brittle when more than one consumer exists.

```ruby
Pact.set_up do
  # eg. start database cleaner transaction
end

Pact.tear_down do
  # eg. clean database
end
```

## Testing error responses

It is important to test how your client will handle error responses.

```ruby
# Consumer codebase

describe MyServiceProviderClient do

  subject { MyServiceProviderClient.new }

  describe "get_something" do

    context "when an error occurs retrieving a thing" do
      before do
        my_service.given("an error occurs while retrieving a thing").
          upon_receiving("a request for a thing").with(method: 'get', path: '/thing').
          will_respond_with(
            status: 500,
            headers: { 'Content-Type' => 'application/json' },
            body: { message: "An error occurred!" } )
      end

      it "raises an error" do
        expect{ subject.get_something }.to raise_error /An error occurred!/
      end

    end
  end
end
```

```ruby
# Provider codebase

Pact.provider_states_for 'My Service Consumer' do
  provider_state "an error occurs while retrieving a thing" do
    set_up do
      # Stubbing is ususally the easiest way to generate an error with predictable error text.
      allow(ThingRepository).to receive(:find).and_raise("An error occurred!")
    end
  end
end
```

## Including modules for use in set\_up and tear\_down

Any modules included this way will be available in the set\_up and tear\_down blocks. One common use of this to include factory methods for setting up data so that the provider states file doesn't get too bloated.

```ruby
Pact.configure do | config |
  config.include MyTestHelperMethods
end
```

