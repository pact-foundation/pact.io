# Effective Pact Setup Guide

Or _"The steps for reaching Pact Nirvana"_

This is a technical guide for developers and testers who want to use Pact to implement consumer driven contract testing.

By the end of the guide, you will understand how to create a release pipeline that allows you to independently deploy any application with the confidence that it will work correctly with the other applications in its environment - without having to run a suite of end to end tests.

Although many guides assume a greenfields project with no existing code, this document is intended to also be useful for retrofitting Pact into an existing project.

Before you read this document, you should:

* have a basic understanding of the concepts of both [consumer driven contracts](https://martinfowler.com/articles/consumerDrivenContracts.html) and Pact,
* have read the [Pact Broker Overview](pact_broker/overview.md)
* have read the section on [versioning in the Pact Broker](getting_started/versioning_in_the_pact_broker.md)

### How to use this document

Each integration is different. Each organisation has different history and culture, and each team may have different processes for development, testing, and deployment. Each of these differences affect the best choices for Pact workflow.

However, there are many similarities in the steps necessary on the journey to a full-featured and effective Pact setup \(_"Pact Nirvana"_\). This document describes those steps.

Feel free to pick and choose the steps that apply best to your team. You may implement only the first few steps described below, and just use Pact as a precursor to your standard integration tests; or you may throw away your integration tests altogether and reach "Pact Nirvana".

As Pact has been implemented in many different languages, this document will outline the theory for each step. You will need to consult the documentation of your chosen language to learn the relevant syntax for each task. See the [implementation guides](implementation_guides/) section for more information.

### What are the steps for reaching Pact Nirvana?

1. Talk
2. Spike \(Optional\)
3. Write and verify a real Pact
4. Automate the contract and verification results exchange
5. Allow contracts to change without breaking your builds
6. Use tags to ensure your provider is compatible with your production consumer
7. Use The Pact “Matrix” as a gateway to deployments
8. Prevent missing verifications
