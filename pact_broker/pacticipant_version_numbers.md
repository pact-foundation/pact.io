# Pacticipant Version Numbers

When publishing a pact or a verification, the resource is associated with a particular version of the pacticipant \(application\), which is identified by a version number. Just to make it very clear - the version number that is specified in the URL of a pact or a verification is the _application version number_, not the pact version. Pact versioning is done for you behind the scenes by the Broker, and is based on the content of the pact. On a side note, do not worry about creating too much data by publishing a pact with every build - this is the expected behaviour, and a new database row for the actual pact content is only created when the pact content changes \(so avoid random data in your pacts\).

If I could go back and change the name of this version number parameter, I would call it the "application codebase ref" or "application commit" rather than "application version number", as to get the most out of the Pact Broker, it should either _be_ the git sha \(or equivalent for your repository\), _be_ a git tag name, or it should _include_ the git sha or tag name as metadata if you are using semantic versioning eg. `1.2.456+405b31ec6`. You can use semantic version numbers, but you need to make sure that you strictly follow the requirements below to ensure you have reliable data for the `can-i-deploy` tool, and the git sha is the easiest and safest way to meet those requirements.

A pacticipant version number:

* is expected to change \(almost\) every time a pact is published
* should uniquely identify or be able to be mapped back to the commit of the code base that published a pact or verification \(so that you can use tags to identify and checkout the the `prod` version of your provider if you wish to [test the "matrix"](http://rea.tech/enter-the-pact-matrix-or-how-to-decouple-the-release-cycles-of-your-microservices/).\)
* should exist only on one branch of your code \(so that you don't end up tagging the same pacticipant version as being on multiple git branches\)
* should be known at release time \(so you can pass it in to `can-i-deploy` to ensure that you are safe to release\)

Good examples:

* `cefbfb4d4e1a53b8044cf399fee21033e603e5fc`
* `a86579910`
* `1.2.456+405b31ec6`

Acceptable examples:

* `2.0.<buildnumber>` \(see note below\)

Bad examples:

* `2.0.0` where all of the parts are incremented manually \(because pacts from different branches and commits of your application will overwrite each other\)
* `1` \(see above\)
* A version is JUST the build number from your CI system \(because when you move CI, your numbers will start over again, see above\)

If you _do_ use a build number in your version number \(eg. `major.minor.<buildnumber>`\) then you can ensure your version number corresponds to a known commit by creating a git tag with the version number for every build. This is good practice anyway, and it means you have a way to check out that particular version of the provider if you want to [test the "matrix"](http://rea.tech/enter-the-pact-matrix-or-how-to-decouple-the-release-cycles-of-your-microservices/).

One of the advantages of using the git sha is that you can report the pact verification status back to your repository as a [commit status](advanced_topics/webhooks/template_lib.md#github---publish-commit-status).

## Sorting

_Note that there is an outstanding_ [_bug_](https://github.com/pact-foundation/pact_broker/issues/175) _in relation to version number parsing, so please configure your broker to_ [_order versions by date_](configuration.md#ordering-versions-by-date)_._

By default, the broker expects semantic versions \(which are now not recommended unless they include the repository reference as metadata\). When sorting by date, the broker sorts by the creation date of the pacticipant version.

Note that pacts are sorted by the order of their pacticipant version, not by the creation date of the pact itself.

The only time that there is a difference in behaviour between semantic ordering and date ordering is if you published a semantic version out of order. For example, if you checked out an older version of your codebase \(eg. for [testing the matrix](http://rea.tech/enter-the-pact-matrix-or-how-to-decouple-the-release-cycles-of-your-microservices/)\) and published a pact or verification from that older codebase and it somehow created a version number that didn't already exist in the broker \(perhaps because you put a build number in the version number\), its `created_at` date would be later than any of the other versions, and it would then be considered the "latest".

