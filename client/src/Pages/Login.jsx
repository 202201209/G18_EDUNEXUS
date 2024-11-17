import * as React from "react";
import { useState, useEffect } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import StudentLogin from "../Images/student_login.png";
import FacultyLogin from "../Images/faculty.png";
import AdminLogin from "../Images/admin.png"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CarouselBack from "../Components/Login/Carousel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useContextState } from "../context/context";
import { toast } from "react-toastify"; // Import toast 
import { Today } from "@mui/icons-material";
import config from "../config";






const ENDPOINT = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
console.log(ENDPOINT);
const defaultTheme = createTheme();
const UserRole = {
  STUDENT: "student",
  FACULTY: "faculty",
  ADMIN: "admin"
};

export default function Login() {
  const navigate = useNavigate();
  const [capVal, setcapVal] = useState(null);
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(UserRole.STUDENT);
  
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      navigate('/');
    } else {
      roleCheck(userInfo);
    }
  }, [navigate]);

  const roleCheck = async (userInfo) => {
    console.log("Current User Role:", currentUser);
    try {
      const response = await axios.post(
        `${ENDPOINT}/api/user/authRole`,
        {
          SID: userInfo.SID,
          role: userInfo.role
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }
      );
      // console.log(response.data);
      if (response.data.success) {
        toast.success("Login Successful", response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        if (response.data.role === "student") {
          navigate("/dashboard");
        } else if (response.data.role === "faculty") {
          navigate("/profdashboard");
        } else if (response.data.role === "admin") {
          navigate("/admindashboard");
        }
      }
    } catch (error) {
      toast.error( error.response.data);
      navigate('/'); // Redirect to login on error
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Current User Role:", currentUser);
    localStorage.removeItem("userinfo");
    try {
      // Send login request to the server
      const response = await axios.post(`${ENDPOINT}/api/user/login`, {
        SID: userid,
        password: password,
        role: currentUser,
      });
  
      // Check if login was successful
      if (response.data.success) {
        // Store user info in local storage
        localStorage.setItem("userInfo", JSON.stringify(response.data));
  
        // Display success toast
        toast.success("Login Successful");
  
        // Navigate to the appropriate dashboard
        if (currentUser === UserRole.STUDENT) {
          navigate("/dashboard");
        } else if (currentUser === UserRole.FACULTY) {
          navigate("/profdashboard");
        } else if (currentUser === UserRole.ADMIN) {
          navigate("/admindashboard");
        }
      }
    } catch (error) {
      // Display error toast if login fails
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    // localStorage.removeItem("_grecaptcha");

    navigate('/');

  }

  const handleStudentLogin = () => {
    setCurrentUser(UserRole.STUDENT);
  };

  const handleFacultyLogin = () => {
    setCurrentUser(UserRole.FACULTY);
  };
  const handleAdminLogin = () => {
    setCurrentUser(UserRole.ADMIN);
  }

  // Define a border style for the selected avatar
  const avatarStyle = (role) => ({
    boxShadow: currentUser === role ? "5px 3px 10px black" : "none",
    cursor: "pointer",
  });
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const handlePassword = (event) => {
    const inputPassword = event.target.value; // Extract the input value
    setPassword(inputPassword); // Update state

    // if (passwordRegex.test(inputPassword)) {
    //   toast.success('Password is valid'); // Show success toast
    //   return true;
    // } else {
    //   toast.error("Password is invalid"); // Show error toast
    //   return false;
    // }
  };


  return (
    <div className="my-glass-effect" >
      {/* <CarouselBack /> */}
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
          <CssBaseline />
          <Box
            style={{
              // backgroundColor: "#f5f7f7",
              boxShadow: "0px 0px 8px  black",

              background: "transparent",

            }}
            sx={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderRadius: "2em",
              padding: "3em",
              height: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                sx={{ mr: 4, width: 56, height: 56 }}
                style={{ backgroundColor: "#25396F", ...avatarStyle(UserRole.STUDENT) }} // Apply border style
                src={StudentLogin}
                onClick={handleStudentLogin}
              />
              <Avatar
                sx={{ mr: 4, ml: 4, width: 56, height: 56 }}
                style={{ backgroundColor: "#25396F", ...avatarStyle(UserRole.FACULTY) }} // Apply border style
                src={FacultyLogin}
                onClick={handleFacultyLogin}
              />
              <Avatar
                sx={{ ml: 4, width: 56, height: 56 }}
                style={{ backgroundColor: "#25396F", ...avatarStyle(UserRole.ADMIN) }} // Apply border style
                src={AdminLogin}
                onClick={handleAdminLogin}
              />
            </Box>

            <Typography
              component="h1"
              variant="h5"
              sx={{ fontFamily: "Quicksand", fontWeight: "bold", m: 3 }}
            >
              Login in As {currentUser}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                id="filled-basic"
                variant="standard"
                margin="normal"
                required
                fullWidth
                label="User Id "
                name="userid"
                autoFocus
                value={userid}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                InputProps={{
                  style: {
                    fontFamily: "Quicksand",
                    fontWeight: "bold",
                    color: "#25396F",
                    // backgroundColor: "white",
                  },
                }}
                autoComplete="off"
              />
              <TextField
                id="filled-basic"
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handlePassword} 
                value={password}
                autoComplete="off"
              />

              {/* <ReCAPTCHA
                sitekey={config.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={(val) => setcapVal(val)}
              /> */}
              <Button
                type="submit"
                fullWidth
                // disabled={!capVal}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  fontFamily: "Quicksand",
                  fontWeight: "bold",
                  backgroundColor: "#25396F",

                }}

              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}