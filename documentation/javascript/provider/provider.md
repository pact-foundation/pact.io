# Provider

Here is a provider verification example. The steps to validate a Provider are as follows:

1. Load the provider code base into your test
1. Append 2 endpoints to the API - one to retrieve all available [provider states](../../provider_states.md)), and another to set the current state.
1. Configure and run the verifier

```
const pact = require('@pact-foundation/pact-node');
const path = require('path');

// Import Provider functions
const {
  server,
  importData,
  repository
} = require('provider.js');

// Append some extra endpoints to mutate current state of the API
//
// Retreive available states
server.get('/states', (req, res) => {
  res.json({
    "Consumer Service A": ['Has some stuff', 'Has no stuff', 'Has a stuff with ID 1']
  });
});

// Set current state - here we load data into the API to allow us to test
//
server.post('/setup', (req, res) => {
  const state = req.body.state;

  repository.clear();
  switch (state) {
    case 'Has no stuff':
      // do nothing
      break;
    default:
      // Import a bunch of 'stuff' into repository
      importData();
  }

  res.end();
});

server.listen(8081, () => {
  console.log('Some Provider Service listening on http://localhost:8081');
});

// Configure the verification process:
//   - which API to test
//   - where to retrieve the pact files to validate
//   - which URLs should be called to configure any provider states
let opts = {
  providerBaseUrl: 'http://localhost:8081',
  providerStatesUrl: 'http://localhost:8081/states',
  providerStatesSetupUrl: 'http://localhost:8081/setup',
  pactUrls: ['https://test.pact.dius.com.au/pacts/provider/Animal%20Profile%20Service/consumer/Matching%20Service/latest'],
  pactBrokerUsername: 'username',
  pactBrokerPassword: 'password'
};

// Run the actual verification!
// This would typically be wrapped in a test block
// e.g. a mocha it('Validate pacts', () => {...})
pact.verifyPacts(opts).then((res) => {
  console.log('Pact Verification Complete!');
  console.log(res);
  process.exit(0);
}).catch((error) => {
  console.log('Pact Verification Failed: ', error);
  process.exit(1);
});
```
