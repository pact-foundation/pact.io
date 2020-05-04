# Docker

Often times, you'll want to use Docker to run Pact. For example, a common approach is to run all CI builds within a docker container. This guide offers some assistance in those wanting to persue this path.

## Docker Images

Images from the `"pactfoundation"` [repository](https://hub.docker.com/u/pactfoundation) can be considered official:

* CLI Tools: [https://hub.docker.com/r/pactfoundation/pact-cli](https://hub.docker.com/r/pactfoundation/pact-cli) \(includes the Ruby implementation of the mock service, a language agnostic provider verifier, and the Pact Broker client tools.\)
* Pact Broker: [https://hub.docker.com/r/pactfoundation/pact-broker/](https://hub.docker.com/r/pactfoundation/pact-broker/)
* Stub Server: [https://hub.docker.com/r/pactfoundation/pact-stub-server](https://hub.docker.com/r/pactfoundation/pact-stub-server)

## Alpine Linux

Many teams choose to use Alpine Linux due to its tiny footprint, and smaller security surface area.

For Pact implementations that leverage the underlying [Ruby binary](https://github.com/pact-foundation/pact.io/tree/4534866180df92046ce0e8fcac019ea3b0cd8e2a/docker/feature_support.md) for their implementation, you'll need to ensure the following dependencies are met:

* Bash \(it's not enough to have Ash\)
* Standard CAs for TLS network communication
* glibc

_NOTE_: You do not need to install Ruby \(unless of course your code is a Ruby app\). The distribution takes care of this for you.

### Reference Image

Here is an example NodeJS container that can be used as a reference to create a working container for your example:

```bash
FROM node:8-alpine

RUN apk add --no-cache --virtual build-dependencies build-base

RUN  apk --no-cache add ca-certificates wget bash \
  && wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
  && wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk \
  && apk add glibc-2.29-r0.apk

WORKDIR /app

COPY package*.json /app/
RUN npm install
COPY . /app/

RUN npm test
```

