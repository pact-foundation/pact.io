module.exports = {
	siteMetadata: {
		title: `Deploy Confidently. | Pact`
	},
	mapping: {
		'MarkdownRemark.frontmatter.author': `AuthorJson`
	},
	plugins: [
		// Expose `/data` to graphQL layer
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `data`,
				path: `${__dirname}/data`
			}
		},

		// Parse all markdown files (each plugin add/parse some data into graphQL layer)
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 690,
							backgroundColor: `#f7f0eb`
						}
					},
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-autolink-headers`
				]
			}
		},

		// Parse all images files
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,

		// Parse JSON files
		`gatsby-transformer-json`,

		// Add typescript stack into webpack
		`gatsby-plugin-typescript`,
		`gatsby-plugin-sass`,

		// This plugin takes your configuration and generates a
		// web manifest file so your website can be added to your
		// homescreen on Android.
		/* eslint-disable camelcase */
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Gatsby website`,
				short_name: `Gatsby website`,
				start_url: `/`,
				background_color: `#f7f7f7`,
				theme_color: `#191919`,
				display: `minimal-ui`
			}
		},
		/* eslint-enable camelcase */

		// This plugin generates a service worker and AppShell
		// html file so the site works offline and is otherwise
		// resistant to bad networks. Works with almost any
		// site!
		`gatsby-plugin-offline`,

		{
			resolve: `gatsby-plugin-favicon`,
			options: {
				logo: "./src/favicon.png",
				injectHTML: true,
				icons: {
					android: true,
					appleIcon: true,
					appleStartup: true,
					coast: false,
					favicons: true,
					firefox: true,
					twitter: false,
					yandex: false,
					windows: false
				}
			}
		},

		// Google Analytics injection for tracking
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: "UA-117778936-1",
				// Puts tracking script in the head instead of the body
				head: false,
				// Setting this parameter is optional
				// anonymize: true,
				// Setting this parameter is also optional
				// respectDNT: true,
				// Avoids sending pageview hits from custom paths
				// exclude: ["/preview/**", "/do-not-track/me/too/"],
			},
		}
	]
};
