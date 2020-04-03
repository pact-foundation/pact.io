# Contract Tests vs Functional Tests

Contract tests focus on the messages that flow between a consumer and provider, while functional tests also ensure that the correct side effects have occured. For example, imagine an endpoint for a collection of `/orders` that accepts a `POST` request to create a new order. A contract test would ensure that the consumer and provider had a shared and accurate understanding of the request and response required to create an order, while a functional test for the provider would ensure that when a given request was made, that an `Order` with the correct attributes was actually persisted to the underlying datastore. A contract test _does not check for side effects_.

A more subtle distinction is required when it comes to contract testing interactions that don't have side effects, like validation error responses.

Imagine that we have a simple _User Service_ that allows Consumers to register new users, typically with a POST request containing the details of the created user in the body.

A simple happy-path scenario for that interaction might look like:

```text
Given "there is no user called Mary"
When "creating a user with username Mary"
  POST /users { "username": "mary", email: "...", ... }
Then
  Expected Response is 200 OK
```

Sticking to happy-paths is a risk of missing different response codes and potentially having the consumer misunderstand the way the provider behaves. So, let's look at a failure scenario:

```text
Given "there is already a user called Mary"
When "creating a user with username Mary"
  POST /users { "username": "mary", email: "...", ... }
Then
  Expected Response is 409 Conflict
```

So far so good, we're covering a new behaviour, with a different response code.

Now we've been talking to the Team managing the _User Service_ and they tell us that username have a maximum length of 20 characters, also they only allow letters in the username and a blank username is obviously not valid. Maybe that's something we should add in our contract?

This is where we get on the slippery slope... it's very tempting to now add 3 scenarios to our contract, something like:

```text
When "creating a user with a blank username"
  POST /users { "username": "", email: "...", ... }
Then
  Expected Response is 400 Bad Request
  Expected Response body is { "error": "username cannot be blank" }
```

```text
When "creating a user with a username with 21 characters"
  POST /users { "username": "thisisalooongusername", email: "...", ... }
Then
  Expected Response is 400 Bad Request
  Expected Response body is { "error": "username cannot be more than 20 characters" }
```

```text
When "creating a user with a username containing numbers"
  POST /users { "username": "us3rn4me", email: "...", ... }
Then
  Expected Response is 400 Bad Request
  Expected Response body is { "error": "username can only contain letters" }
```

We've gone past the contract testing at this point, we're actually testing that the _User Service_ implements the validation rules correctly: this is functional testing, and it should be covered by the _User Service_ in its own codebase.

What is the harm in this... more testing is good, right? The issue here is that these scenarios are going too far and create an unnecessarily tight contract - what if the _User Service_ Team decides that actually 20 characters is too restrictive for username and increases it to 50 characters? What if now numbers are allowed in the username? Any Consumer should be unaffected by any of these changes, unfortunately the _Users Service_ will break our Pact just by loosening the validation rules. These are not breaking changes, but by over-specifying our scenarios we are stopping the _User Service_ Team from implementing them.

So let's go back to our scenarios and instead choose just one simple example to test the way the _User Service_ reacts to bad input:

```text
When "creating a user with an invalid username"
  POST /users { "username": "bad_username_that_breaks_some_rule_that_you_are_fairly_confident_will_not_change", ... }
Then
  Response is 400 Bad Request
  Response body is { "error": "<any string>" }
```

Subtle, but so much more flexible! Now the _User Service_ Team can change \(most\) of their validation rules without breaking the Pact we give them... we don't really care about each individual business rule, we only care that if we send something wrong, then we understand the way the _User Service_ responds to us.

When writing a test for an interaction, ask yourself what you are trying to cover. Contracts should be about catching:

* bugs in the consumer
* misunderstanding from the consumer about end-points or payload
* breaking changes by the provider on end-points or payload

In short, your Pact scenarios should not dig into the business logic of the Provider but should stick with verifying that Consumer and Provider have a shared understanding of what requests and responses will be. In our example of validation, write scenarios about _how_ the validation fails, not _why_ the validation fails.

## Which test is responsible for what?

| Assertion | Test |
| :--- | :--- |
| Does the consumer code make the expected request? | Pact consumer tests \(Pact mock service\) |
| Does the consumer correctly handle the expected response? | Pact consumer tests \(using your own assertions\) |
| Does the provider handle the expected request? | Pact provider tests \(verifier\) |
| Does the provider return the expected response? | Pact provider tests \(verifier\) |
| Does the provider do the right thing with the request? | Provider's own functional tests |

### Does the consumer code make the expected request?

The expectations that get set up on the Pact mock service allow you to check that the consumer code is making the expected HTTP request to the provider. eg. Does it set the right content type, accept header, does it serialise the body correctly. The mock service will raise an error if the request sent to it does not match the expected request.

### Does the consumer correctly handle the expected response?

Does the consumer code correctly handle all the different HTTP status codes that are expected back? eg. Correctly parse a JSON body into a domain object for a 200 response, return a nil for a 404, return a validation error object for a 400, raise an exception for a 500. These assertions are made using your own test framework.

### Does the provider handle the expected request?

Are the path, query string, body, content type etc that have been used the correct way of invoking the provider's implementation? The Pact verification task checks this automatically for you by replaying each request in the pact against the the real provider.

### Does the provider return the expected response?

Does the provider return the response status, body and headers that the consumer expects for this request? The Pact verification task checks this automatically for you by comparing the returned response with the expected response in the pact file.

### Does the provider do the right thing with the request?

Does the provider do the correct thing with the data from the request. What are the side effects? eg. does it correctly store the new resource in its datasource, does it put a message on a queue, does it change the state of some related resource?

