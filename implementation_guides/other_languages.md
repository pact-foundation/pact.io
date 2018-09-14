# Other Languages

For `Providers` written in languages that don't have native Pact support, you can still verify that they satisfy their Pacts, using the generic [Pact Provider Verification tool](https://github.com/pact-foundation/pact-provider-verifier).

## Generic Pact Provider Verification

This setup simplifies Pact Provider verification process in any language.

**Features**:

* Verify Pacts published to a [Pact Broker](https://github.com/pact-foundation/pact_broker)
* Verify local `*.json` Pacts for testing in a development environment
* Pre-configured Docker image with Ruby installed and a sane, default `src/Rakefile` keeping things DRY
* Works with Pact [provider states](https://github.com/pact-foundation/pact-ruby/wiki/Provider-states) should you need them

The two solutions below use the [Docker](https://github.com/DiUS/pact-provider-verifier-docker) image and the [Pact Provider Verifier](https://github.com/pact-foundation/pact-provider-verifier) Gem. For advanced usage, you can use [Pact Provider Proxy](https://github.com/pact-foundation/pact-provider-proxy) Gem directly, however in most cases the Pact Provider Verifier should cover your needs.

### How it works

_Steps_:

1. Create an API and a corresponding Docker image for it
2. Publish Pacts to the Pact broker \(or create local ones\)
3. Start your API
4. Run the Pact Provider Verifier
5. Stop your API

The verifier will then replay all of the Pact files against your running API, and will fail \(`exit 1`\) if they are not satisfied.

There is no testing DSL available so you will need to be sensitive to process exit codes when running this in a CI/CD pipeline.

If you are using Docker and Docker compose, steps 3-5 above are automatically taken care of for you.

### Docker Example

The example below uses Docker image from the [Pact Provider Verifier](https://github.com/DiUS/pact-provider-verifier-docker) project.

_Steps_:

1. Create an API and a corresponding Docker image for it
2. Publish Pacts to the Pact broker \(or create local ones\)
3. Create a `docker-compose.yml` file connecting your API to the Pact Verifier
4. Set the following required environment variables:
   * `pact_urls` - a comma delimited list of pact file urls
   * `provider_base_url` - the base url of the pact provider \(i.e. your API\)
5. Run `docker-compose build` and then `docker-compose up`

**Sample docker-compose.yml file for a Node API exposed on port 4000:**

```text
api:
  build: .
  command: npm start
  expose:
  - "4000:4000"

pactverifier:
  image: dius/pact-provider-verifier-docker
  links:
  - api:api
  volumes:
  - ./pact/pacts:/tmp/pacts                 # If you have local Pacts
  environment:
  - pact_urls=http://pact-host:9292/pacts/provider/MyAPI/consumer/MyConsumer/latest
  #- pact_urls=/tmp/pacts/foo-consumer.json # If you have local Pacts
  - provider_base_url=http://api:4000
```

#### API with Provider States

Execute pact provider verification against a provider which implements the following:

* an http post endpoint which sets the active pact consumer and provider state

  ```text
    consumer=web&state=customer%20is%20logged%20in
  ```

The following environment variables required:

* `pact_urls` - a comma delimited list of pact file URL
* `provider_base_url` - the base URL of the pact `Provider`
* `provider_states_active_url` - the full URL of the endpoint which sets the active pact `Consumer` and `Provider` state\`

_Updated Sample docker-compose.yml file:_

```text
api:
    build: .
    command: npm start
    expose:
    - "4000"

pactverifier:
    image: dius/pact-provider-verifier-docker
    links:
    - api
    environment:
    - pact_urls=http://pact-host:9292/pacts/provider/MyProvider/consumer/myConsumer/latest
    - provider_base_url=http://api:4000
    - provider_states_active_url=http://api:4000/provider-states/active
```

### Ruby Example

If you're not using Docker, you will need to:

* Install a Ruby runtime
* Fork/clone the [repository](https://github.com/DiUS/pact-provider-verifier-docker) or copy the scripts into your project
* Run the following commands:

```text
bundle install
bundle exec rake verify_pacts
```

