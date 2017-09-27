import * as React from "react";
import ReactDisqusComments from "react-disqus-comments";
import config = require("../../../data/site-config");

interface Props {
	postNode?: any;
}

interface State {
	toasts?: any[];
	data?: any;
}

class Disqus extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			toasts: []
		};
		this.notifyAboutComment = this.notifyAboutComment.bind(this);
		this.onSnackbarDismiss = this.onSnackbarDismiss.bind(this);
	}

	public onSnackbarDismiss() {
		const [, ...toasts] = this.state.toasts;
		this.setState({toasts});
	}

	public notifyAboutComment() {
		const toasts = this.state.toasts.slice();
		toasts.push({text: "New comment available!"});
		this.setState({toasts});
	}

	public render() {
		const {postNode} = this.props;
		if (!config.disqusShortname) {
			return null;
		}
		const post = postNode.frontmatter;
		const url = config.siteUrl + config.pathPrefix + postNode.fields.slug;
		return (
			<ReactDisqusComments
				shortname={config.disqusShortname}
				identifier={post.title}
				title={post.title}
				url={url}
				category_id={post.category_id}
				onNewComment={this.notifyAboutComment}
			/>
		);
	}
}

export default Disqus;
