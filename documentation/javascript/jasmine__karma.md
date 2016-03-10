# Jasmine / Karma

### Jasmine
If you starting a new project, run `npm init` to get a `package.json` going.

With a `package.json` file in place run `npm install --save-dev --save-exact jasmine karma karma-jasmine karma-chrome-launcher karma-cli` on your terminal to install Jasmine and Karma.

Once you're ready to go with Jasmine install the DSL by running `npm install --save-dev --save-exact pact-consumer-js-dsl`.

#### Setup Karma
Run `karma init`. Answer **jasmine** for *testing framework* and **no** for *use require.js*.

Tell Karma about `pact-consumer-js-dsl.js` in `karma.conf.js`. In the `files: []` section add a new entry for `node_modules/pact-consumer-js-dsl/dist/pact-consumer-js-dsl.js`.

Allow tests to load resources from `Pact Mock Server`. One way to do this is in the `karma.conf.js`, change `browsers: ['Chrome']` to,

 ```javascript
browsers: ['Chrome_without_security'],
customLaunchers: {
  Chrome_without_security: {
      base: 'Chrome',
      flags: ['--disable-web-security']
  }
}
```
Or `browsers: ['PhantomJS']` to:
```javascript
browsers: ['PhantomJS_without_security'],
customLaunchers: {
  PhantomJS_without_security: {
    base: 'PhantomJS',
    flags: ['--web-security=false']
  }
}
```

Make sure the source and test files are included by Karma in the `karma.conf.js` in the files array.

#### Test
Write your Jasmine test like below:
```javascript
describe("Client", function() {
  var client, helloProvider;

  beforeEach(function() {
    //ProviderClient is the class you have written to make the HTTP calls to the provider
    client = new ProviderClient('http://localhost:1234');
    
    // setup your mock service
    // your client above should be routed through to this guy
    // during testing so expectactions can be recorded
    helloProvider = Pact.mockService({
      consumer: 'Hello Consumer',
      provider: 'Hello Provider',
      port: 1234,
      done: function (error) {
        expect(error).toBe(null);
      }
    });
  });

  it("should say hello", function(done) {
    var requestHeaders  = { "Accept": "application/json" };
    var responseHeaders = { "Content-Type": "application/json" };
    var responseBody    = { "name": "Mary" };

    helloProvider
      .given("an alligator with the name Mary exists")
      .uponReceiving("a request for an alligator")
      .withRequest("GET", "/alligators/Mary", requestHeaders)
      .willRespondWith(200, responseHeaders, responseBody);

    helloProvider.run(done, function(runComplete) {
      expect(client.getAlligatorByName("Mary")).toEqual(new Alligator("Mary"));
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

From there, type in `karma start` on your terminal to get your test executed. Once successful a new Pact file will be generated at `tmp/pacts/hello_consumer-hello_provider.json` that looks somewhat like this:
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
