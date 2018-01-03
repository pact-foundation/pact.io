/* tslint:disable:no-namespace */

import * as React from "react";
import {Container} from "reactstrap";
import "../styles/global.scss";
import {Header} from "../components/header/header";
import Footer from "../components/footer/footer";

export const menuItems = [
	{name: "Docs", path: "/docs/", exact: true},
	{name: "Foundation", path: "/foundation/", exact: true},
	{name: "Blog", path: "/blog/", exact: false},
	{name: "Contribute", path: "/contribute/", exact: true}
];

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
	location: {
		pathname: string;
	};
	children: any;
}

export default class DefaultLayout extends React.PureComponent<DefaultLayoutProps, void> {
	public render() {
		const {pathname} = this.props.location;

		return (
			<div>
				{/* Header */}
				<Header pathname={pathname} items={menuItems}/>
				<Container>
					{/* Render children pages */}
					{
						<div>
							{this.props.children()}
						</div>
					}
				</Container>
				{/* Footer */}
				<Footer />
			</div>
		);
	}
}