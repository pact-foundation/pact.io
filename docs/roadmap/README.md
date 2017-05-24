# Roadmap

Pact is an open source initiative and relies on the personal contributions of many individuals. This means that providing fixed dates for features is all but impossible.

That being said, although each language will move at a different pace, as a community we are moving in the same direction.

## Specification [Status: v3]
The [Pact Specification](https://github.com/pact-foundation/pact-specification/) outlines the features each major version of a release should contain for interoperability between languages. The most current approved version is v3.

## Reference Library [Status: Alpha]
One of the key advantages of Pact is that its DSL is native to each language, resulting in seamless toolchain integration. This is also its biggest challenge - with any change to the specification, each language has to implement the complex matching and verification logic for the Consumer and Provider DSLs.

The Pact Community has come together to solve this problem. Our plan is to create a native, [embedded library](https://github.com/pact-foundation/pact-reference/) in Rust with a well-defined native interface that each language can pull in to perform common functions such as:

* Running a Mock Service
* Performing matching logic
* Verifying Pacts

This project is well underway with proof-of-concepts along the way confirming the approach, and v1 matching almost complete.

## Node/JS [Status: Beta]

<p style="text-align: center;">
<iframe src="https://docs.google.com/presentation/d/1cbf1mJ1cpvi_xAn83NdX9eXfrcTtXLoZD__Qr_hCyjc/embed?start=false&loop=false&delayms=3000" frameborder="0" width="700" height="422" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</p>

## Golang [Status: Beta]
Golang is in the same boat as the JavaScript community in that it uses Ruby 'binaries' under the hood. We are working toward a release where we remove this dependency in favour of the reference library above. Whilst it is currently functional to v2 of the specification, the  API is subject to change.

<p style="text-align: center;">
<iframe src="https://docs.google.com/presentation/d/1MIhu9dwVtWsOp-QfWSxU7uNzyDtDaHhVDxWQKzleEyQ/embed?start=false&loop=false&delayms=3000" frameborder="0" width="700" height="422" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</p>
