import React from "react";
import "./Navbar.css";
const Navbar = () => {
	return (
		<div className="navbar">
			<h1
				className="nav-title"
				onClick={window.history.pushState("Data", "Navigation", "/")}
				style={{ cursor: "pointer" }}
			>
				SpaceX Launch Programs
			</h1>
		</div>
	);
};

export default Navbar;
