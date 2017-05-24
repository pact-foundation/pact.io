# Consumer

Consumer side Pact testing is an isolated test that ensures a given component
is able to collaborate with another (remote) component. Pact will automatically
start a Mock server in the background that will act as the collaborators' test
double.

This implies that any interactions expected on the Mock server will be validated,
meaning a test will fail if all interactions were not completed, or if unexpected
interactions were found:

A typical consumer-side test would look something like this:

```go
func TestLogin(t *testing.T) {

	// Create Pact, connecting to local Daemon
	// Ensure the port matches the daemon port!
	pact := &Pact{
		Port:     6666,
		Consumer: "My Consumer",
		Provider: "My Provider",
	}
	// Shuts down Mock Service when done
	defer pact.Teardown()

	// Pass in your test case as a function to Verify()
	var test = func() error {
		_, err := http.Get("http://localhost:8000/")
		return err
	}

	// Set up our interactions. Note we have multiple in this test case!
	pact.
		AddInteraction().
		Given("User Matt exists"). // Provider State
		UponReceiving("A request to login"). // Test Case Name
		WithRequest(&Request{
			Method: "GET",
			Path:   "/login",
		}).
		WillRespondWith(&Response{
			Status: 200,
		})

	// Run the test and verify the interactions.
	err := pact.Verify(test)
	if err != nil {
		t.Fatalf("Error on Verify: %v", err)
	}

	// Write pact to file
	pact.WritePact()
}
```

If this test completed successfully, a Pact file should have been written to
`./pacts/my_consumer-my_provider.json` containing all of the interactions
expected to occur between the Consumer and Provider.
