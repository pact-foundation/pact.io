# Debugging Webhooks

Webhooks are executed when either the pact content changes, or a verification is published.

## Testing webhook execution

### Pactflow

Click on the Settings icon, and then select the Webhooks tab.

Select the webhook you want to test, and click "EDIT". Scroll to the bottom of the screen, and the click the "TEST" button.

### Pact Broker

You can find the full list of webhooks at `/webhooks` \(or open the API Browser, and click on the `GET` button for the `pb:webhooks` relation\).

Navigate to the webhook you want to test by clicking on the `GET` button for the desired webhook under the `pb:webhooks` relation in the Links section.

Click on the `NON-GET` button for the `pb:execute` relation, and then click `Make Request`. The execution logs will be returned on the next page.

## Viewing logs for past webhook executions

The second column from the right on the index page shows the webhook status for each pact. The colour indicates the status, and the text indicates the last run time.

If you click on the link in that column, you'll get the webhooks status resource for that Pact. If there has been an error, you'll find a `pb:error-logs` relation for the error logs in the Links section. Click on the "GET" button to see them.

The properties section will tell you how many of the webhooks succeeded for the last trigger event, and how many failed.

The Embedded Resources section will give you links to the execution logs.

If you see no evidence of any attempted executions, look in the application logs.

If you see no logs related to a webhook, it means that the json content was the same as the previous version, so the webhook will not be triggered. If you see "No webhook found for consumer ..." then the json had changed, but there are no webhooks found. If you see "Scheduling job for ..." then the content has changed, a webhook has been found, and a background job has been created to execute it.

