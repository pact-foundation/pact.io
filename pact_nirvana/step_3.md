# 3. Write and verify a real Pact

The hardest thing about setting up Pact in any company is getting buy in from all the teams. Everyone needs to be on the same page to make Pact work.

A good way to determine if Pact works for you is to write and verify a pact for a real consumer and provider.

1. Write a Pact test in your consumer project \(consult [the documentation](https://github.com/pact-foundation/pact.io/tree/563329e1a5ff96f14f9165c05d620b8d2d6bff82/pact_nirvana/implementation_guides/README.md) for your chosen language\) and generate the pact.
2. Ship the pact file to the provider team - it still doesn’t matter how yet, we’ll get on to that in the next step.
3. Verify the pact against the provider \(again, consult the documentation for your chosen language\)
4. Talk about it.
5. Decide whether or not Pact is the right tool for you, taking into account that there are situations for which Pact is [a good solution](https://github.com/pact-foundation/pact.io/tree/563329e1a5ff96f14f9165c05d620b8d2d6bff82/pact_nirvana/faq/README.md#what-is-pact-good-for), and situations for which Pact is [not a good solution](https://github.com/pact-foundation/pact.io/tree/563329e1a5ff96f14f9165c05d620b8d2d6bff82/pact_nirvana/faq/README.md#what-is-pact-not-good-for).

