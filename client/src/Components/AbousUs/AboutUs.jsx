import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CSS/AboutUs.css";
// import { avatars } from "../utils/avatar";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IconButton } from "@mui/material";
// import avatar from '../utils/avatar.js'; // Or `.ts`, `.jsx`, etc.
import Features from "./Feature";
import UpcomingFeatures from "./UpcomingFeature";
import Footer from "../Footer/Footer.jsx";

const img = "https://wallpapercave.com/wp/wp7313761.jpg";

const teamMembers = [
	{
		name: "Vrund Leuva",
		photo: img,
		github: "https://github.com/vrund1307",
		linkedin: "https://www.linkedin.com/in/",
	},
	{
		name: "Nishtha Patel",
		photo: img,
		github: "https://github.com/202201209",
		linkedin: "https://www.linkedin.com/in/",
	},
	{
		name: "Jainam Prajapati",
		photo: img,
		github: "https://github.com/202201228",
		linkedin: "https://www.linkedin.com",
	},
	{
		name: "Rhydhm Panchal",
		photo: img,
		github: "https://github.com/alwaysinmy-rhythm",
		linkedin: "https://www.linkedin.com/",
	},
	{
		name: "Aryan Solanki",
		photo: img,
		github: "https://github.com/202201239",
		linkedin: "https://www.linkedin.com/",
	},
	{
		name: "Jenil Goswami",
		photo: img,
		github: "https://github.com/Jenil247",
		linkedin: "https://www.linkedin.com/",
	},
	{
		name: "Smit Fefar",
		photo: img,
		github: "https://github.com/FEFAR-SMIT",
		linkedin: "https://www.linkedin.com/",
	},
	{
		name: "Jay Rathod",
		photo: img,
		github: "https://github.com/PrathamPatel25",
		linkedin: "https://www.linkedin.com/in/pratham-patel-0920-/",
	},
	{
		name: "Aashtha Bhavsar",
		photo: img,
		github: "https://github.com/aas1tha",
		linkedin: "https://www.linkedin.com/",
	},
];

function AboutUS() {
	const [shuffledMembers, setShuffledMembers] = useState([]);

	useEffect(() => {
		AOS.init({
			duration: 800,
			easing: "ease-in-out",
			once: true,
		});

		// Shuffle the team members
		const shuffleArray = (array) => {
			const shuffled = [...array];
			for (let i = shuffled.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
			}
			return shuffled;
		};

		setShuffledMembers(shuffleArray(teamMembers));
	}, []);

	return (
		<div data-aos="fade-up">
			<section className="section services-section" id="services">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "100%",
									marginTop: "50px",
								}}
							>
								<div>
									<h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
										About US
									</h1>
									<p style={{ fontFamily: "Quicksand" }}>
										Our Student Management ERP simplifies academic processes,
										empowering educators and enhancing the student experience
										with a modern, digital solution.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6">
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "100%",
									marginTop: "50px",
								}}
							>
								<div>
									<h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
										Motivation for Undertaking This Project
									</h1>
									<p style={{ fontFamily: "Quicksand" }}>
										In today's fast-paced education system, we developed a
										modern Student Management ERP to replace outdated methods,
										saving time and resources while improving tasks for
										educators and the learning experience for students.
									</p>
								</div>
							</div>
						</div>
					</div>

					<Features />
					<UpcomingFeatures />
					{/* Tech Stack */}

					<div className="row">
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100%",
								marginTop: "50px",
							}}
						>
							<h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
								Technologies We Use
							</h1>
						</div>

						{/* Technology Boxes */}
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div
									className="icon"
									style={{ backgroundColor: "white", color: "black" }}
								>
									<i className="fa-brands fa-react"></i>
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>React</h5>
								</div>
							</div>
						</div>

						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div
									className="icon"
									// style={{ backgroundColor: "white", color: "black" }}
								>
									<i className="fa-brands fa-node"></i>
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>Node JS</h5>
								</div>
							</div>
						</div>

						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div
									className="icon"
									style={{ backgroundColor: "white", color: "black" }}
								>
									<i className="fa-solid fa-database"></i>
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>PostgreSQL</h5>
								</div>
							</div>
						</div>

						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div
									className="icon"
									// style={{ backgroundColor: "white", color: "black" }}
								>
									<i className="fa-brands fa-node-js"></i>
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>Express</h5>
								</div>
							</div>
						</div>

						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div
									className="icon"
									style={{ backgroundColor: "white", color: "black" }}
								>
									<i className="fa-brands fa-uikit"></i>
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>Material UI</h5>
								</div>
							</div>
						</div>

						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div className="icon">
									<i className="fa-brands fa-bootstrap"></i>
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>Bootstrap</h5>
								</div>
							</div>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100%",
							}}
						>
							<h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
								Meet our Team Members
							</h1>
						</div>

						{/* Profile Boxes */}
						{shuffledMembers.map((member, index) => (
							<div
								key={index}
								className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
							>
								<div className="feature-box-1 profile-card">
									<div
										className="profile-content"
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											padding: "1rem",
										}}
									>
										<img
											src={member.photo}
											alt="profile"
											className="profile-img"
										/>
										<h5 className="profile-name">{member.name}</h5>
										<div className="profile-icons">
											<IconButton
												sx={{ mx: "2px" }}
												onClick={() => window.open(member.github, "_blank")}
												className="icon-button"
											>
												<GitHubIcon sx={{ color: "#333333" }} />
											</IconButton>
											<IconButton
												sx={{ mx: "2px" }}
												onClick={() => window.open(member.linkedin, "_blank")}
												className="icon-button"
											>
												<LinkedInIcon sx={{ color: "#333333" }} />
											</IconButton>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

export default AboutUS;
