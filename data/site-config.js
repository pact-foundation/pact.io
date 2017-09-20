module.exports = {
  blogPostDir: "blog", // The name of directory that contains your posts.
  siteTitle: "Pact by The Pact Foundation", // Site title.
  siteTitleAlt: "Deploy Confidently with Pact", // Alternative site title for SEO.
  // siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://pact.io", // Domain of your website without pathPrefix.
  // pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "Pact is a cross-language tool that provides Consumer Driven Contract testing.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  // siteFBAppID: "1825356251115265", // FB Application ID for using app insights
  // googleAnalyticsID: "UA-47311644-5", // GA tracking ID.
  // disqusShortname: "https-vagr9k-github-io-gatsby-advanced-starter", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  // userName: "Advanced User", // Username to display in the author segment.
  // userTwitter: "", // Optionally renders "Follow Me" in the UserInfo segment.
  // userLocation: "North Pole, Earth", // User location to display in the author segment.
  // userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  // userDescription: "", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/pact-foundation",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/pact_up",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:pact-foundation@googlegroups.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2017 Pact Foundation", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};
