import * as React from "react";
import {MenuProps} from "../Menu";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

interface HeaderMenuProps extends MenuProps {
	inverted?: boolean;
}

interface ToggleState {
	isOpen: boolean;
}

export class HeaderMenu extends React.Component {
	public readonly props: HeaderMenuProps;
	public readonly state: ToggleState;

	constructor(props: HeaderMenuProps) {
		super(props);
		this.state = {isOpen: false};
	}

	public toggle() {
		this.state.isOpen = !this.state.isOpen;
	}

	public render() {
		return (
			<Navbar color="faded" light expand="md">
				<NavbarBrand href="/">reactstrap</NavbarBrand>
				<NavbarToggler onClick={this.toggle}/>
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						{this.props.items.map((item) => {
							const active = (item.exact) ? this.props.pathname === item.path : this.props.pathname.startsWith(item.path);
							return <NavItem><NavLink href={item.path} active={active}/></NavItem>;
						})}
					</Nav>
				</Collapse>
			</Navbar>);
	}
}