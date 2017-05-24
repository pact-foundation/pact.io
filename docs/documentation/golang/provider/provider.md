# Provider

Provider side Pact testing, involves verifying that the contract - the Pact file - can be satisfied by the Provider.

1. Start your Provider API:

	```go
	mux := http.NewServeMux()
	mux.HandleFunc("/setup", func(w http.ResponseWriter, req *http.Request) {
		w.Header().Add("Content-Type", "application/json")
	})
	mux.HandleFunc("/states", func(w http.ResponseWriter, req *http.Request) {
		fmt.Fprintf(w, `{"My Consumer": ["Some state", "Some state2"]}`)
		w.Header().Add("Content-Type", "application/json")
	})
	mux.HandleFunc("/someapi", func(w http.ResponseWriter, req *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		fmt.Fprintf(w, `
			[
				[
					{
						"size": 10,
						"colour": "red",
						"tag": [
							[
								"jumper",
								"shirt"
							],
							[
								"jumper",
								"shirt"
							]
						]
					}
				]
			]`)
	})
	go http.ListenAndServe(":8000"), mux)
	```

	Note that the server has 2 endpoints: `/states` and `/setup` that allows the
	verifier to setup
	[provider states](http://docs.pact.io/documentation/provider_states.html) before
	each test is run.

2. Verify provider API

	You can now tell Pact to read in your Pact files and verify that your API will
	satisfy the requirements of each of your known consumers:

	```go
	err := pact.VerifyProvider(&types.VerifyRequest{
		ProviderBaseURL:        "http://localhost:8000",
		PactURLs:               []string{"./pacts/my_consumer-my_provider.json"},
		ProviderStatesURL:      "http://localhost:8000/states",
		ProviderStatesSetupURL: "http://localhost:8000/setup",
	})

	if err != nil {
		t.Fatal("error:", err)
	}
	```

  Pact reads the specified pact files (from remote or local sources) and replays
  the interactions against a running Provider. If all of the interactions are met
  we can say that both sides of the contract are satisfied and the test passes.

	Note that `PactURLs` is a list of local pact files or remote based
	urls (e.g. from a
	[Pact Broker](http://docs.pact.io/documentation/sharings_pacts.html)).

	See the [integration tests](https://github.com/pact-foundation/pact-go/blob/master/dsl/pact_test.go)
	for a more complete E2E example.
