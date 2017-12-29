import * as React from "react";
import {MenuProps} from "../Menu";
import {menuItems} from "../../layouts";
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {appTitle, appTagline} from "../../html";
import "./header.scss";
import GatsbyLink from "gatsby-link";

interface HeaderProps extends MenuProps {
	inverted?: boolean;
}

interface ToggleState {
	isOpen: boolean;
}

export class Header extends React.Component {
	public readonly props: HeaderProps;
	public readonly state: ToggleState;

	constructor(props: HeaderProps) {
		super(props);
		this.state = {isOpen: false};
	}

	public toggle() {
		this.state.isOpen = !this.state.isOpen;
	}

	public render() {
		return (
			<div className="navbar-padding">
				<Navbar color="faded" fixed="top" dark expand="md">
					<NavbarBrand href={menuItems[0].path} alt={appTagline + " | " + appTitle}>
						<span className="pact pact-logo pact-md pact-white"/>
					</NavbarBrand>
					{/*<NavbarToggler onClick={this.toggle}/>*/}
					{/*<Collapse isOpen={this.state.isOpen} navbar>*/}
					<Nav className="ml-auto" navbar>
						{this.props.items.map((item) => {
							const active = (item.exact) ? this.props.pathname === item.path : this.props.pathname.startsWith(item.path);
							return <NavItem key={item.path}><GatsbyLink to={item.path}>{item.name}</GatsbyLink></NavItem>;
						})}
					</Nav>
					{/*</Collapse>*/}
				</Navbar>
			</div>);
	}
}