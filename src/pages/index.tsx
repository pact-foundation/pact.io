import * as React from "react";
import Particles from "react-particles-js";
import "./index.scss";
import GatsbyLink from "gatsby-link";
import {Props, ReactPropTypes} from "react";

interface IndexPageProps extends ReactPropTypes {
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
							"type": "polygon",
							"polygon" :{
								"nb_sides": 6
							}
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
							"color": "#007bff",
							"opacity": 0.5,
							"width": 1
						},
						"move": {
							"enable": true,
							"speed": 2,
							"direction": "none",
							"random": true,
							"out_mode": "out",
							"attract": {
								"enable": false
							}
						}
					}
				}
			}/>

			<div className="text container">
				<div className="row h-100 align-items-md-center justify-content-md-center text-center">
					<div className="col-sm-12 col-md-6 text-md-right">
						{/*<h1>API Chaos,<br/>Near Impossible to Test,<br/>Code with Confidence.<br/></h1>*/}
						{/*<h1>Install Pact,<br/>Write Software,<br/>Test Thoroughly,<br/>Deploy with Confidence.<br/></h1>*/}
						{/*<h1>Install, Code, Test,<br/>Deploy with Confidence.<br/></h1>*/}
						{/*<h1>Microservices are chaotic,<br/>but they don't have to be.<br/></h1>*/}
						<h1>Install easily,<br/>Code Beautifully,<br/>Test Rigorously,<br/>Deploy Confidently.<br/></h1>
					</div>
					<div className="col-sm-12 col-md-6 text-md-left">
						<h1><span className="pact pact-logo pact-white pact-xl"></span></h1>
						<h5><em>The</em> cross-language microservice contract framework</h5>
						<GatsbyLink to="/#learn-more" className="btn btn-outline-secondary">Learn More</GatsbyLink>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<GatsbyLink to="/intro" className="btn btn-primary">Get Started</GatsbyLink>
					</div>
				</div>
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
