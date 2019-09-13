# Gotchas

## VCR

If you are using VCR in your project, it will catch the HTTP requests Pact makes to its mock service and throw an exception about your Pact tests not using a cassette.

To avoid this, you can simply configure VCR to ignore requests directed at Pact's mock service like so:

```ruby
VCR.configure do |c|
  config.ignore_request do |request|
    URI(request.uri).port == 1234 # Change to your Pact mock service's port
  end
end
```

