import React from "react";
import "./Footer.css";
const Footer = () => {
	return (
		<div className="footer">
			<h6>
				Developed by:{" "}
				<b>
					<a href="https://github.com/guptaashwanee" target="_black">
						Ashwanee Kumar Gupta
					</a>
				</b>
			</h6>
			<p style={{ fontSize: "15px" }}>
				View on Github{" "}
				<a href="https://github.com/guptaashwanee/spacex" target="_black">
					SpaceX Launch Program
				</a>
			</p>
		</div>
	);
};

export default Footer;
