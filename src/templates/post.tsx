import * as React from "react";
import Helmet from "react-helmet";
import UserInfo from "../components/user-info/user-info";
import Disqus from "../components/disqus/disqus";
import PostTags from "../components/post-tags/post-tags";
import SocialLinks from "../components/social-links/social-links";
import SEO from "../components/seo/seo";
import config = require("../../data/site-config");

import "./b16-tomorrow-dark.less";
import "./post.less";

interface Props {
	pathContext?: {
		slug?: string;
	};
	data?: any;
}

interface Post {
	id?: string;
	category_id?: string;
	title?: string;
	tags?: string[];
}

export default class PostTemplate extends React.Component<Props> {
	public render() {
		const {slug} = this.props.pathContext;
		const postNode = this.props.data.markdownRemark;
		const post: Post = postNode.frontmatter;
		if (!post.id) {
			post.id = slug;
		}
		if (!post.id) {
			post.category_id = config.postDefaultCategoryID;
		}

		return (
			<div>
				<Helmet>
					<title>{`${post.title} | ${config.siteTitle}`}</title>
				</Helmet>
				<SEO postPath={slug} postNode={postNode} postSEO/>
				<div>
					<h1>
						{post.title}
					</h1>
					<div dangerouslySetInnerHTML={{__html: postNode.html}}/>
					<div className="post-meta">
						<PostTags tags={post.tags}/>
						<SocialLinks postPath={slug} postNode={postNode}/>
					</div>
					<UserInfo config={config}/>
					<Disqus postNode={postNode}/>
				</div>
			</div>
		);
	}
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      fields {
        slug
      }
    }
  }
`;
