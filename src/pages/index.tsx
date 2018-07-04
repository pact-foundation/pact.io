import * as React from "react";
import {ReactPropTypes} from "react";
import Particles from "react-particles-js";
import "./index.scss";
import GatsbyLink from "gatsby-link";

interface IndexPageProps extends ReactPropTypes {
	location: {
		pathname: string;
	};
}

let canvasHeight = typeof window !== "undefined" ? window.innerHeight : 600;
let canvasWidth = typeof window !== "undefined" ? window.innerWidth : 800;

export default (props: IndexPageProps) =>
	<div className="page-index">
		<header className="landing-wrapper" style={{height: canvasHeight + "px"}}>
			<Particles className="particles" params={
				{
					"particles": {
						"number": {
							"value": 40,
							"density": {
								"enable": true,
								"value_area": Math.max(canvasWidth / 1.5, 600)
							}
						},
						"color": {
							"value": "#ffffff"
						},
						"shape": {
							"type": "polygon",
							"polygon": {
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
					<div className="left col-sm-12 col-md-6 text-md-right">
						{/*<h1>API Chaos,<br/>Near Impossible to Test,<br/>Code with Confidence.</h1>*/}
						{/*<h1>Install Pact,<br/>Write Software,<br/>Test Thoroughly,<br/>Deploy with Confidence.</h1>*/}
						{/*<h1>Install, Code, Test,<br/>Deploy with Confidence.</h1>*/}
						{/*<h1>Untangling Microservices.<br/>One test at a time.<br/>Since 2014.</h1>*/}
						<h1>Install Effortlessly,<br/>Code Beautifully,<br/>Test Meticulously,<br/><strong>Deploy Confidently.</strong></h1>
					</div>
					<div className="right col-sm-12 col-md-6 text-md-left">
						<h1><span className="pact pact-logo pact-white"></span></h1>
						<h5><em>The</em> cross-language distributed <br/>contract testing framework</h5>
						<GatsbyLink to="#learn-more" className="btn btn-outline-secondary">Learn More</GatsbyLink>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<GatsbyLink to="/get-started" className="btn btn-primary">Get Started</GatsbyLink>
					</div>
				</div>
			</div>

		</header>
		<div className="content">
			<section id="learn-more">
				<h1>So, What is Pact?</h1>
				Pact is a contract test framework; it's a fancy way of saying that tests written with Pact make sure that any interaction between the Client (consumer) and a Server (provider) follow a
				strict data contract which fails the test if any of the interactions are broken, hence the name "Pact". Alright, that was a lot of words, let's look at a quick example.
			</section>
			<section id="sponsors">
				<h1>Our Wonderful Sponsors & Backers</h1>
				Show logos of sponsors
				<a href="http://donate.pact.io">Donate on Open Collective</a>
			</section>
			<section id="stats">

			</section>
			<section id="foundation">
				Show the members of the foundation
			</section>
		</div>
	</div>
;
