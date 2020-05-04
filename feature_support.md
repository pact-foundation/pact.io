# Feature support

There are multiple implementations of Pact, and while we try to keep feature parity between them, some implementations are ahead of others in terms of feature support.

| Feature | Pact-JVM | Pact JS \# | Pact Ruby \# | Pact NET \# | Pact GO \# | Pact PHP \# | Pact Python \# | Pact Swift \# | Pactman | Scala Pact |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| HTTP pacts | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| Asychronous message pacts | Y | Y |  |  | Y |  |  |  | ? |  |
| Regular expression matching | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| Type based matching \("like"\) | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| Flexible array length \("each like"\) | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| Verify a pact that uses the Pact specification v3 format | Y | Y | Y | Y | Y | Y | Y | Y | Y | ? |
| Pact specification v3 matchers | Y |  |  |  |  |  |  |  | Y | ? |
| Multiple provider states \(pact creation\) | Y |  |  |  | Y |  |  |  | ? | ? |
| Multiple provider states \(pact verification\) | Y | Y | Y | Y | Y | Y | Y | Y | ? | ? |
| Publish pacts to Pact Broker | Y | Y | Y | Y | Y | \* | \* | \* | Y | ? |
| Tag consumer version in Pact Broker when publishing pact | Y | Y | Y | \* | \* | \* | \* | \* | ? | ? |
| Dynamically fetch pacts for provider from Pact Broker for verification | Y | Y | Y | \* | \* | \* | \* | \* | Y | ? |
| Dynamically fetch pacts for provider with specified tags | Y | Y | Y | \* | \* | \* | \* | \* | ? | ? |
| Automatically tag consumer/provider with name of git branch |  | \* | Y | \* | \* | \* | \* | \* |  |  |
| Use 'pacts for verification' Pact Broker API | N | Y | Y | Y | \* | \* | Y | N | N | N |
| Pending pacts | N | Y | Y | Y | \* | \* | Y | N | N | N |
| WIP pacts | N | Y | Y | Y | \* | \* | Y | N | N | N |
| JSON test results output |  | \* | Y | \* | Y | \* | \* | \* |  |  |
| XML test results output | ? | \* | Y | \* | Y | \* | \* | \* |  |  |
| Run a single interaction when verifying a pact | Y | Y | Y | \* | \* | \* | \* | \* | ? | ? |

`#` - these implementations wrap the shared "pact-ruby-standalone" executable

`*` - the feature is available in the underlying shared implementation but may not have been exposed in the native "wrapper" code yet. If you are interested in this feature, but cannot see any documentation for it in your implementation, please raise an issue in the relevant repository.

