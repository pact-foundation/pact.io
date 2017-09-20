import * as React from "react";
import * as Helmet from "react-helmet";
import About from "../components/about/about";
import config = require("../../data/site-config");

export default class AboutPage extends React.Component {
	public render() {
		return (
            <div className="about-container">
                <Helmet title={`About | ${config.siteTitle}`} />
                <About />
            </div>
		);
	}
}
