<img src="https://github.com/pact-foundation/pact-logo/blob/master/media/logo-black.png" width="200">

# Pact Foundation Website



## Contribute

First, install the dependencies using `npm install`, after that, there's 2 simple commands needed:

 * `npm run build` - runs the generator that creates the static files for the website; this is normally only used for the CI server
 * `npm start` - runs the local server and watches files while you change them to get consistent feedback while developing.

When wanting to contribute, please create a branch (or fork if you don't have contributor access), commit/push your changes then do a Pull Requests carefully explaining what's going to be added to 
the website.  Thanks :)

## Releasing

To release, you'll need to create a new tag.  First, increment the version number of package.json for the project, commit it, then use `git tag -a <new version> -m "your message"`.  When ready, push the tags using `git push --follow-tags` so that your local tag is sent to Github and then triggers the deployment process on [Travis](https://travis-ci.com/PageUpPeopleOrg/scribble/).
When incrementing the version number, please follow this convention: [NPM Semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning)
