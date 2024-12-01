import React from "react";

const Features = () => {
	const featureData = [
		{
			title: "Exam Scheduling",
			description:
				"Schedule exams in advance with automated reminders for students.",
		},
		{
			title: "Real-Time Results",
			description: "Get your scores as soon as your exam finishes.",
		},
		{
			title: "Multiple Question Types",
			description: "Supports multiple-choice, true/false, and more.",
		},
		{
			title: "User-Friendly Interface",
			description: "Easily navigate through your exams with our intuitive UI.",
		},
	];

	const styles = {
		container: {
			textAlign: "center",
			padding: "4rem 2rem",
			backgroundColor: "#eaf6fc", // Light blue background for consistency
			borderRadius: "8px",
			marginTop: "2rem",
		},
		title: {
			fontSize: "2.5rem",
			fontWeight: "bold",
			color: "#333",
			marginBottom: "2rem",
		},
		grid: {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", // Reduced card size
			gap: "1.5rem", // Smaller gap between cards
			maxWidth: "1200px",
			margin: "0 auto",
		},
		card: {
			backgroundColor: "48cae4",
			padding: "1rem", // Reduced padding
			borderRadius: "10px", // Slightly smaller border radius
			boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
			transition:
				"transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
			textAlign: "center",
			// cursor: "pointer", // Add cursor pointer to indicate it's clickable
			transform: "scale(1)", // Initial scale
		},
		cardHover: {
			transform: "translateY(-10px) scale(1.05)", // Adjusted hover effect
			boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
			backgroundColor: "#f7f7f7", // Slightly lighter background on hover
		},
		featureTitle: {
			fontSize: "1.3rem", // Slightly smaller title
			fontWeight: "600",
			color: "#0078d4", // Highlighted color for titles
			marginBottom: "0.8rem",
		},
		description: {
			fontSize: "0.95rem", // Slightly smaller description font size
			color: "#555",
			lineHeight: "1.5",
		},
	};

	return (
		<div style={styles.container}>
			<h2 style={styles.title}>Features</h2>
			<div style={styles.grid}>
				{featureData.map((feature, index) => (
					<div
						key={index}
						style={styles.card}
						onMouseEnter={(e) =>
							Object.assign(e.currentTarget.style, styles.cardHover)
						}
						onMouseLeave={(e) =>
							Object.assign(e.currentTarget.style, styles.card)
						}
					>
						<h3 style={styles.featureTitle}>{feature.title}</h3>
						<p style={styles.description}>{feature.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Features;
