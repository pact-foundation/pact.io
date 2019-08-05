# Add new interactions

In summary: keep the CI running against a stable version of the pact, while simultaneously providing a new version for the provider team so they can update their code and provider states. Once both the stable and the new versions of the pact are green, the new version can be published as the stable version.

_Remember:_ just because you're doing consumer driven contracts doesn't meant that the consumer team gets to tell the provider team what to do. Please remember that the best results will be achieved by a collaborative approach between the two teams. Communicate with your nice human words folks.

See [Using Tags](./) for information on how to set up your tagging approach.

