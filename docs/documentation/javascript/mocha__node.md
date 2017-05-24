# Mocha / Node

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
* Create a new folder `logs` where you can check all the interactions received by the Mock Service
* Create a new folder `tmp` where it will store all `Pacts` successfully verified by the test

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
