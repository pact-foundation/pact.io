# Matching (Consumer Tests)

In addition to verbatim value matching, you have 3 useful matching functions
in the `dsl` package that can increase expressiveness and reduce brittle test
cases.

* `dsl.Term(example, matcher)` - tells Pact that the value should match using
a given regular expression, using `example` in mock responses. `example` must be
a string.
* `dsl.Like(content)` - tells Pact that the value itself is not important, as long
as the element _type_ (valid JSON number, string, object etc.) itself matches.
* `dsl.EachLike(content, min)` - tells Pact that the value should be an array type,
consisting of elements like those passed in. `min` must be >= 1. `content` may
be a valid JSON value: e.g. strings, numbers and objects.

*Example:*

Here is a complex example that shows how all 3 terms can be used together:

```go
jumper := Like(`"jumper"`)
shirt := Like(`"shirt"`)
tag := EachLike(fmt.Sprintf(`[%s, %s]`, jumper, shirt), 2)
size := Like(10)
colour := Term("red", "red|green|blue")

match := formatJSON(
	EachLike(
		EachLike(
			fmt.Sprintf(
				`{
					"size": %s,
					"colour": %s,
					"tag": %s
				}`, size, colour, tag),
			1),
		1))
```

This example will result in a response body from the mock server that looks like:
```json
[
  [
    {
      "size": 10,
      "colour": "red",
      "tag": [
        [
          "jumper",
          "shirt"
        ],
        [
          "jumper",
          "shirt"
        ]
      ]
    }
  ]
]
```

See the [matcher tests](https://github.com/pact-foundation/pact-go/blob/master/dsl/matcher_test.go)
for more matching examples.

*NOTE*: One caveat to note, is that you will need to use valid Ruby
[regular expressions](http://ruby-doc.org/core-2.1.5/Regexp.html) and double
escape backslashes.

Read more about [flexible matching](https://github.com/realestate-com-au/pact/wiki/Regular-expressions-and-type-matching-with-Pact).
