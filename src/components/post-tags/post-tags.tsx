import * as React from "react";
import _ from "lodash";
import Link from "gatsby-link";

interface Props {
	tags?: string[];
}

class PostTags extends React.Component<Props> {
	public render() {
		const {tags} = this.props;
		return (
			<div className="post-tag-container">
				{tags &&
				tags.map((tag) =>
					<Link
						key={tag}
						to={`/tags/${_.kebabCase(tag)}`}
					>
						<button>
							{tag}
						</button>
					</Link>
				)}
			</div>
		);
	}
}

export default PostTags;
