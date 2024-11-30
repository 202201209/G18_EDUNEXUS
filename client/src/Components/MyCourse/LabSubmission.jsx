import React, { useState } from "react";
import {
	Box,
	Container,
	Paper,
	Typography,
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	Divider,
	Link,
	IconButton,
	Chip,
} from "@mui/material";
import {
	Download as DownloadIcon,
	// AttachFile as AttachFileIcon,
	DateRange as DateRangeIcon,
	Send as SendIcon,
	Info as InfoIcon,
	Comment as CommentIcon,
	Done as DoneIcon,
} from "@mui/icons-material";
import useAPI from "../../hooks/api";
import { CircularProgress } from "@mui/material";
const LabDetails = (props) => {
	const [submissionLink, setSubmissionLink] = useState("");
	const [comments, setComments] = useState("");
	const [recentSubmissions, setRecentSubmissions] = useState([]);
	const [commentsList, setCommentsList] = useState([]);
	const [isAdding, setIsAdding] = useState(false);

	const dueDate = "2024-12-15"; // Example due date

	const { POST } = useAPI();
	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsAdding(true);
		try {
			const submission = {
				// ID: "S001",
				ID: JSON.parse(localStorage.getItem("userInfo")).SID,
				link: submissionLink,
			};

			const CourseId = 1;
			const LabId = 14;//increase every time a new lab is added

			const results = await POST(
				`/api/user/dashboard/mycourses/${CourseId}/lab/${LabId}/submission`,
				submission
			);

			console.log("results---->", results);
		} catch (error) {
			console.log(error);
		} finally {
			setIsAdding(false);
			// handleClose();
		}
	};

	const handleCommentSubmit = () => {
		if (comments) {
			setCommentsList([...commentsList, comments]);
			setComments("");
		}
	};

	return (
		<Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
			<Paper elevation={3} sx={{ p: 4 }}>
				{/* Lab Overview Section */}
				<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
					<InfoIcon color="primary" sx={{ mr: 1 }} />
					<Typography variant="h4">Lab Title</Typography>
				</Box>
				<Typography variant="body1" paragraph>
					This lab focuses on advanced React component development, with an
					emphasis on real-world scenarios. You will learn how to create
					complex, responsive UI layouts using Material-UI and CSS.
				</Typography>

				{/* Due Date */}
				<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
					<DateRangeIcon color="action" sx={{ mr: 1 }} />
					<Typography variant="body2" color="textSecondary">
						<strong>Due Date:</strong> {dueDate}
					</Typography>
				</Box>

				{/* Resources */}
				<Typography variant="h6" gutterBottom>
					Resources
				</Typography>
				<List>
					<ListItem>
						<ListItemText
							primary="Lab PDF"
							secondary={
								<Link href="https://example.com/lab.pdf" target="_blank">
									Download Lab PDF
								</Link>
							}
						/>
						<IconButton href="https://example.com/lab.pdf" target="_blank">
							<DownloadIcon />
						</IconButton>
					</ListItem>
					{/* <ListItem>
						<ListItemText	
							primary="Supporting Materials"
							secondary={
								<Link href="https://example.com/resources.zip" target="_blank">
									Download Resources
								</Link>
							}
						/>
						<IconButton
							href="https://example.com/resources.zip"
							target="_blank"
						>
							<AttachFileIcon />
						</IconButton>
					</ListItem> */}
				</List>

				<Divider sx={{ my: 3 }} />

				{/* Submission Section */}
				<Typography variant="h6" gutterBottom>
					Submission
				</Typography>
				<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
					<TextField
						fullWidth
						variant="outlined"
						label="Google Drive Link for Submission"
						value={submissionLink}
						onChange={(e) => setSubmissionLink(e.target.value)}
						sx={{ mr: 2 }}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						endIcon={<SendIcon />}
					>
						Submit{" "}
						{isAdding ? (
							<CircularProgress size={20} sx={{ color: "black" }} />
						) : null}
					</Button>
				</Box>

				{/* Recent Submissions Section */}
				<Typography variant="h6" gutterBottom>
					Recent Submissions
				</Typography>
				<List>
					{recentSubmissions.map((link, index) => (
						<ListItem key={index}>
							<ListItemText
								primary={`Submission ${index + 1}`}
								secondary={
									<Link href={link} target="_blank">
										{link}
									</Link>
								}
							/>
							<Chip icon={<DoneIcon />} label="Submitted" color="success" />
						</ListItem>
					))}
				</List>
			</Paper>
		</Container>
	);
};

export default LabDetails;
