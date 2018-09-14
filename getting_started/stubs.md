# Local API stubs

Pact contracts are easily turned into locally running API stubs. Pact contracts lack advanced features such as predicates that you might find in tools like [mountebank](http://www.mbtest.org/), however they are useful for many situations - such as e2e tests with tools like Protractor and Karma.

To get started, from your consumer code base you have a number of ways to run your API stubs outlined below.

## Docker

Assuming you have a local directory containing your pact files at `./pacts`:

```text
docker pull pactfoundation/pact-stub-server
docker run -t -p 8080:8080 -v "$(pwd)/pacts/:/app/pacts" pactfoundation/pact-stub-server -p 8080 -d pacts

# Test your stub endpoints
curl -v localhost:8080/some/api
```

That's it!

See the [project page](https://github.com/pact-foundation/pact-stub-server) for all available options.

## CLI Tools

Download the [Ruby CLI Tools](https://github.com/pact-foundation/pact-ruby-standalone/releases) and install into your `PATH`.

```text
Usage:
  pact-stub-service PACT ...

Options:
  -p, [--port=PORT]        # Port on which to run the service
  -h, [--host=HOST]        # Host on which to bind the service
                           # Default: localhost
  -l, [--log=LOG]          # File to which to log output
  -o, [--cors=CORS]        # Support browser security in tests by responding to OPTIONS requests and adding CORS headers to mocked responses
      [--ssl], [--no-ssl]  # Use a self-signed SSL cert to run the service over HTTPS
      [--sslcert=SSLCERT]  # Specify the path to the SSL cert to use when running the service over HTTPS
      [--sslkey=SSLKEY]    # Specify the path to the SSL key to use when running the service over HTTPS

Description:
  Start a stub service with the given pact file(s). Where multiple matching
  interactions are found, the interactions will be sorted by response status,
  and the first one will be returned. This may lead to some non-deterministic
  behaviour. If you are having problems with this, please raise it on the
  pact-dev google group, and we can discuss some potential enhancements. Note
  that only versions 1 and 2 of the pact specification are currently supported.
```

Many of the language implementations will wrap the [Ruby CLI Tools](https://github.com/pact-foundation/pact-ruby-standalone/releases) which contains the `pact-stub-service` command.

The location of this will differ across OS and implementation, but is fairly trivial to find, for example, in `pact-js` one can do the following to start stubs from `npm run` commands.

_package.json_:

```text
"scripts": {
  "stubs": "$(find . -name pact-stub-service | grep -e 'bin/pact-stub-service$' | head -n 1) ./pacts/foo-bar.json --port 8080"
}
```

Running `npm run stubs` will start a stub server on port `8080` for the given pact file\(s\) which you can then use for local development.

See more under "pact-stub-service" on the [project page](https://github.com/pact-foundation/pact-ruby-standalone/releases)

