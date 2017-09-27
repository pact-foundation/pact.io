import * as React from "react";
import Link from "gatsby-link";
import "./user-links.less";

interface Props {
	config?: {
		userLinks?: Array<{
			label?: string
			url?: string
		}>
	};
	labeled?: any;
}

class UserLinks extends React.Component<Props> {
	public getLinkElements() {
		const {userLinks} = this.props.config;
		const {labeled} = this.props;
		return userLinks.map((link) =>
			<Link ref={link.label} to={link.url}>
				{labeled ? link.label : ""}
			</Link>
		);
	}

	public render() {
		const {userLinks} = this.props.config;
		if (!userLinks) {
			return null;
		}
		return (
			<div className="user-links">
				{this.getLinkElements()}
			</div>
		);
	}
}

export default UserLinks;
