import React, { useState, useEffect } from "react";
import "./Home.css";
import { getAllPrograms } from "./../../Services/programs";
const Home = () => {
	const [programs, setPrograms] = useState([]);
	const [years, setYears] = useState([
		2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
		2018, 2019, 2020,
	]);
	const [selectedYear, setSelectedYear] = useState(null);
	const [successfulLaunch, setSuccessfulLaunch] = useState(null);
	const [successfulLanding, setSuccessfulLanding] = useState(null);

	useEffect(() => {
		getAllPrograms().then((data) => setPrograms(data.data));
		let query = "?limit=100";
		if (successfulLaunch) {
			query += `&launch_success=true`;
		} else if (successfulLaunch === false) {
			query += `&launch_success=false`;
		}
		if (successfulLanding) {
			query += `&land_success=true`;
		} else if (successfulLanding === false) {
			query += `&land_success=false`;
		}
		if (selectedYear) {
			query += `&launch_year=${selectedYear}`;
		}
		window.history.pushState("Data", "Query", query);
	}, [selectedYear, successfulLaunch, successfulLanding]);

	const handleSelectedYear = (year) => {
		const sameSelection =
			selectedYear !== null && selectedYear === year ? true : false;
		setSelectedYear(sameSelection ? null : year);
	};

	const handleSuccessfulLaunch = (type) => {
		const sameSelection =
			successfulLaunch !== null && successfulLaunch.toString() === type
				? true
				: false;
		setSuccessfulLaunch(sameSelection ? null : type === "true" ? true : false);
	};
	const handleSuccessfulLanding = (type) => {
		const sameSelection =
			successfulLanding !== null && successfulLanding.toString() === type
				? true
				: false;
		setSuccessfulLanding(sameSelection ? null : type === "true" ? true : false);
	};
	const getProgramData = () => {
		let filtered = programs;
		if (selectedYear)
			filtered = programs.filter(
				(p) => parseInt(p.launch_year) === selectedYear
			);
		if (successfulLaunch === true || successfulLaunch === false)
			filtered = filtered.filter((p) => p.launch_success === successfulLaunch);
		if (successfulLanding === true || successfulLanding === false)
			filtered = filtered.filter(
				(p) => p.rocket.first_stage.cores[0].land_success === successfulLanding
			);
		return filtered;
	};

	return (
		<section className="home">
			<div className="left">
				<div className="static">
					<div className="filters">
						<p className="text-left">
							<b>Filters</b>
						</p>
						<p>
							<b>Launch Year</b>
						</p>
						<hr style={{ marginRight: 30, marginLeft: 30 }} />
						<div className="years">
							{years.map((year) => (
								<div
									onClick={() => handleSelectedYear(year)}
									className={`btn ${selectedYear === year ? "selected" : ""}`}
								>
									{year}
								</div>
							))}
						</div>
						<p>
							<b>Successful Launch</b>
						</p>
						<hr style={{ marginRight: 30, marginLeft: 30 }} />
						<div className="successfulLaunch">
							{["true", "false"].map((type) => (
								<div
									onClick={() => handleSuccessfulLaunch(type)}
									className={`btn ${
										successfulLaunch !== null &&
										successfulLaunch.toString() === type
											? "selected"
											: ""
									}`}
								>
									{type}
								</div>
							))}
						</div>
						<p>
							<b>Successful Landing</b>
						</p>
						<hr style={{ marginRight: 30, marginLeft: 30 }} />
						<div className="successfulLanding">
							{["true", "false"].map((type) => (
								<div
									onClick={() => handleSuccessfulLanding(type)}
									className={`btn ${
										successfulLanding !== null &&
										successfulLanding.toString() === type
											? "selected"
											: ""
									}`}
								>
									{type}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="right">
				{getProgramData().map((prog, index) => (
					<div key={index} className="programs">
						<div className="container text-left">
							<div className="prog_img">
								<img
									src={prog.links.mission_patch}
									alt={prog.mission_name + " #" + prog.flight_number}
								/>
							</div>
							<h4>
								<b>
									{prog.mission_name} #{prog.flight_number}
								</b>
							</h4>
							<h5>
								<b>Mission Ids: </b>
								{prog.mission_id.map((id, index) => {
									const length = prog.mission_id.length;
									return `${id}${
										length <= 1 ? "" : index === length - 1 ? "" : ","
									} `;
								})}
							</h5>
							<h5>
								<b>Launch Year: </b>
								{prog.launch_year}
							</h5>
							<h5>
								<b>Successful Launch: </b>
								{prog.launch_success
									? "True"
									: prog.launch_success === null
									? "Null"
									: "False"}
							</h5>
							<h5>
								<b>Successful Landing: </b>
								{prog.rocket.first_stage.cores[0].land_success
									? "True"
									: prog.rocket.first_stage.cores[0].land_success === null
									? "Null"
									: "False"}
							</h5>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Home;
