# The difference between contract tests and functional tests (or How To Do Pacts In a Way That Won't Make You Want To Stab Your Eyes Out)

The difference between contract tests and functional tests is a debate that seems to surface quite often for teams who start investing seriously into contracts testing. The challenge is that it's not a black and white kind of situation, but more something that starts creeping up on the depth of contract testing.

One place where it can be common is around validation rules and rejected requests. For example, we might have a simple *User Service* that allows Consumers to register new users, typically with a POST request containing the details of the created user in the body.

A simple happy-path scenario for that interaction might look like:

```
Given "there is no user called Mary"
When "creating a user with username Mary"
  POST /users { "username": "mary", email: "...", ... }
Then
  Expected Response is 200 OK
```

Sticking to happy-paths is a risk of missing different response codes and potentially having the consumer misunderstand the way the provider behaves. So, let's had a failure scenario:

```
Given "there is already a user called Mary"
When "creating a user with username Mary"
  POST /users { "username": "mary", email: "...", ... }
Then
  Expected Response is 409 Conflict
```

So far so good, we're covering a new behaviour, with a different response code.

Now we've been talking to the Team managing the *User Service* and they tell us that username have a maximum length of 20 characters, also they only allow letters in the username and a blank username is obviously not valid. Maybe that's something we should add in our contract?

This is where we get on the slippery slope... it's very tempting to now add 3 scenarios to our contract, something like:

```
When "creating a user with a blank username"
  POST /users { "username": "", email: "...", ... }
Then
  Expected Response is 400 Bad Request
  Expected Response body is { "error": "username cannot be blank" }
```

```
When "creating a user with a username with 21 characters"
  POST /users { "username": "thisisalooongusername", email: "...", ... }
Then
  Expected Response is 400 Bad Request
  Expected Response body is { "error": "username cannot be more than 20 characters" }
```

```
When "creating a user with a username containing numbers"
  POST /users { "username": "us3rn4me", email: "...", ... }
Then
  Expected Response is 400 Bad Request
  Expected Response body is { "error": "username can only contain letters" }
```

We've gone past the contract testing as this point, we're actually testing that the *User Service* implements the validation rules correctly: this is functional testing, and it should be covered by the *User Service* in its own codebase.

What is the harm in this... more testing is good, right? The issue here is that these scenarios are going too far and create an unnecessarily tight contract - what if the *User Service* Team decides that actually 20 characters is too restrictive for username and increases it to 50 characters? What if now numbers are allowed in the username? Any Consumer should be unaffected by any of these changes, unfortunately the *Users Service* will break our Pact just by loosening the validation rules. These are not breaking changes, but by over-specifying our scenarios we are stopping the *User Service* Team from implementing them.

So let's go back to our scenarios and instead only test the way the *User Service* reacts to bad input:

```
Given that username "bad_username" is invalid
When "creating a user with an invalid username"
  POST /users { "username": "bad_username", ... }
Then
  Response is 400 Bad Request
  Response body is { "error": "<any string>" }
```

Subtle, but so much more flexible! Now the *User Service* Team can change their validation rules without breaking the Pact we give them... we don't really care what's the maximum length of the username or what type of characters are allowed, we only care that if we send something wrong, then we understand the way the *User Service* responds to us.

When writing a test for an interaction, ask yourself what you are trying to cover. Contracts should be about catching:

- bugs in the consumer
- misunderstanding from the consumer about end-points or payload
- breaking changes by the provider on end-points or payload

In short, your Pact scenarios should not dig into the business logic of the Provider but should stick with verifying that Consumer and Provider have a shared understanding of what requests and responses will be. In our example of validation, write scenarios about *how* the validation fails, not *why* the validation fails.
