# Configuration

## Menu

#### Consumer and Provider configuration options

* [diffformatter](configuration.md#diff_formatter)
* [logdir](configuration.md#log_dir)
* [logger](configuration.md#logger)
* [logger.level](configuration.md#loggerlevel)

#### Consumer only configuration options

* [pactdir](configuration.md#pact_dir)
* [docdir](configuration.md#doc_dir)
* [docgenerator](configuration.md#doc_generator)
* [pactfilewritemode](configuration.md#pactfile_write_mode)

#### Provider only configuration options

* [include](configuration.md#include)

## Consumer and Provider

### log\_dir

```ruby
Pact.configure do | config |
  config.log_dir = './log'
end
```

Default value: `./log`

### logger

```ruby
Pact.configure do | config |
  config.logger = Logger.new
end
```

Default value: file logger to the configured log\_dir.

### logger.level

```ruby
Pact.configure do | config |
  config.logger.level = Logger::INFO
end
```

Default value: `Logger::DEBUG`

### diff\_formatter

```ruby
Pact.configure do | config |
  config.diff_formatter = :list
end
```

Default value: [:list](configuration.md#list)

Options: [:unix](configuration.md#unix), [:list](configuration.md#list), [:embedded](configuration.md#embedded), [Custom Diff Formatter](configuration.md#custom-diff-formatter)

#### :unix

![](https://github.com/pact-foundation/pact-ruby/raw/master/documentation/diff_formatter_unix.png)

#### :list

![](https://github.com/pact-foundation/pact-ruby/raw/master/documentation/diff_formatter_list.png)

#### :embedded

![](https://github.com/pact-foundation/pact-ruby/raw/master/documentation/diff_formatter_embedded.png)

#### Custom Diff Formatter

Any object can be used that responds to `call`, accepting the argument `diff`.

```ruby
class MyCustomDiffFormatter

  def self.call diff
    ### Do stuff here
  end

end

Pact.configure do | config |
  config.diff_formatter = MyCustomDiffFormatter
end
```

## Consumer

### pact\_dir

```ruby
Pact.configure do | config |
  config.pact_dir = `./spec/pacts`
end
```

Default value: `./spec/pacts`

### doc\_generator

```ruby
Pact.configure do | config |
  config.doc_generator = :markdown
end
```

Default value: none

Options: [:markdown](configuration.md#markdown), [Custom Doc Generator](configuration.md#custom-doc-generator)

#### :markdown

Generates Markdown documentation based on the contents of the pact files created in this consumer. Files are created in `${Pact.configuration.doc_dir}/markdown`.

#### Custom Doc Generator

Any object can be used that responds to `call`, accepting the arguments `pact_dir` and `doc_dir`.

```ruby
Pact.configure do | config |
  config.doc_generator = lambda{ | pact_dir, doc_dir | generate_some_docs(pact_dir, doc_dir) }
end
```

#### doc\_dir

```ruby
Pact.configure do | config |
  config.doc_dir = './doc'
end
```

Default value: `./doc`

### pactfile\_write\_mode

Default value: `:overwrite` Options: `:overwrite`, `:update`, `:smart`, `:none`

By default, the pact file will be overwritten \(started from scratch\) every time any rspec runs any spec using pacts. This means that if there are interactions that haven't been executed in the most recent rspec run, they are effectively removed from the pact file. If you have long running pact specs \(e.g. they are generated using the browser with Capybara\) and you are developing both consumer and provider in parallel, or trying to fix a broken interaction, it can be tedious to run all the specs at once. In this scenario, you can set the pactfile\_write\_mode to :update. This will keep all existing interactions, and update only the changed ones, identified by description and provider state. The down side of this is that if either of those fields change, the old interactions will not be removed from the pact file. As a middle path, you can set pactfile\_write\_mode to :smart. This will use :overwrite mode when running rake \(as determined by a call to system using 'ps'\) and :update when running an individual spec. :none will not generate any pact files \(with pact-mock\_service &gt;= 0.8.1\).

## Provider

Pact uses RSpec and Rack::Test to create dynamic specs based on the pact files. RSpec configuration can be used to modify test behaviour if there is not an appropriate Pact feature. If you wish to use the same spec\_helper.rb file as your unit tests, require it in the pact\_helper.rb, but remember that the RSpec configurations for your unit tests may or may not be what you want for your pact verification tests.

### include

```ruby
Pact.configure do | config |
  config.include MyTestHelperMethods
end
```

To make modules available in the provider state set\_up and tear\_down blocks, include them in the configuration as shown below. One common use of this to include factory methods for setting up data so that the provider states file doesn't get too bloated.

