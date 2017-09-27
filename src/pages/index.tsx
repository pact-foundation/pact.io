import * as React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/post-listing/post-listing";
import SEO from "../components/seo/seo";
import config = require("../../data/site-config");

interface Props {
	data?: any;
}

class Index extends React.Component<Props> {
	public render() {
		const postEdges = this.props.data.allMarkdownRemark.edges;
		return (
			<div className="index-container">
				<Helmet title={config.siteTitle}/>
				<SEO postEdges={postEdges}/>
				<PostListing postEdges={postEdges}/>
			</div>
		);
	}
}

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
