# The difference between contract tests and functional tests (or How To Do Pacts In a Way That Won't Make You Want To Stab Your Eyes Out)

Because I'm short on time right now, I'm going to copy-paste this conversation from gitter which I think explains it well.

> Pierre Vincent @PierreVincent 05:09  
> This is pretty subtle, but I find when testing for error scenarios like these (which are pretty much “validation failed” scenarios), the scenario should not specify the _why_ of the validation failure, but more than _for some reason validation failed_.  
> What the contract is there to validate is how the server responds when rejecting a request, but not why it rejects the request.  
> So rather than naming your scenario using validation rules of the provider (which is provider business logic), just name your scenario about a failure case.  

```
Ex:
"description": "a request to allocate stock to a product",
"provider_state": "the product can be allocated",
expected status: 200 OK

"description": "a request to allocate stock to a product",
"provider_state": "the product cannot be allocated",
expected status: 400 BAD REQUEST
```

> This is much nicer to allow flexibility to the provider to manage its own validation rules.  

> Beth Skurrie @bethesque 08:15  
> "What the contract is there to validate is how the server responds when rejecting a request, but not why it rejects the request." @PierreVincent exactly! @sebastijanp_twitter you're trying to make sure your consumer can handle all the responses that will come back from the provider so it doesn't blow up in production. 

Edit: Functional testing would be about making sure the provider was doing the right thing with a request (these tests belong in the provider codebase, and it's not the job of the consumer team to be writing them). Contract testing is about making sure your consumer team and provider team have a shared understanding of what the requests and responses will be.

> As @PierreVincent says, there may be many reasons why validation fails, but what you want to test in the contract is 1) that your consumer can handle a validation failure response correctly (that's the consumer part of the pact test) and 2) that the validation failure response looks like you think it does (that's the provider verification part of the pact test).  

> **I guess a rule of thumb for working out whether to include a scenario or not is - if I don't include this scenario, what _bug in the consumer_ or what _misunderstanding about how the provider behaves_ might be missed. Don't think so much about exposing _bugs in the provider_.**

## How not to do it

* Write responses that expect exact values where the exact values don't really matter. This will make your tests very brittle.
* Write separate interactions for every single business rule when the responses formats are exactly the same. This will make the maintenance a burden.
* Only test success scenarios. You need to know that your consumer can handle error scenarios.
 

