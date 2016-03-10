# Mocha / Node

### Pact Mock Service
This is the first thing you gotta do. If you are on Windows, please refer to the [Installing pact-mock-service on Windows](https://github.com/bethesque/pact-mock_service/wiki/Installing-the-pact-mock_service-gem-on-Windows).

To install Pact Mock Service you gotta have Ruby installed. Create a `Gemfile` on your project and add the below:

```ruby
source 'https://rubygems.org'
gem 'pact-mock_service', '~> 0.7.0'
```

Then, on your terminal, run `gem install bundler && bundle install`. You should get an output similar to this

```bash
Fetching gem metadata from https://rubygems.org/.........
Fetching version metadata from https://rubygems.org/..
...
Installing pact-support 0.5.3
Installing pact-mock_service 0.7.0
Bundle complete! 1 Gemfile dependency, 19 gems now installed.
```

_**Note:** Windows users must run the install command after following Wiki instructions_

### Mocha
If you starting a new project, run `npm init` to get a `package.json` going.

With a `package.json` file in place run `npm install --save-dev --save-exact mocha` on your terminal to install [Mocha](https://mochajs.org/). Also run `npm install --save-dev --save-exact chai` to install the [Chai.js assertion library](http://chaijs.com/).

Once you're ready to go with mocha install the DSL by running `npm install --save-dev --save-exact pact-consumer-js-dsl`.

#### Test
Write your Mocha test like below - written with `ES2015` syntax.

```javascript
import { expect } from 'chai'
import Pact from 'pact-consumer-js-dsl'

describe("Client", () => {
  // ProviderClient is the class you have written to make the HTTP calls to the provider
  const client = new ProviderClient('http://localhost:1234');

  var helloProvider;

  beforeEach(() => {
    // setup your mock service
    // your client above should be routed through to this guy
    // during testing so expectactions can be recorded
    helloProvider = Pact.mockService({
      consumer: 'Hello Consumer',
      provider: 'Hello Provider',
      port: 1234,
      done: (error) => {
        expect(error).to.be.null;
      }
    });
  });

  it("should say hello", (done) => {
    const requestHeaders  = { "Accept": "application/json" };
    const responseHeaders = { "Content-Type": "application/json" };
    const responseBody    = { "name": "Mary" };
    
    // setting expectation
    helloProvider
      .given("an alligator with the name Mary exists")
      .uponReceiving("a request for an alligator")
      .withRequest("GET", "/alligators/Mary", requestHeaders)
      .willRespondWith(200, responseHeaders, responseBody);

    // verifying expectation
    helloProvider.run(done, (runComplete) => {
      expect(client.getAlligatorByName("Mary")).to.eql(new Alligator("Mary"));
      runComplete();
    });
  });
});
```

#### Running it
Before running your test you have to start the Pact Mock Service. To do so, run the below
```bash
bundle exec pact-mock-service -p 1234 --pact-specification-version 2.0.0 -l logs/pact.logs --pact-dir tmp/pacts
```
The command will:
* create a new folder `logs` where you can check all the interactions received by the Mock Service
* create a new folder `tmp` where it will store all `Pacts` successfully verified by the test

From there, type in `mocha` on your terminal to get your test executed. Once successful a new Pact file will be generated at `tmp/pacts/hello_consumer-hello_provider.json` that looks somewhat like this:
```json
{
  "consumer": {
    "name": "Hello Consumer"
  },
  "provider": {
    "name": "Hello Provider"
  },
  "interactions": [
    {
      "description": "a request for an alligator",
      "provider_state": "an alligator with the name Mary exists",
      "request": {
        "method": "get",
        "path": "/alligators/Mary",
        "headers": {
          "Accept": "application/json"
        }
      },
      "response": {
        "status": 200,
        "headers": {
          "Content-Type": "application/json"
        },
        "body": {
          "name": "Mary"
        }
      }
    }
  ],
  "metadata": {
    "pactSpecificationVersion": "2.0.0"
  }
}
```

### Flexible Matching
Make sure you read about [matching][documentation/matching.md] first.

#### Match by regular expression
Remember that the mock service is written in Ruby, so the regular expression must be in a Ruby format, not a JavaScript format. Make sure to start the mock service with the argument `--pact-specification-version 2.0.0`.

```javascript
provider
  .given('there is a product')
  .uponReceiving("request for products")
  .withRequest({
    method: "GET",
    path: "/products",
    query: {
      category: Pact.Match.term({matcher: "\\w+", generate: 'pizza'}),
    }
  })
  .willRespondWith(
    200,
    {},
    {
      "collection": [
        { guid: Pact.Match.term({matcher: "\\d{16}", generate: "1111222233334444"}) }
      ]
    }
  );
```

#### Match based on type
```javascript

provider
  .given('there is a product')
  .uponReceiving("request for products")
  .withRequest({
    method: "get",
    path: "/products",
    query: {
      category: Pact.Match.somethingLike("pizza")
    }
  })
  .willRespondWith(
    200,
    {},
    {
      "collection": [
        { guid: Pact.Match.somethingLike(1111222233334444) }
      ]
    }
  );
```

#### Match based on arrays
Matching provides the ability to specify flexible length arrays. For example:

```javascript
Pact.Match.eachLike(obj, { min: 3 })
```

Where `obj` can be any Javascript `object`, value or `Pact.Match`. It takes optional argument (`{ min: 3 }`) where min is greater than 0 and defaults to 1 if not provided. 

Below is an example that uses all of the Pact Matchers.

```javascript
var somethingLike = Pact.Match.somethingLike;
var term          = Pact.Match.term;
var eachLike      = Pact.Match.eachLike;

provider
  .given('there is a product')
  .uponReceiving("request for products")
  .withRequest({
    method: "get",
    path: "/products",
    query: { category: "clothing" }
  })
  .willRespondWith({
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: {
        "items": eachLike({
            size: somethingLike(10),
            colour: term("red|green|blue", {generates: "blue"}),
            tag: eachLike(somethingLike("jumper"))
        }, {min: 2})
    }
  });
```
