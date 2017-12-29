/* tslint:disable:no-namespace */

import * as React from "react";
import {Container} from "reactstrap";
import "../styles/global.scss";
import {Header} from "../components/header/header";
import Footer from "../components/footer/footer";

export const menuItems = [
	{name: "Home", path: "/", exact: true, icon: "home", inverted: true},
	{name: "About", path: "/about/", exact: true, icon: "info circle"},
	{name: "Blog", path: "/blog/", exact: false, icon: "newspaper"},
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