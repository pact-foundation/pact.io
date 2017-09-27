import * as React from "react";
import {Follow} from "react-twitter-widgets";

interface Props {
	config?: any;
	expanded?: any;
}

class UserInfo extends React.Component<Props> {
	public render() {
		const {userTwitter} = this.props.config;
		const {expanded} = this.props;
		return (
			<Follow
				username={userTwitter}
				options={{count: expanded ? true : "none"}}
			/>
		);
	}
}

export default UserInfo;
