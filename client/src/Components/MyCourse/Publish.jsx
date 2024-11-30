import React, { useState } from "react";
import {
	TextField,
	Button,
	Box,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	IconButton,
	Chip,
	Stack,
} from "@mui/material";
import {
	AttachFile as AttachFileIcon,
	Close as CloseIcon,
	Announcement as AnnouncementIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import useAPI from "../../hooks/api";
import { CircularProgress } from "@mui/material";

const AnnouncementForm = ({ addAnnouncement, handleClose }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("General");
	const [attachedFiles, setAttachedFiles] = useState([]);

	const { POST } = useAPI();

	const [attachedLinks, setAttachedLinks] = useState([]);
	const [link, setLink] = useState("");

	const [date, setDate] = useState("");
	const [time, setTime] = useState("");

	const handleDateChange_ = (e) => {
		setDate(e.target.value);
	};

	const handleTimeChange = (e) => {
		let inputTime = e.target.value;
		if (inputTime) {
			// Convert to 12-hour format
			const [hours, minutes] = inputTime.split(":");
			let period = "AM";
			let formattedHours = parseInt(hours, 10);

			if (formattedHours >= 12) {
				period = "PM";
				if (formattedHours > 12) {
					formattedHours -= 12;
				}
			} else if (formattedHours === 0) {
				formattedHours = 12;
			}

			setTime(`${formattedHours}:${minutes} ${period}`);
		}
	};

	const handleAddLink = () => {
		if (link.trim() !== "") {
			setAttachedLinks([...attachedLinks, link]);
			setLink(""); // Clear the input after submission
		}
	};
	const handleLinkRemove = (linkToRemove) => {
		setAttachedLinks(attachedLinks.filter((link) => link !== linkToRemove));
	};
	const [dueDate, setDueDate] = useState(null);
	const handleDateChange = (newDate) => {
		setDueDate(newDate);
	};
	
	const [isAdding, setIsAdding] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsAdding(true);
		try {
			const announcement = {
				ID: "P001",
				// ID: JSON.parse(localStorage.getItem("userInfo")).SID,
				link,
				title,
				description: content,
				due_time: date + " " + time,
			};

			const CourseId = 1;

			const results = await POST(
				`/api/user/dashboard/mycourses/${CourseId}/lab/assignment`,
				announcement
			);

			console.log("results---->", results);
		} catch (error) {
			console.log(error);
		} finally {
			setIsAdding(false);
			handleClose();
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			mb={3}
			sx={{
				backgroundColor: "#ffffff",
				padding: "20px",
				borderRadius: "12px",
				boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
				border: "1px solid #e0e0e0",
				maxWidth: "600px",
				margin: "0 auto",
				position: "relative",
			}}
		>
			{/* Close Button */}
			<IconButton
				onClick={handleClose}
				sx={{ position: "absolute", top: "10px", right: "10px" }}
			>
				<CloseIcon />
			</IconButton>

			<div
				style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
			>
				<AnnouncementIcon style={{ color: "#1976d2", marginRight: "8px" }} />
				<h2 style={{ margin: 0, color: "#1976d2", fontSize: "24px" }}>
					Create an Announcement
				</h2>
			</div>
			<TextField
				label="Title"
				variant="outlined"
				fullWidth
				margin="dense"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<TextField
				label="Content"
				variant="outlined"
				fullWidth
				multiline
				rows={3}
				margin="dense"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<FormControl variant="outlined" fullWidth margin="dense">
				<InputLabel>Category</InputLabel>
				<Select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					label="Category"
				>
					<MenuItem value="Lab">Lab</MenuItem>
					<MenuItem value="Exam">Class Note</MenuItem>
					<MenuItem value="Assignment">Assignment</MenuItem>
				</Select>
			</FormControl>
			{category === "Lab" ? (
				<div>
					<label htmlFor="calendar">Select a date:</label>
					<input
						type="date"
						id="calendar"
						name="calendar"
						value={date}
						onChange={handleDateChange_}
					/>
					<label htmlFor="time">Select a time:</label>
					<input
						type="time"
						id="time"
						name="time"
						value={time}
						onChange={handleTimeChange}
					/>
					<div>
						<p>Selected Date: {date}</p>
						<p>Selected Time: {time}</p>
					</div>
				</div>
			) : null}

			<TextField
				label="Paste URL"
				variant="outlined"
				fullWidth
				margin="dense"
				value={link}
				onChange={(e) => setLink(e.target.value)}
			/>
			<Button
				onClick={handleAddLink}
				variant="outlined"
				color="primary"
				sx={{
					marginTop: "10px",
					borderColor: "#1976d2",
					color: "#1976d2",
					"&:hover": {
						backgroundColor: "#f0f4ff",
						borderColor: "#1565c0",
					},
				}}
			>
				Add Link
			</Button>

			{/* Display Attached Files */}
			<Stack direction="column" spacing={1} sx={{ marginTop: "10px" }}>
				{attachedLinks.map((link, index) => (
					<Chip
						key={index}
						label={link}
						onDelete={() => handleLinkRemove(link)}
						color="primary"
						variant="outlined"
					/>
				))}
			</Stack>

			<Button
				onClick={handleSubmit}
				type="submit"
				variant="contained"
				color="primary"
				fullWidth
				sx={{
					marginTop: "20px",
					padding: "10px 0",
					fontSize: "16px",
					backgroundColor: "#1976d2",
					"&:hover": {
						backgroundColor: "#1565c0",
					},
				}}
			>
				Add Announcement{" "}
				{isAdding ? (
					<CircularProgress size={20} sx={{ color: "black" }} />
				) : null}
			</Button>
		</Box>
	);
};

export default AnnouncementForm;
