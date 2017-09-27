import * as React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/post-listing/post-listing";
import config = require("../../data/site-config");

interface Props {
	pathContext?: any;
	data?: any;
}

export default class CategoryTemplate extends React.Component<Props> {
	public render() {
		const category = this.props.pathContext.category;
		const postEdges = this.props.data.allMarkdownRemark.edges;
		return (
			<div className="category-container">
				<Helmet
					title={`Posts in category "${category}" | ${config.siteTitle}`}
				/>
				<PostListing postEdges={postEdges}/>
			</div>
		);
	}
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
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
