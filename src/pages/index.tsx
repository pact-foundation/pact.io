import * as React from "react";
import Link from "gatsby-link";
import Particles from "react-particles-js";
import "./index.scss";

interface IndexPageProps {
	location: {
		pathname: string;
	};
}

export default (props: IndexPageProps) =>
	<div className="landing-wrapper text-center d-flex align-items-center justify-content-center" style={{height: window.innerHeight + "px"}}>
		<Particles className="particles"/>
		<div>
			<h1>Deploy with Confidence.</h1>
			<h3><span className="pact pact-text pact-white"></span>.</h3>
		</div>
	</div>
;
