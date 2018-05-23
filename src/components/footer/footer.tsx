import * as React from "react";
import {Container} from "reactstrap";
import "./footer.scss";
import GatsbyLink from "gatsby-link";

export default () =>
	<footer className="footer">
		<Container>
			<div className="row">
				<div className="col-12">
					Made with <i className="fas fa-heart"></i> by <GatsbyLink to="/foundation"><span className="pact pact-foundation-logo"></span></GatsbyLink>
				</div>
			</div>
		</Container>
	</footer>
;
