# Deleting resources

All resources can be deleted by sending an HTTP Delete request to the resource URL. The easiest way is to do that using the embedded API Browser, which you can get to by clicking the "API Browser" link on the Pact Broker index page.

Once you have opened the API Browser, navigate to the resource you wish to delete. In the `Links` section, click on the `NON-GET` button for the `self` relation. Set the `Method` to `DELETE` and then press `Make Request`.

Note that if you delete a pacticipant resource, all related pacticipant versions, pacts, verifications and webhooks get deleted along with it. If you delete a pacticipant version resource, the associated pacts and verifications get deleted with it. Otherwise, you can just delete an individual pact resource.

## Deleting multiple pacts

You can delete all pacts for a given consumer/provider by sending a `DELETE` request to `/pacts/provider/{provider}/consumer/{consumer}/versions`. To delete only those with a certain tag, the path is `/pacts/provider/{provider}/consumer/{consumer}/tag/{tag}`.

