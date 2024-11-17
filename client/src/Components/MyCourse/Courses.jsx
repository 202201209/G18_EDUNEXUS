import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import CourseCard2 from "./CourseCard2"; // Import the ClassroomCard component
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useAPI from "../../hooks/api";
//integration
import axios from "axios";

 // update this url 
//  import dotenv from 'dotenv';
//  dotenv.config();
 
 const ENDPOINT = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

const Api =
	`${ENDPOINT}/api/user/dashboard/mycourses?ID=S001&Semester=5`;

const parentstyle = {
	marginTop: "100px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "5px",
	margin: "5px",
};
const Courses = () => {
	// List of courses (already present in your original code)

	const [mycourses, setMycourses] = useState([]);
	const [semester, setSemester] = React.useState("4");

	const { GET, POST } = useAPI();

	const handleChange = (event) => {
		setSemester(event.target.value);
	};

	useEffect(() => {
		const fetchApiData = async () => {
			try {
				// const response = await axios.get(Api);
				// console.log(response.data);

				const courseData = { ID: "S001", Semester: "5" };
				const results = await GET("/api/user/dashboard/mycourses", courseData);
				
				console.log(results.data.mycourses);
				setMycourses(results.data.mycourses);

				// const results = await axios.get(
				// 	`http://localhost:3001/api/user/dashboard/mycourses?ID=${S001}&Semester=${5}`
				// );

				setMycourses(response.data?.mycourses);
			} catch (error) {
				//   setError(error);
				console.log(error);
			}
		};
		fetchApiData();
	}, []);

	useEffect(() => {
		console.log(mycourses);
	}, [mycourses]);

	const [courses] = useState([
		{
			id: "1",
			courseName: "IT305-LAB-2024",
			instructor: "Sanjay Srivastava",
			avatarLetter: "S",
			courseCode: "IT305",
		},
		{
			id: "2",
			courseName: "CS101-INTRO-2024",
			instructor: "Jane Doe",
			avatarLetter: "J",
			courseCode: "CS101",
		},
		{
			id: "3",
			courseName: "CS102-ADV-2024",
			instructor: "John Smith",
			avatarLetter: "J",
			courseCode: "CS102",
		},
		{
			id: "4",
			courseName: "EE201-CIRCUITS-2024",
			instructor: "Anita Gupta",
			avatarLetter: "A",
			courseCode: "EE201",
		},
		{
			id: "5",
			courseName: "ME101-MECH-2024",
			instructor: "Mike Johnson",
			avatarLetter: "M",
			courseCode: "ME101",
		},
		{
			id: "6",
			courseName: "MA202-MATHS-2024",
			instructor: "Emily Davis",
			avatarLetter: "E",
			courseCode: "MA202",
		},
		{
			id: "7",
			courseName: "PH201-PHYSICS-2024",
			instructor: "Robert Brown",
			avatarLetter: "R",
			courseCode: "PH201",
		},
		{
			id: "8",
			courseName: "CS103-DATA-2024",
			instructor: "Linda Taylor",
			avatarLetter: "L",
			courseCode: "CS103",
		},
		{
			id: "9",
			courseName: "CH101-CHEM-2024",
			instructor: "Sophia Wilson",
			avatarLetter: "S",
			courseCode: "CH101",
		},
	]);
	return (
		<>
			<div style={{ display: "flex", alignItems: "center", padding: "0 20px",marginTop:"15px" }}>
				<h1 style={{ zIndex: "1", width: "100%", margin: 0 }}>My Courses</h1>

				<FormControl
					sx={{
						// marginTop: "200px",
						m: 1,
						minWidth: 120,
						borderRadius: "8px",
						backgroundColor: "#f5f5f5",
						boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
						"& .MuiSelect-root": {
							padding: "10px",
							border: "1px solid #ccc",
							"&:hover": {
								borderColor: "#3f51b5",
							},
						},
						"& .Mui-focused .MuiOutlinedInput-notchedOutline": {
							borderColor: "#3f51b5",
						},
					}}
					size="medium"
				>
					<InputLabel id="demo-select-small-label">Semester</InputLabel>
					<Select
						labelId="demo-select-small-label"
						id="demo-select-small"
						value={semester}
						label="Semester"
						onChange={handleChange}
						sx={{
							"& .MuiSelect-icon": {
								color: "#3f51b5",
							},
						}}
					>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
							<MenuItem key={sem} value={sem}>
								{sem}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<div style={{ marginTop: "40px" }}>
				<Grid container>
					{/* Sidebar with Navbar */}

					{/* Course Cards Section */}
					<Grid
						item
						md={12}
						xs={9}
						sm={10}
						sx={{ position: "relative" }}
						style={parentstyle}
					>
						<Grid
							container
							spacing={4}
							style={{ padding: "5px", margin: "5px" }}
						>
							{/* Map through courses and render ClassroomCard for each */}
							{mycourses?.map((course, index) => (
								<div key={index} style={{ padding: "5px", margin: "5px" }}>
									<CourseCard2
										courseName={course.course_code}
										instructor={course.course_code}
										avatarLetter={course.avatarLetter}
										courseCode={course.course_code}
									/>
								</div>
							))}
						</Grid>
					</Grid>
				</Grid>
			</div>
		</>
	);
};
export default Courses;
