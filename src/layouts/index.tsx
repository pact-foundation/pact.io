/* tslint:disable:no-namespace */

import * as React from "react";
import {Container} from "reactstrap";
import "../styles/global.scss";
import {HeaderMenu} from "../components/HeaderMenu/HeaderMenu";

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
				<HeaderMenu pathname={pathname} items={menuItems}/>
				<Container fluid={true}>


					{/* Render children pages */}
					{/*<div style={{paddingBottom: 60}}>
					 {this.props.children()}
					 </div>*/}

					{/* Footer */}
					<Container className="footer">
						<p>Powered with <i className="fas fa-heart"></i> by Gatsby 1.0</p>
					</Container>
				</Container>
			</div>
		);
	}
}