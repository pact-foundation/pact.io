# Webhooks template library

## Webhook template library

Please feel free add any that you think might be useful to others.

## Github - publish commit status

Report the pact verification status back to the consumer project in Github.

```javascript
{
  "consumer": {
    "name": "<consumer name>"
  },
  "events": [
    {
      "name": "contract_published"
    },
    {
      "name": "provider_verification_published"
    }
  ],
  "request": {
    "method": "POST",
    "url": "https://api.github.com/repos/<organization>/<project>/statuses/${pactbroker.consumerVersionNumber}",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "state": "${pactbroker.githubVerificationStatus}",
      "description": "Pact Verification Tests",
      "context": "${pactbroker.providerName} ${pactbroker.providerVersionTags}",
      "target_url": "${pactbroker.verificationResultUrl}"
    },
    "username": "USERNAME",
    "password": "PASSWORD"
  }
}
```

## Slack - post notification

```text
{
  "request": {
    "method": "POST",
    "url": "https://hooks.slack.com/services/<webhook id>",
    "body": {
      "channel": "#<your-channel-here>", 
      "username": "webhookbot", 
      "text": "New version of pact created for ${pactbroker.consumerName}/${pactbroker.providerName}: ${pactbroker.pactUrl}", 
      "icon_emoji": ":ghost:"
    }
  }
}
```

## Travis - trigger build

```javascript
{
  "events": [{
    "name": "contract_content_changed"
  }],
  "request": {
    "method": "POST",
    "url": "https://api.travis-ci.org/repo/<organization>%2F<project>/requests",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Travis-API-Version": "3",
      "Authorization": "token TOKEN"
    },
    "body": {
      "request": {
        "message": "Triggered by changed pact for ${pactbroker.consumerName} version ${pactbroker.consumerVersionNumber}",
        "branch":"master"
      }
    }
  }
}
```

For more information on triggering Travis builds, see [https://docs.travis-ci.com/user/triggering-builds](https://docs.travis-ci.com/user/triggering-builds)

## Bamboo - trigger build

```javascript
{
  "request": {
    "method": "POST",
    "url": "http://master.ci.my.domain:8085/rest/api/latest/queue/SOME-PROJECT?os_authType=basic",
    "username": "username",
    "password": "password",
    "headers": {
      "Accept": "application/json"
    }
  }
}
```

## Visual Studio Team Services - trigger build

```text
{
  "request": {
    "method": "POST",
    "url": "https://<instance>/DefaultCollection/<project>/_apis/build/builds?api-version=2.0",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "<authorization>"
    },
    "body": {
      "definition": { 
        "id": <build-definition-id>
      },
      "sourceBranch": "refs/heads/master",
      "parameters": "{\"pactUrl\":\"${pactbroker.pactUrl}\"}"
    }
  }
}
```

## CircleCI - trigger workflow build

N.B - currently need to use a personal API token \(ideally for a machine user\)

```text
{
  "events": [
    {
      "name": "contract_content_changed"
    }
  ],
  "request": {
    "method": "POST",
    "url": "https://circleci.com/api/v1.1/project/<VCS>/<ORG>/<REPO>/build?circle-token=****",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "branch": "<BRANCH>"
    }
  }
}
```

## Bitbucket-pipeline trigger build of a branch

```text
{
  "events": [{
    "name": "contract_content_changed"
  }],
  "request": {
    "method": "POST",
    "url": "https://api.bitbucket.org/2.0/repositories/{workspace}/{repo_slug}/pipelines/",
    "headers": {
        "Content-Type": "application/json"
    },
    "username": "username",
    "password": "password",
    "body": {
        "target": {
            "ref_type": "branch",
            "type": "pipeline_ref_target",
            "ref_name": "your_branchn_name"
          }
    }
  }
}
```

Ref:

* [Bitbucket API page](https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D/%7Brepo_slug%7D/pipelines/)
* [Bitbucket App Password](https://confluence.atlassian.com/bitbucket/app-passwords-828781300.html)

