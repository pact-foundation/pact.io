# UI documentation

## Index

By default, only the latest version of every pact is shown.

## v2.11.0 and later

To view the latest pact for every tag as well, append `?tags=true` to the index URL.

To select which tags to view, append `?tags[]=TAG1&tags[]=TAG2` to the index URL. For example, to see the master, staging and production pacts, append `?tags[]=master&tags[]=staging&tags[]=production`. Note that it must be `tags[]` rather than `tags`, to indicate that multiple values should be treated as an array.

This solution was the simplest thing that could be done to get the "view configurable tags on the index page" feature out. The longer term solution is to have new tags automatically appear in the index, but allow them to be removed from the view once they are no longer needed by clicking some UI element. If you are interested in picking up this piece of work, please chat to me at [slack.pact.io](http://slack.pact.io).

