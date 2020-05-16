## 8. Prevent missing verifications

Step 7 means that you can now know that the production provider has successfully verified the pact from the consumer version you’re about to deploy. However, in some cases, the production version of the provider may never have run a CI against your candidate pact, because your candidate consumer pact may not have existed when the CI for that provider version was run.

To reach Pact Nirvana, the final step is to have a CI build that checks out the code for the _production_ version of your provider, and have it verify the same pacts that the head version does. If you have followed the recommended strategy of tagging provider versions in the broker on deployment to production, you can use the Pact Broker CLI to determine which version of the provider is currently in production:

```text
pact-broker describe-version --pacticipant PACTICIPANT --latest prod
```

Make sure that the provider application version used when publishing the verification can be reverse engineered to a reference to a point in your source control \(eg a Git commit hash\).

Useful link:

* [Best practices for pacticipant version numbers](getting_started/versioning_in_the_pact_broker.md)
