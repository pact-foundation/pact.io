# Flexible Matching

Make sure you read about [Matching](../matching.md) first.

#### Match by regular expression
Remember that the mock service is written in Ruby, so the regular expression must be in a Ruby format, not a JavaScript format. Make sure to start the mock service with the argument `--pact-specification-version 2.0.0`.

```javascript
provider
  .given('there is a product')
  .uponReceiving("request for products")
  .withRequest({
    method: "GET",
    path: "/products",
    query: {
      category: Pact.Match.term({matcher: "\\w+", generate: 'pizza'}),
    }
  })
  .willRespondWith(
    200,
    {},
    {
      "collection": [
        { guid: Pact.Match.term({matcher: "\\d{16}", generate: "1111222233334444"}) }
      ]
    }
  );
```

#### Match based on type
```javascript

provider
  .given('there is a product')
  .uponReceiving("request for products")
  .withRequest({
    method: "get",
    path: "/products",
    query: {
      category: Pact.Match.somethingLike("pizza")
    }
  })
  .willRespondWith(
    200,
    {},
    {
      "collection": [
        { guid: Pact.Match.somethingLike(1111222233334444) }
      ]
    }
  );
```

#### Match based on arrays
Matching provides the ability to specify flexible length arrays. For example:

```javascript
Pact.Match.eachLike(obj, { min: 3 })
```

Where `obj` can be any Javascript `object`, value or `Pact.Match`. It takes optional argument (`{ min: 3 }`) where min is greater than 0 and defaults to 1 if not provided. 

Below is an example that uses all of the Pact Matchers.

```javascript
var somethingLike = Pact.Match.somethingLike;
var term          = Pact.Match.term;
var eachLike      = Pact.Match.eachLike;

provider
  .given('there is a product')
  .uponReceiving("request for products")
  .withRequest({
    method: "get",
    path: "/products",
    query: { category: "clothing" }
  })
  .willRespondWith({
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: {
        "items": eachLike({
            size: somethingLike(10),
            colour: term("red|green|blue", {generates: "blue"}),
            tag: eachLike(somethingLike("jumper"))
        }, {min: 2})
    }
  });
```
