# Feature suppport

There are multiple implementations of Pact, and while we try to keep feature parity between them, some implementations are ahead of others in terms of feature support.

| Feature                                      | Pact-JVM | Pact JS | Pact Ruby | Pact NET | Pact Python | Pactman | Scala Pact | Pact PHP |
|----------------------------------------------|----------|---------|-----------|----------|-------------|---------|------------|----------|
| Regular expressions                          | Y        | Y       | Y         | Y        | Y           | Y       | Y          | Y        |
| Type based matching ("like")                 | Y        | Y       | Y         | Y        | Y           | Y       | Y          | Y        |
| Flexible array length ("each like")          | Y        | Y       | Y         | Y        | Y           | Y       | Y          | Y        |
| Multiple provider states (pact creation)     | Y        |         |           |          |             | ?       | ?          |          |
| Multiple provider states (pact verification) | Y        | Y       | Y         | Y        | Y           | ?       | ?          | Y        |
| HTTP pacts                                   | Y        | Y       | Y         | Y        | Y           | Y       | Y          | Y        |
| Asychronous message pacts                    | Y        | Y       |           |          |             | ?       |            |          |
| Dynamically fetch pacts for provider from Pact Broker for verification | Y        | Y       | Y         | Y        | ?           | Y       | ?          | ?        |
