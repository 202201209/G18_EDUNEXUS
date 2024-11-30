import React, { useEffect, useState } from "react";
import {
	Tabs,
	Tab,
	Box,
	Card,
	// CardContent,
	Typography,
	// Avatar,
	Tooltip,
} from "@mui/material";
// import { Divider, Button } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import NoteIcon from "@mui/icons-material/Note";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PeopleIcon from "@mui/icons-material/People";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { Grid, useMediaQuery, useTheme } from "@mui/material";

// const StyledCard = styled(Card)({
// 	border: "1px solid #e0e0e0",
// 	borderRadius: "10px",
// 	padding: "20px",
// 	marginBottom: "20px",
// 	boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
// });
import { Modal } from "@mui/material";
import Publish from "./Publish";

import PropTypes from "prop-types";
import useAPI from "../../hooks/api";
import axios from "axios";
import LabSubmission from "./LabSubmission";
import AnnouncementDetails from "./AnnouncementDetails";
const TabPanel = (props) => {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	value: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
};
const parentstyle = {
	marginTop: "100px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "5px",
	margin: "5px",
};

const Api = "http://localhost:3001/api/user/dashboard/mycourses/1/lab";
// const SID = String(JSON.parse(localStorage.getItem("userInfo")).SID);
const userInfo = localStorage.getItem("userInfo");

const role = userInfo ? String(JSON.parse(userInfo).role) : "student";
// console.log(SID);
// console.log(role);

const CourseDetails = () => {
	// const { GET, POST } = useAPI();

	 const [lab, setLab] = useState("");

		const fetchApiData = async () => {
			try {
				const response = await axios.get(Api); // Corrected typo here
				console.log(response.data); // Ensure this line is uncommented to print data
				setLab(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		useEffect(() => {
			fetchApiData(); // Ensure fetchApiData is called inside useEffect
		}, []);
	
	
	const [value, setValue] = useState(0);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile view

	const handleChange = (event, newValue) => setValue(newValue);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
};
	
	return (
		<div style={{ marginTop: "20px" }}>
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
					<Grid container spacing={4} style={{ padding: "5px", margin: "5px" }}>
						<Box sx={{ width: "100%" }}>
							<Tabs
								value={value}
								onChange={handleChange}
								variant={isMobile ? "scrollable" : "standard"}
								scrollButtons={isMobile ? "auto" : false}
								centered={!isMobile}
							>
								{/** Tab Icons and Tooltips */}
								<Tooltip title="Lab" arrow>
									<Tab
										icon={<FolderIcon />}
										label={value === 0 ? "Lab" : ""}
										aria-label="Lab"
									/>
								</Tooltip>
								<Tooltip title="Notes" arrow>
									<Tab
										icon={<NoteIcon />}
										label={value === 1 ? "Notes" : ""}
										aria-label="Notes"
									/>
								</Tooltip>
								<Tooltip title="Announcements" arrow>
									<Tab
										icon={<AnnouncementIcon />}
										label={value === 2 ? "Announcements" : ""}
										aria-label="Announcements"
									/>
								</Tooltip>
								<Tooltip title="Students" arrow>
									<Tab
										icon={<PeopleIcon />}
										label={value === 3 ? "Students" : ""}
										aria-label="Students"
									/>
								</Tooltip>
								{/* <Tooltip title="Attendance" arrow>
                                            <Tab
                                                icon={<EventAvailableIcon />}
                                                label={value === 3 ? "Attendance" : ""}
                                                aria-label="Attendance"
                                            />
                                        </Tooltip> */}

								<div
									style={{
										display: "flex",
										alignItems: "center",
										padding: "0 20px",
									}}
								>
									{
										role === "faculty" &&
										(
									<button
										// disabled={}
											className="add"
											style={{
												marginLeft: "auto",
												marginRight: "20px", // Adds space between the button and the edge of the screen
												padding: "13px 26px", // Adjusts the padding inside the button
												fontSxize: "16px", // Sets a good font size
												borderRadius: "4px", // Rounded corners
												backgroundColor: "#1976d2", // Primary blue color
												color: "#fff", // White text color
												border: "none", // Removes any border
												cursor: "pointer", // Changes the cursor to pointer on hover
											}}
											onClick={handleOpenModal}
										>
											Announcement Something
										</button>
									)
									}
									<Modal open={isModalOpen} onClose={handleCloseModal}>
										<Box
											sx={{
												position: "absolute",
												top: "50%",
												left: "50%",
												transform: "translate(-50%, -50%)",
												// width: {
												// 	xs: "90vw",
												// 	sm: "80vw",
												// 	md: "60vw",
												// 	lg: "50vw",
												// }, // Responsive width
												height: { xs: "80vh", sm: "70vh", md: "auto" }, // Responsive height with flexibility for larger screens
												maxHeight: "90vh", // Ensures it doesn't overflow on small screens
												bgcolor: "background.paper",
												boxShadow: 24,
												// p: 4,
												borderRadius: "8px",
												overflowY: "auto", // Adds scroll if content overflows vertically
											}}
										>
											<Publish
												// addAnnouncement={addAnnouncement}
												handleClose={handleCloseModal}
											/>
										</Box>
									</Modal>
								</div>
							</Tabs>

							<TabPanel value={value} index={0}>
								<Typography>
									{/* <LabSubmission /> */}
									<AnnouncementDetails category="Lab" Lists={lab.Labs} />
								</Typography>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<Typography>Lecture Notes Content</Typography>
							</TabPanel>
							<TabPanel value={value} index={2}>
								<Typography>Announcements Content</Typography>
							</TabPanel>
							{/* <TabPanel value={value} index={3}>
								<Typography>Attendance Content</Typography>
							</TabPanel> */}
							<TabPanel value={value} index={3}>
								<Typography>Students List Content</Typography>
							</TabPanel>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
   };

export default CourseDetails;

// import React, { useEffect, useState } from "react";
// import {
// 	Tabs,
// 	Tab,
// 	Box,
// 	Card,
// 	CardContent,
// 	Typography,
// 	Avatar,
// } from "@mui/material";
// import { Divider, Button, TextField } from "@mui/material";
// import FolderIcon from "@mui/icons-material/Folder";
// import NoteIcon from "@mui/icons-material/Note";
// import AnnouncementIcon from "@mui/icons-material/Announcement";
// import PeopleIcon from "@mui/icons-material/People";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// import { Grid, useMediaQuery, useTheme } from "@mui/material";
// import Navbar from "./Navbar";

// import AssignmentIcon from '@mui/icons-material/Assignment';
// import EventAvailableIcon from "@mui/icons-material/EventAvailable";
// // import PeopleIcon from "@mui/icons-material/People";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

// const StyledCard = styled(Card)({
// 	border: "1px solid #e0e0e0",
// 	borderRadius: "10px",
// 	padding: "20px",
// 	marginBottom: "20px",
// 	boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
// });

// const convertTimestampToDate = (timestamp) => {
// 	const date = new Date(timestamp);
// 	const day = String(date.getDate()).padStart(2, "0");
// 	const month = String(date.getMonth() + 1).padStart(2, "0");
// 	const year = date.getFullYear();
// 	return `${day}/${month}/${year}`;
// };

// const token = "your_token_here";

// const TabPanel = (props) => {
// 	const { children, value, index, ...other } = props;
// 	return (
// 		<div
// 			role="tabpanel"
// 			hidden={value !== index}
// 			id={`tabpanel-${index}`}
// 			aria-labelledby={`tab-${index}`}
// 			{...other}
// 		>
// 			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
// 		</div>
// 	);
// };

// const CourseDetails2 = () => {
// 	const { coursecode } = useParams();
// 	const [value, setValue] = useState(0);
// 	const [ann, setAnn] = useState([]);
// 	const [labs, setLabs] = useState([]);
// 	const [selectedFile, setSelectedFile] = useState(null);
// 	const theme = useTheme();
// 	const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile view

// 	const handleFileChange = (event) => setSelectedFile(event.target.files[0]);
// 	const navigate = useNavigate();

// 	const handleChange = (event, newValue) => setValue(newValue);

//     const getAnn = async (courseCode) => {
// 			console.log("getann");
// 			// if (courseCode === "") return;
// 			// try {
// 			// 	const headers = {
// 			// 		"Content-Type": "application/json",
// 			// 		authorization: `Bearer ${token}`,
// 			// 	};

// 			// 	const results = await axios.get(
// 			// 		config.BACKEND_API + `/announcement/${courseCode}`,
// 			// 		{
// 			// 			headers,
// 			// 		}
// 			// 	);
// 			// 	// console.log(results.data);

// 			// 	setAnn((prev) => results.data);
// 			// } catch (err) {
// 			// 	console.log("error ->", err);
// 			// }
// 		};

// 		const getLabs = async (courseCode) => {
// 			// if (courseCode === "") return;
// 			// try {
// 			// 	const headers = {
// 			// 		"Content-Type": "application/json",
// 			// 		authorization: `Bearer ${token}`,
// 			// 	};

// 			// 	const results = await axios.get(
// 			// 		config.BACKEND_API + `/lab/${courseCode}`,
// 			// 		{
// 			// 			headers,
// 			// 		}
// 			// 	);
// 			// 	console.log("lab", results.data);

// 			// 	setLabs((prev) => results.data);
// 			// } catch (err) {
// 			// 	console.log("error ->", err);
// 			// }
// 			console.log("getlabs");
// 		};
// 	useEffect(() => {
// 		getAnn(coursecode);
// 		getLabs(coursecode);
// 	}, [coursecode]);

// 	const handleSubmit = async (id) => console.log("handlesubmit");

// 	return (
// 		<div>
// 			<Grid container>
// 				<Grid item md={3} xs={12} sm={12}>
// 					<Navbar />
// 				</Grid>

// 				<Grid item md={9} xs={12} sm={12} sx={{ position: "relative" }}>
// 					<Box sx={{ width: "100%" }}>
// 						<Tabs
// 							value={value}
// 							onChange={handleChange}
// 							variant={isMobile ? "scrollable" : "standard"}
// 							scrollButtons={isMobile ? "auto" : false}
// 							centered={!isMobile}
// 						>
// 							<Tab label="Lab" />
// 							<Tab label="Lecture Notes" />
// 							<Tab label="Announcements" />
// 							<Tab label="Attendance" />

// 							<Tab label="Students" />
// 						</Tabs>

// 						<TabPanel value={value} index={0}>
// 							{labs &&
// 								labs.map((lab, index) => (
// 									<Card key={index} sx={{ mb: 2 }}>
// 										<CardContent
// 											sx={{
// 												display: "flex",
// 												flexDirection: isMobile ? "column" : "row",
// 												justifyContent: "space-between",
// 											}}
// 										>
// 											<div>
// 												<Avatar>
// 													<FolderIcon />
// 												</Avatar>
// 												<Typography variant="h6">{lab.title}</Typography>
// 												<Typography variant="body2">
// 													Date: {convertTimestampToDate(lab.createdAt)}
// 												</Typography>
// 												<Typography variant="body2">
// 													{lab.description}
// 												</Typography>
// 												<Box mt={2} mb={2}>
// 													<Typography variant="body1">PDF File:</Typography>
// 													<Button
// 														variant="contained"
// 														href="#"
// 														target="_blank"
// 														sx={{ mt: 1 }}
// 													>
// 														Lab07-Wireshark TCP UDP.pdf
// 													</Button>
// 												</Box>
// 											</div>
// 											<Box sx={{ width: isMobile ? "100%" : "25%" }}>
// 												<StyledCard>
// 													<Typography variant="h6">Your Work</Typography>
// 													<Divider sx={{ mt: 1, mb: 2 }} />
// 													<input
// 														style={{ display: "none" }}
// 														id={`upload-file-${index}`}
// 														type="file"
// 														onChange={handleFileChange}
// 													/>
// 													<label htmlFor={`upload-file-${index}`}>
// 														<Button
// 															variant="outlined"
// 															component="span"
// 															fullWidth
// 															sx={{ mb: 2 }}
// 														>
// 															+ Add or Create
// 														</Button>
// 													</label>
// 													{selectedFile && (
// 														<Typography
// 															variant="body2"
// 															color="textSecondary"
// 															sx={{ mb: 2 }}
// 														>
// 															Selected file: {selectedFile.name}
// 														</Typography>
// 													)}
// 													<Button
// 														variant="contained"
// 														color="primary"
// 														fullWidth
// 														onClick={() => handleSubmit(lab._id)}
// 													>
// 														Mark as Done
// 													</Button>
// 												</StyledCard>
// 											</Box>
// 										</CardContent>
// 									</Card>
// 								))}
// 						</TabPanel>

// 						{/* Remaining TabPanels follow similar structure as above, adjusting for isMobile view */}
// 						{/* Lecture Notes Tab Content */}
// 						<TabPanel value={value} index={1}>
// 							{/* Other content */}
// 						</TabPanel>

// 						{/* Announcements Tab Content */}
// 						<TabPanel value={value} index={2}>
// 							{/* Other content */}
// 						</TabPanel>

// 						{/* Attendance Tab Content */}
// 						<TabPanel value={value} index={3}>
// 							{/* Other content */}
// 						</TabPanel>

// 						{/* Students Tab Content */}
// 						<TabPanel value={value} index={4}>
// 							<Typography>Students list here</Typography>
// 						</TabPanel>
// 					</Box>
// 				</Grid>
// 			</Grid>
// 		</div>
// 	);
// };

// export default CourseDetails2;
