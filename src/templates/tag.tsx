import * as React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/post-listing/post-listing";
import config from "../../data/site-config";

interface Props {
	pathContext?: any;
	data?: any;
}

export default class TagTemplate extends React.Component<Props> {
	public render() {
		const tag = this.props.pathContext.tag;
		const postEdges = this.props.data.allMarkdownRemark.edges;
		return (
			<div className="tag-container">
				<Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`}/>
				<PostListing postEdges={postEdges}/>
			</div>
		);
	}
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
