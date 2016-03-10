# Javascript

Pact support for JavaScript and Node JS is currently in active development.

## Pact Mock Service
In order to write Pact tests, first you gotta install the Pact Mock Service. If you are on Windows, please refer to the [Installing pact-mock-service on Windows](https://github.com/bethesque/pact-mock_service/wiki/Installing-the-pact-mock_service-gem-on-Windows).

To install Pact Mock Service you gotta have Ruby installed. Create a `Gemfile` on your project and add the below:

```ruby
source 'https://rubygems.org'
gem 'pact-mock_service', '~> 0.7.0'
```

Then, on your terminal, run `gem install bundler && bundle install`. You should get an output similar to this

```bash
Fetching gem metadata from https://rubygems.org/.........
Fetching version metadata from https://rubygems.org/..
...
Installing pact-support 0.5.3
Installing pact-mock_service 0.7.0
Bundle complete! 1 Gemfile dependency, 19 gems now installed.
```

_**Note:** Windows users must run the install command after following Wiki instructions_

## Consumer DSL

Head over to the [Pact Consumer DSL ](https://github.com/DiUS/pact-consumer-js-dsl)to get started with client application development. It currently supports Pact Specification 2.0 (it relies on the Ruby project to create Pacts).

## Provider

TBA