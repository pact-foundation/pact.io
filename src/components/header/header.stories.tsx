/* tslint:disable no-var-requires */
const withReadme = (require("storybook-readme/with-readme") as any).default;
const HeaderMenuReadme = require("./README.md");

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {boolean, text, withKnobs} from "@storybook/addon-knobs";
import {Header} from "./header";

const items = [
	{name: "Home", path: "/", exact: true},
	{name: "About", path: "/about/", exact: true},
	{name: "Blog", path: "/blog/", exact: false},
];

const LinkStub = (props: any) =>
	<div {...props} onClick={action(props.to.toString())}>{props.children}</div>;
const dispatchStub = (a: any) => action(a.type)(a) && a;

storiesOf("Header", module)
	.addDecorator(withKnobs)
	.addDecorator(withReadme(HeaderMenuReadme))
	.add("default", () => {
		const pathname = text("pathname", "/");
		const inverted = boolean("inverted", false);

		return (
			<Header Link={LinkStub} items={items} pathname={pathname} inverted={inverted} dispatch={dispatchStub}/>
		);
	});
