# Configuration

## Configuration

The Pact Broker configuration settings are applied in the `config.ru` file. See the Pact Broker [example](https://github.com/pact-foundation/pact_broker/tree/master/example) application if you are unfamiliar with Ruby applications.

## Default configuration values

Change them to your desired values in the `config.ru` file.

```ruby
app = PactBroker::App.new do | config |
      config.log_dir = File.expand_path("./log")
      config.auto_migrate_db = true
      config.use_hal_browser = true
      config.validate_database_connection_config = true
      config.enable_diagnostic_endpoints = true
      config.enable_public_badge_access = false # For security
      config.shields_io_base_url = "https://img.shields.io".freeze
      config.use_case_sensitive_resource_names = true
      config.html_pact_renderer = default_html_pact_render
      config.version_parser = PactBroker::Versions::ParseSemanticVersion
      config.sha_generator = PactBroker::Pacts::GenerateSha
      config.base_equality_only_on_content_that_affects_verification_results = false
      config.order_versions_by_date = false
      config.semver_formats = ["%M.%m.%p%s%d", "%M.%m", "%M"]
      config.webhook_retry_schedule = [10, 60, 120, 300, 600, 1200] #10 sec, 1 min, 2 min, 5 min, 10 min, 20 min => 38 minutes
      config.check_for_potential_duplicate_pacticipant_names = true
      config.disable_ssl_verification = false
      config.webhook_http_method_whitelist = ['POST']
      config.webhook_scheme_whitelist = ['https']
      config.webhook_host_whitelist = []
end
```

## Webhook SSL certificates

If your broker needs to execute a webhook against a server that has a self signed certificate, you will need to add the certificate to the broker's certificate store. Currently, the way to do this is to use the script [script/insert-self-signed-certificate-from-url.rb](https://github.com/pact-foundation/pact_broker/blob/master/script/insert-self-signed-certificate-from-url.rb). The easiest way to run this is to copy it to the machine where the broker is deployed, and modify the database credentials to match those of your broker.

## Webhook HTTP proxies

If your webhooks need to execute via a HTTP proxy, set the `http_proxy` environment variable to the address of your proxy.

## Webhook whitelists

```ruby
  # You should set these to appropriate values for your organization
  config.webhook_host_whitelist = [/.*\.foo\.com$/, "github.com", "foo.slack.com"]

  # For security reasons, it is not recommended to alter this list (see below)
  config.webhook_http_method_whitelist = ['POST']

  # For security reasons, it is not recommended to alter this list (see below)
  config.webhook_scheme_whitelist = ['https']
```

To ensure that webhooks cannot be used maliciously to expose either data about your contracts or your internal network, the following validation rules are applied to webhooks via the Pact Broker configuration settings.

* **Scheme**: Must be included in the `webhook_scheme_whitelist`, which by default only includes `https`. You can change this to include `http` if absolutely necessary, however, keep in mind that the body of any http traffic is visible to the network. You can load a self signed certificate into the Pact Broker to be used for https connections using [script/insert-self-signed-certificate-from-url.rb](https://github.com/pact-foundation/pact_broker/blob/master/script/insert-self-signed-certificate-from-url.rb) in the Pact Broker Github repository.
* **HTTP method**: Must be included in the `webhook_http_method_whitelist`, which by default only includes `POST`. It is highly recommended that only `POST` requests are allowed to ensure that webhooks cannot be used to retrieve sensitive information from hosts within the same network.
* **Host**: If the `webhook_host_whitelist` contains any entries, the host must match one or more of the entries. By default, it is empty. For security purposes, if the host whitelist is empty, the response details will not be logged to the UI \(though they can be seen in the application logs at debug level\).

  The host whitelist may contain hostnames \(eg `"github.com"`\), IPs \(eg `"192.0.345.4"`\), network ranges \(eg `"10.0.0.0/8"`\) or regular expressions \(eg `/.*\.foo\.com$/`\). Note that IPs are not resolved, so if you specify an IP range, you need to use the IP in the webhook URL. If you wish to allow webhooks to any host \(not recommended!\), you can set `webhook_host_whitelist` to `[/.*/]`. Beware of any sensitive endpoints that may be exposed within the same network.

  The recommended set of values to start with are:

  * your CI server's hostname \(for triggering builds\)
  * your company chat \(eg. Slack, for publishing notifications\)
  * your code repository \(eg. Github, for sending commit statuses\)

  Alternatively, you could use a regular expression to limit requests to your company's domain. eg `/.*\.foo\.com$/` \(don't forget the end of string anchor\). You can test Ruby regular expressions at [rubular.com](http://rubular.com).

## Badges

Behind the scenes, the Pact Broker uses [img.shields.io](https://img.shields.io) to dynamically create the text on the badges. If the shields.io server cannot be made available to your Pact Broker installation, set `config.shields_io_base_url` to nil, and you will get badges with the hardcoded title "pact" instead of "foo/bar pact".

If you cannot allow access to the public shields server because of Network Security, then you could run your own local [docker](https://github.com/beevelop/docker-shields) one.

NOTE: If you have added your own authentication on top of the broker, you'll need to add a rule to allow public access to the badge URLs.

## Version parser

Configure `version_parser` with a lambda or an object/class that responds to call. It should accept a string, and return a sortable object if the version is valid, and nil if the version is not valid.

```ruby
class MyCustomVersionParser
  def self.call string_version
    ....
  end
end

PactBroker::App.new do | config |
  config.version_parser = MyCustomVersionParser
end
```

If you want to customise the error messages to indicate what sort of version format is expected, create a yml file with the following:

```text
en:
  pact_broker:
    errors:
      validation:
        consumer_version_number_header_invalid: "Custom message"
        consumer_version_number_invalid: "Custom message"
```

```ruby
# In config.ru, after configuring the Pact Broker app
I18n.config.load_path << "./path/to/your/custom/messages/file.yml"
```

## Ordering versions by date

By default, pacticipant versions \(and hence their related pacts\) are sorted by date published. If you would like to use semantic versioning, you will need to set `config.order_versions_by_date = false`. After you have restarted, you will need to publish a new pact to trigger a resort, as the ordering is done on insertion.

## Checking for potential duplicate pacticipant names

When a pact is published normally \(via a PUT to `/pacts/provider/PROVIDER/consumer/CONSUMER/version/CONSUMER_APP_VERSION`\) the `consumer`, `provider` and `consumer version` resources are automatically created.

To prevent a pacticipant \(consumer or provider\) being created multiple times with slightly different name variants \(eg. FooBar/foo-bar/foo bar/Foo Bar Service\), if a new pacticipant name is deemed similar enough to an existing name, a 409 will be returned. The response body will contain instructions indicating that the pacticipant name should be corrected if it was intended to be an existing one, or that the pacticipant should be created manually if it was intended to be a new one.

To turn this feature off, set `check_for_potential_duplicate_pacticipant_names = false`, and make sure everyone is very careful with their naming! The usefulness of the broker depends on the integrity of the data, which in turn depends on the correctness of the pacticipant names.

## Running the broker behind a reverse proxy

If the pact broker is setup behind a reverse proxy then there are a few headers that must be forwarded on for the HAL browser to work properly. The required headers to be sent depend on the proxy configuration. For example if the reverse proxy is configured to forward from [https://broker.example.com](https://broker.example.com) -&gt; [http://internal.broker](http://internal.broker) then X-Forwarded-Host, X-Forwarded-Port and X-Forwarded-Ssl or X-Forwarded-Scheme would need to set in the nginx configuration.

* **X-Forwarded-Scheme**

  Set this to either "http" or "https" depending on the scheme used by the reverse proxy. For example if the URL configured at the proxy is [https://broker.example.com](https://broker.example.com) then this should be "https".

* **X-Forwarded-Host**

  Set this to the host name used by the reverse proxy. For example if the URL configured at the proxy is [https://broker.example.com](https://broker.example.com) then this should be "broker.example.com".

* **X-Forwarded-Port**

  Set this to the port used by the reverse proxy. For example if the URL configured at the proxy is [https://broker.example.com](https://broker.example.com) then this should be "443".

* **X-Forwarded-Ssl**

  Set this to "on" if the scheme of the reverse proxy is https. For example if the URL configured at the proxy is [https://broker.example.com](https://broker.example.com) then this should be "on".

See [this example](https://github.com/DiUS/pact_broker-docker/issues/58#issuecomment-358819665) for how to achieve this with Nginx.

