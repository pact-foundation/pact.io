# Create a network graph

Due to the naivety of the layout logic for the network graphs, trying to graph all the applications in one diagram using the current layout would not scale very well. We recommend pulling the data out of the broker and using something like graphviz to visualise the relationships. Here is an example of pulling out the data from the DiUS hosted test Broker.

```text
echo "digraph { ranksep=3; ratio=auto; overlap=false; node [  shape = plaintext, fontname = "Helvetica" ];" > latest.dot
curl -v -u 'dXfltyFMgNOFZAxr8io9wJ37iUpY42M:O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1' https://test.pact.dius.com.au/pacts/latest | jq '.pacts[]._embedded | select(.consumer.name | contains("AWSSummiteer")) | .consumer.name + "->" + .provider.name' | tr -d '"' |  sed 's/-/_/g' | sed 's/_>/->/g' >> latest.dot; echo "}" >> latest.dot
dot latest.dot -otest.png -Tpng
open test.png
```

