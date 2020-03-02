# Handling authentication and authorization

There are a few options for handling authentication and authorization during the verification step. When making your decision, it's best to be pragmatic rather than idealistic, and just make sure that you've tested your authentication and authorization integration code _somewhere_ rather than insisting that it has to be in a certain place.

## 1. Test auth code outside of Pact

Pact tests don't usually provide sufficient coverage on their own, so consider whether or not the authentication and authorization needs to be part of the contract, or whether it could be covered in another type of test \(eg. canary tests, synthetic monitoring, lightweight traditional integration testing\). Authentication and authorization protocols tend to use common and stable patterns and are unlikely to change, so the benefits of including them in the contract may not be worth it.

## 2. Stub auth services with hardcoded credentials

The authentication and authorization services could be stubbed to accept/deny previously agreed upon hardcoded credentials.

## 3. Set up users with matching credentials using provider states

Use pre-agreed upon credentials and set up the correct data so that authentication and authorization pass. It is best to use this only if your user data is internal to your service. External authentication providers should be stubbed.

## 4. Modify the request to use real credentials

Most Pact implementations allow some method of modifying the request before it is replayed \(eg. the Pact-JVM request filter, or Ruby Rack middleware\). If this is not possible, you could provide your own middleware or proxy during verification.

## 5. Use a really really long lived token

This is not ideal, but may be the best option for you.

For more information, see the [FAQ](../faq/#how-do-i-test-oauth-or-other-security-headers)

