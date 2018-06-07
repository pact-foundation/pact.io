# Javascript

[Pact JS](https://github.com/pact-foundation/pact-js) is currently compliant to Pact Specification Version 2.0.

## Quickstart guide (Consumer)

For a Consumer using Jest and node (for example, an app created with `create-react-app`):

First, you'll need to add the Pact library:

    npm install --save-dev '@pact-foundation/pact'

Then, add the following script to your `package.json`:

      scripts: {
        ...
        "pactTest":
        "export NODE_ENV=pactTest && jest --testRegex \"/*(.test.pact.js)\" --runInBand --setupFiles ./pactSetup.js --setupTestFrameworkScriptFile ./pactTestWrapper.js"
      }

You'll also need to give Pact some metadata about your setup. This is done with `pactSetup.js`:    

    const path = require('path');
    const { Pact } = require('@pact-foundation/pact');

    global.port = 8989;
    global.provider = new Pact({
      port: global.port,
      log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
      dir: path.resolve(process.cwd(), 'pacts'),
      spec: 2,
      cors: true,
      pactfileWriteMode: 'update',
      consumer: /* the name of your consumer */,
      provider: /* the name of your provider */
    });

 Global setup for Jest is handled with `pactTestWrapper.js`:

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; //* This is to give the pact mock server time to start

    beforeAll(() => provider.setup()); // Create mock provider
    afterEach(() => provider.verify()); // Ensure the mock provider verifies expected interactions for each test
    afterAll(() => provider.finalize()); // Tear down the mock and write the pact

Then you can write tests of the form `<filename>.test.pact.js`:

    import { Pact } from '@pact-foundation/pact';
    import { api } from /* wherever */;   // This is your client-side API layer


    describe('The API', () => {
      let url = 'http://localhost';

      // Copy this block once per interaction under test
      describe(/* The API interaction being tested in words (string) */, () => {
        beforeEach(() => {
          const interaction = {
            uponReceiving: /* Describe the request in words (string) */,
            withRequest: {
              method:  /* 'GET' or 'POST' or whatever (string) */,
              path:  /* '/foo/bar' (string) */,
              query:  /* '?query=parameters' (string) */,
              headers: {
                Accept: 'application/json'
                /* etc */
              }
            },
            willRespondWith: {
              status: 200,
              headers: {
                'Content-Type': 'application/json'
                /* etc */
              },
              body: /* describe the body (object using the Pact DSL)*/
            }
          };
          return provider.addInteraction(interaction);
        });

        // add expectations
        it(/* describe the test */, done => {
          api(url).someCall()
            .then(response => {
              expect(response).toEqual(/* check the response here, using the default values provided to the Pact DSL */);
            })
            .then(done);
        });
      });  
    });

Once this is all setup, you can run your first pact test:

    $ npm run pactTest

If successful, this will produce a pact file in `./pacts/`. If the test was unsuccessful, you can view detailed output in `./logs/mockserver-integration.log`.

## More information

If you need more information, the [Pact JS readme](https://github.com/pact-foundation/pact-js) has detailed information.

Additionally, these complete examples are useful guides:

* [Complete Example (Node env)](https://github.com/pact-foundation/pact-js/tree/master/examples/e2e)
* [Pact with Jest (Node env)](https://github.com/pact-foundation/pact-js/tree/master/examples/jest)
* [Pact with Mocha](https://github.com/pact-foundation/pact-js/tree/master/examples/mocha)
* [Pact with Karma + Jasmine](https://github.com/pact-foundation/pact-js/tree/master/karma/jasmine)
* [Pact with Karma + Mocha](https://github.com/pact-foundation/pact-js/tree/master/karma/mocha)
* [Angular 4 + Mocha](https://github.com/stones/pact-angular-4-mocha)
