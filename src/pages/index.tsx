import * as React from "react";
import Particles from "react-particles-js";
import "./index.scss";
import GatsbyLink from "gatsby-link";

interface IndexPageProps {
	location: {
		pathname: string;
	};
}

export default (props: IndexPageProps) =>
	<div>
		<div className="landing-wrapper" style={{height: typeof window !== "undefined" ? window.innerHeight + "px" : "600px"}}>
			<Particles className="particles" params={
				{
					"particles": {
						"number": {
							"value": 40,
							"density": {
								"enable": true,
								"value_area": 600
							}
						},
						"color": {
							"value": "#ffffff"
						},
						"shape": {
							"type": "circle"
						},
						"opacity": {
							"value": 0.5,
							"random": true
						},
						"size": {
							"value": 2.5,
							"random": true
						},
						"line_linked": {
							"enable": true,
							"distance": 200,
							"color": "#ffffff",
							"opacity": 0.5,
							"width": 1
						},
						"move": {
							"enable": true,
							"speed": 2,
							"direction": "none",
							"random": true,
							"out_mode": "out"
						}
					}
				}
			}/>
			<div className="text text-center d-flex align-items-center justify-content-center">
				<h1>API Chaos,<br/>Near Impossible to Test.<br/>Code with Confidence.<br/><span className="pact pact-text pact-white pact-xl"></span></h1>
				<GatsbyLink to="/intro" className="btn btn-primary">Get Started</GatsbyLink>
				<GatsbyLink to="/#learn-more" className="btn btn-outline-secondary">Learn More</GatsbyLink>
			</div>
		</div>
		<div id="what">
			Explain what's Pact
		</div>
		<div id="users">
			Show logos of who's using it
		</div>
		<div id="sponsors">
			Show logos of sponsors
		</div>
		<div id="foundation">
			Show the members of the foundation
		</div>
	</div>
;
