# Consumer

This codebase provides a Javascript DSL for creating pacts. The following guides will help you get started in your favourite testing framework:

* [Mocha / Node](documentation/javascript/mocha__node.md)
* [Jasmine / Karma](documentation/javascript/jasmine__karma.md)
* [Flexible Matching](documentation/javascript/flexible_matching.md)

## Pact Mock Service
In order to write Pact tests on the `Consumer`, you first need to install the Pact Mock Service.

### Ruby Installation
If you are on Windows, please refer to the [Installing pact-mock-service on Windows](https://github.com/bethesque/pact-mock_service/wiki/Installing-the-pact-mock_service-gem-on-Windows).

To install Pact Mock Service you have to have Ruby installed. Create a `Gemfile` on your project and add the below:

```ruby
source 'https://rubygems.org'
gem 'pact-mock_service', '~> 0.7.0'
```

Then, in your terminal, run `gem install bundler && bundle install`. You should get an output similar to this

```bash
Fetching gem metadata from https://rubygems.org/.........
Fetching version metadata from https://rubygems.org/..
...
Installing pact-support 0.5.3
Installing pact-mock_service 0.7.0
Bundle complete! 1 Gemfile dependency, 19 gems now installed.
```

_**Note:** Windows users must run the install command after following Wiki instructions_

### Docker 

For more detail, checkout the [Docker repository](https://github.com/madkom/docker/tree/master/pact-mock-service).

**Running**:

```bash
docker run -p 1234:1234 -v /tmp/log:/var/log/pacto -v /tmp/contracts:/opt/contracts madkom/pact-mock-service
```
    
It will create running pact server under `1234` port with mounted volumes `/tmp/log` (logs)  and `/tmp/contracts` (pact files)