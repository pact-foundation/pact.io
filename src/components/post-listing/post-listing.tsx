import * as React from "react";
import Link from "gatsby-link";

export interface PostEdge {
	node?: any;
}

export interface PostList {
	path?: string;
	tags?: string[];
	cover?: string;
	title?: string;
	date?: Date;
	excerpt?: string;
	timeToRead?: string;
}

interface Props {
	postEdges?: PostEdge[];
}

class PostListing extends React.Component<Props> {
	public getPostList():PostList[]  {
		const postList:PostList[] = [];
		this.props.postEdges.forEach((postEdge) => {
			postList.push({
				path: postEdge.node.fields.slug,
				tags: postEdge.node.frontmatter.tags,
				cover: postEdge.node.frontmatter.cover,
				title: postEdge.node.frontmatter.title,
				date: postEdge.node.frontmatter.date,
				excerpt: postEdge.node.excerpt,
				timeToRead: postEdge.node.timeToRead
			});
		});
		return postList;
	}

	public render() {
		const postList = this.getPostList();
		return (
			<div>
				{/* Your post list here. */
					postList.map((post) =>
						<Link to={post.path} key={post.title}>
							<h1>
								{post.title}
							</h1>
						</Link>
					)}
			</div>
		);
	}
}

export default PostListing;
