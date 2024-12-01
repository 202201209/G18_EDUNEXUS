import React from "react";
import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
import AboutUS from "./AboutUs"; // Adjust path if necessary
import AOS from "aos";

// Mocking AOS library
jest.mock("aos", () => ({
	init: jest.fn(),
}));

describe("AboutUS Component", () => {
	it("renders the AboutUS component", () => {
		render(<AboutUS />);
		expect(screen.getByText(/About US/i)).toBeInTheDocument();
	});

	it("displays the project motivation section", () => {
		render(<AboutUS />);
		expect(
			screen.getByText(/Motivation for Undertaking This Project/i)
		).toBeInTheDocument();
		expect(
			screen.getByText(/In today's fast-paced education system/i)
		).toBeInTheDocument();
	});

	it("shows the technologies used section", () => {
		render(<AboutUS />);
		expect(screen.getByText(/Technologies We Use/i)).toBeInTheDocument();
		expect(screen.getByText(/React/i)).toBeInTheDocument();
		expect(screen.getByText(/Node JS/i)).toBeInTheDocument();
		expect(screen.getByText(/PostgreSQL/i)).toBeInTheDocument();
	});

	it("displays team members", () => {
		render(<AboutUS />);
		expect(screen.getByText(/Meet our Team Members/i)).toBeInTheDocument();
		expect(screen.getByText(/Vrund Leuva/i)).toBeInTheDocument();
		expect(screen.getByText(/Nishtha Patel/i)).toBeInTheDocument();
	});

	it("initializes AOS on component mount", () => {
		render(<AboutUS />);
		expect(AOS.init).toHaveBeenCalled();
	});
});
