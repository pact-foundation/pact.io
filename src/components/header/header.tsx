import * as React from "react";
import {MenuProps} from "../Menu";
import {Nav, Navbar, NavbarBrand, NavItem, Collapse, NavbarToggler} from "reactstrap";
import "./header.scss";
import GatsbyLink from "gatsby-link";

interface HeaderProps extends MenuProps {
	inverted?: boolean;
}

export class Header extends React.Component {
	public readonly props:HeaderProps;
	protected _menuOpen: boolean = false;

	public toggle() {
		this._menuOpen = !this._menuOpen;
	}

	public render() {
		return (
			<div className="navbar-padding">
				<Navbar color="faded" fixed="top" dark expand="md">
					<GatsbyLink to="/" className="navbar-brand" about="Deploy with Confidence"><span className="pact pact-logo pact-md pact-white"/></GatsbyLink>
					<NavbarToggler onClick={this.toggle.bind(this)}/>
					<Collapse isOpen={this._menuOpen} navbar>
						<Nav className="ml-auto" navbar>
							{this.props.items.map((item) => {
								const active = (item.exact) ? this.props.pathname === item.path : this.props.pathname.startsWith(item.path);
								return <NavItem key={item.path}><GatsbyLink to={item.path} className={"nav-link " + (active ? "active" : "")}>{item.name}</GatsbyLink></NavItem>;
							})}
						</Nav>
					</Collapse>
				</Navbar>
			</div>);
	}
}
