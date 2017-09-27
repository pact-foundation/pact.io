import React from "react";
import { Router, Route, browserHistory } from "react-router";
import {
	createApp,
	createContainer,
	query,
	BodyRenderer
} from "@phenomic/preset-react-app/lib/client";

const Home = () => (
	<div>
		<p>This is a homepage</p>
	</div>
);

const BlogPost = ({ isLoading, page }) => (
	<div>
		{isLoading && "Loading..."}
		{!isLoading &&
		page.node && (
			<article>
				<h1>{page.node.title}</h1>
				<BodyRenderer>{page.node.body}</BodyRenderer>
			</article>
		)}
		<footer>
			<Link to="/">Go to home</Link>
		</footer>
	</div>
);

const BlogPostContainer = createContainer(BlogPost, props => ({
	page: query({ path: "posts", id: props.params.splat })
}));

export default createApp(() => (
	<Router history={browserHistory}>
		<Route path="/" component={Home} />
		<Route path="/blog/*" component={BlogPostContainer} />
	</Router>
));