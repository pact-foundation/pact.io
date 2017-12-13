/* tslint:disable:no-namespace */

import * as React from "react";
import {Container} from "reactstrap";
import "../styles/global.scss";
const FontAwesome = require("@fortawesome/react-fontawesome");

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
			<Container fluid={true}>
				{/* Header */}
				{/*<HeaderMenu Link={Link} pathname={pathname} items={menuItems}/>*/}

				{/* Render children pages */}
				{/*<div style={{paddingBottom: 60}}>
				 {this.props.children()}
				 </div>*/}

				{/* Footer */}
				<Container className="footer">
					<p>Powered with <FontAwesome icon="heart"/> by Gatsby 1.0</p>
				</Container>
			</Container>
		);
	}
}

declare class FontAwesomeIcon extends React.Component<FontAwesomeIcon.Props> {}
declare namespace FontAwesomeIcon {
	export type Props = React.HTMLProps<FontAwesomeIcon> | {
		icon: object | any[] | string;
		border?: boolean;
		className?: string;
		mask?: object | any[] | string;
		fixedWidth?: boolean;
		flip?: "horizontal" | "vertical" | "both";
		listItem?: boolean;
		pull?: "right" | "left" | "none";
		pulse?: boolean;
		name?: string;
		rotation?: 90 | 180 | 270;
		size?: "lg" | "xs" | "sm" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
		spin?: boolean;
		symbol?: boolean | string;
		transform?: string | object;
	};
}
