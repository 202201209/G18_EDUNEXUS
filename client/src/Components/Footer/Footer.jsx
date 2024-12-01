import React from "react";

import { MdAnnouncement } from "react-icons/md";
import SocialCard from "./SocialCard";

const Footer = () => {
	const footerStyle = {
		backgroundColor: "#282c34",
		color: "#fff",
		padding: "20px",
	};

	const containerStyle = {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between",
		gap: "20px",
	};

	const sectionStyle = {
		paddingRight: "50px",
		paddingLeft: "70px",
		flex: 1,
		minWidth: "200px",
		marginBottom: "20px",
	};

	const headerStyle = {
		marginBottom: "10px",
	};

	const linkStyle = {
		color: "#a0c4ff",
		textDecoration: "none",
	};

	// const socialIconStyle = {
	// 	color: "#fff",
	// 	marginRight: "15px",
	// 	fontSize: "1.5rem",
	// };

	const footerBottomStyle = {
		textAlign: "center",
		marginTop: "20px",
		borderTop: "1px solid #444",
		paddingTop: "10px",
	};

	return (
		<footer style={footerStyle}>
			<div style={containerStyle}>
				{/* Announcements Section */}
				<div style={sectionStyle}>
					<h4 style={headerStyle}>
						<MdAnnouncement /> Announcements
					</h4>
					<ul>
						<li>New feature update coming next week!</li>
						<li>Maintenance scheduled for Saturday at 10:00 PM.</li>
						<li>Reminder: End-of-term exams start on Dec 1st.</li>
					</ul>
				</div>

				{/* Quick Links */}
				<div style={sectionStyle}>
					<h4 style={headerStyle}>Quick Links</h4>
					<ul>
						<li>
							<a href="/dashboard" style={linkStyle}>
								Dashboard
							</a>
						</li>
						<li>
							<a href="/profile" style={linkStyle}>
								Student Profiles
							</a>
						</li>
						<li>
							<a href="/course" style={linkStyle}>
								Course
							</a>
						</li>
						<li>
							<a href="/help" style={linkStyle}>
								Help Center
							</a>
						</li>
					</ul>
				</div>

				<div style={{ paddingRight: "100px" }}>
					<div>
						<SocialCard />
						{/* <SocialCard2 /> */}
					</div>
				</div>

				{/* Social Media and Contact Information */}
				<div style={sectionStyle}>
					<h4 style={headerStyle}>Contact Us</h4>
					<p>Email: support@management.com</p>
					<p>Phone: +123-456-7890</p>
				</div>
			</div>

			{/* Footer Bottom */}
			<div style={footerBottomStyle}>
				<p>&copy; 2024 Student Management Project. All Rights Reserved.</p>
				<p>Developed by Admin Control Panel</p>
				{/* <div>
					<a href="https://facebook.com" style={socialIconStyle}>
						<FaFacebook />
					</a>
					<a href="https://twitter.com" style={socialIconStyle}>
						<FaTwitter />
					</a>
					<a href="https://linkedin.com" style={socialIconStyle}>
						<FaLinkedin />
					</a>
					<a href="https://instagram.com" style={socialIconStyle}>
						<FaInstagram />
					</a>
				</div> */}
			</div>
		</footer>
	);
};

export default Footer;
