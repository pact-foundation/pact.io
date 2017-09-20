import React, { Component } from "react";
import Helmet from "react-helmet";
import About from "../components/about/about";
import config from "../../data/site-config";

class AboutPage extends Component {
  render() {
    return (
      <div className="about-container">
        <Helmet title={`About | ${config.siteTitle}`} />
        <About />
      </div>
    );
  }
}

export default AboutPage;
