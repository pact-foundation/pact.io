# Provider States

Each interaction in a pact should be verified in isolation, with no context
maintained from the previous interactions. So how do you test a request that
requires data to exist on the provider? Provider states are how you achieve
this using Pact.

Provider states also allow the consumer to make the same request with different
expected responses (e.g. different response codes, or the same resource with a
different subset of data).

States are configured on the consumer side when you issue a dsl.Given() clause
with a corresponding request/response pair.

Configuring the provider is a little more involved, and (currently) requires 2
running API endpoints to retrieve and configure available states during the
verification process. The two options you must provide to the dsl.VerifyRequest
are:

```
ProviderStatesURL: 		    GET URL to fetch all available states (see types.ProviderStates)
ProviderStatesSetupURL: 	POST URL to set the provider state (see types.ProviderState)
```

Example routes using the standard Go http package might look like this, note
the `/states` endpoint returns a list of available states for each known consumer:

```go
// Return known provider states to the verifier (ProviderStatesURL):
mux.HandleFunc("/states", func(w http.ResponseWriter, req *http.Request) {
	states :=
	`{
		"My Front end consumer": [
			"User A exists",
			"User A does not exist"
		],
		"My api friend": [
			"User A exists",
			"User A does not exist"
		]
	}`
		fmt.Fprintf(w, states)
		w.Header().Add("Content-Type", "application/json")
})

// Handle a request from the verifier to configure a provider state (ProviderStatesSetupURL)
mux.HandleFunc("/setup", func(w http.ResponseWriter, req *http.Request) {
	w.Header().Add("Content-Type", "application/json")

	// Retrieve the Provider State
	var state types.ProviderState

	body, _ := ioutil.ReadAll(req.Body)
	req.Body.Close()
	json.Unmarshal(body, &state)

	// Setup database for different states
	if state.State == "User A exists" {
		svc.userDatabase = aExists
	} else if state.State == "User A is unauthorized" {
		svc.userDatabase = aUnauthorized
	} else {
		svc.userDatabase = aDoesNotExist
	}
})
```

See the examples or read more at http://docs.pact.io/documentation/provider_states.html.
