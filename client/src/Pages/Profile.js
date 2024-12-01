import React, { useState } from 'react';
import '../CSS/Profile.css';
import logo from '../Images/profile_logo.png';
import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { any } from 'prop-types';
import { toast, ToastContainer } from "react-toastify";


const ENDPOINT = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
const Profile = () => {
    const SID = JSON.parse(localStorage.getItem("userInfo")).SID;
    const Api = `${ENDPOINT}/api/user/viewprofile?SID=${SID}`;
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        studentId: "",
        Studentname: "",
        fatherName: "",
        motherName: "",
        dob: "",
        nationality: "",
        gender: "",
        personalEmail: "",
        instituteEmail: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        program: "",
        Year: "",
        AddmissionThrough: "",
        AddmissionRank: "",
    });
    const fetchApiData = async () => {
        const SID = JSON.parse(localStorage.getItem("userInfo")).SID;
        const role = JSON.parse(localStorage.getItem("userInfo")).role;
        console.log(SID);
        console.log(role);
        try {

            const response = await axios.get(Api);
            const data = response.data;
            console.log(data);
            setFormData({
                studentId: SID,
                Studentname: data.Sname || "",
                fatherName: data.Fname || "",
                motherName: data.Mname || "",
                dob: data.Bdate || "",
                nationality: data.nationality || "",
                gender: data.gender || "",
                personalEmail: data.EmailId || "",
                instituteEmail: data.acadEmailID || "",
                phone: data.Emergency_no || "",
                address: data.Addr_street || "",
                city: data.Addr_city || "",
                state: data.Addr_state || "",
                zip: data.zipcode || "",
                program: data.program || "",
                Year: data.year || "",
                AddmissionThrough: data.admission_through || "",
                AddmissionRank: data.admission_rank || "",

            });
        } catch (e) {
            setError(e);
            console.log(error);
        }
    }


    useEffect(() => {
        fetchApiData();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateFields = () => {
        const errors = {};
        const nameRegex = /^[a-zA-Z\s-]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,15}$/;
        const zipRegex = /^\d{5,10}$/;
      
        // Student Name Validation
        if (!formData.Studentname || !formData.Studentname.trim()) {
          errors.Studentname = "Student Name cannot be empty or spaces only.";
        } else if (!nameRegex.test(formData.Studentname.trim())) {
          errors.Studentname = "Invalid name. Only alphabets, spaces, and hyphens are allowed.";
        }
      
        // Father's Name Validation
        if (!formData.fatherName || !formData.fatherName.trim()) {
          errors.fatherName = "Father's Name cannot be empty or spaces only.";
        } else if (!nameRegex.test(formData.fatherName.trim())) {
          errors.fatherName = "Invalid father's name. Only alphabets, spaces, and hyphens are allowed.";
        }
      
        // Mother's Name Validation
        if (!formData.motherName || !formData.motherName.trim()) {
          errors.motherName = "Mother's Name cannot be empty or spaces only.";
        } else if (!nameRegex.test(formData.motherName.trim())) {
          errors.motherName = "Invalid mother's name. Only alphabets, spaces, and hyphens are allowed.";
        }
      
        // Personal Email Validation
        if (!formData.personalEmail || !formData.personalEmail.trim()) {
          errors.personalEmail = "Personal Email cannot be empty or spaces only.";
        } else if (!emailRegex.test(formData.personalEmail.trim())) {
          errors.personalEmail = "Invalid email format.";
        }
      
        // Phone Number Validation
        if (!formData.phone || !formData.phone.trim()) {
          errors.phone = "Phone number cannot be empty or spaces only.";
        } else if (!phoneRegex.test(formData.phone.trim())) {
          errors.phone = "Invalid phone number. Must contain 10 to 15 digits.";
        }
      
        // Address Validation
        if (!formData.address || !formData.address.trim()) {
          errors.address = "Address cannot be empty or spaces only.";
        } else if (formData.address.trim().length < 5) {
          errors.address = "Address must be at least 5 characters long.";
        }
      
        // City Validation
        if (!formData.city || !formData.city.trim()) {
          errors.city = "City cannot be empty or spaces only.";
        } else if (!nameRegex.test(formData.city.trim())) {
          errors.city = "Invalid city name. Only alphabets, spaces, and hyphens are allowed.";
        }
      
        // State Validation
        if (!formData.state || !formData.state.trim()) {
          errors.state = "State cannot be empty or spaces only.";
        } else if (!nameRegex.test(formData.state.trim())) {
          errors.state = "Invalid state name. Only alphabets, spaces, and hyphens are allowed.";
        }
      
        // Zip Code Validation
        if (!formData.zip || !formData.zip.trim()) {
          errors.zip = "Zip Code cannot be empty or spaces only.";
        } else if (!zipRegex.test(formData.zip.trim())) {
          errors.zip = "Invalid zip code. Must be between 5 and 10 digits.";
        }
      
        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Returns true if no errors
      };


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh
        // console.log("Form data:", formData);

        if (!validateFields()) {
            toast.error("Please fix the errors in the form.");
            return;
          }

        try {
            const response = await axios.put(`${ENDPOINT}/api/user/editprofile`, {
                studentId: formData.studentId,
                Sname: formData.Studentname,
                Fname: formData.fatherName,
                Mname: formData.motherName,
                personalEmail: formData.personalEmail,
                Emergency_no: formData.phone,
                Addr_street: formData.address,
                Addr_city: formData.city,
                Addr_state: formData.state,
                Zipcode: formData.zip,

            }

            );

            console.log(response.data);

            if (response.data.message === "OK") {
                toast.success("Profile updated successfully!", response.data);
            }else {
            toast.error("Profile update failed!");
            }
            } catch (error) {
              console.error("Error during POST request:", error);
              toast.error("An error occurred while updating the profile.");
            }

            
    };

    return (
        <div id="container">
            <div id="header">
                <img src={logo} alt="University Logo" />
            </div>
            <form id="profile" onSubmit={handleSubmit}>
                <h2 id="h2">Student Profile</h2>

                {/* Personal Information */}
                <fieldset>
                    <legend id="personal">Personal Information</legend>
                    <div id="form-row">
                        <TextField
                            label="Student ID"
                            name="studentId"
                            value={formData.studentId}
                            fullWidth
                            disabled
                            data-testid="student-id"
                        />
                    </div>

                    <div id="form-row">
                        <TextField
                            label="Student Name"
                            name="Studentname" // matches formData key
                            value={formData.Studentname}
                            onChange={handleChange}
                            fullWidth
                            data-testid="student-name"
                            error={!!formErrors.Studentname}
                            helperText={formErrors.Studentname}
                        />
                    </div>

                    <div id="form-row">
                        <TextField
                            label="Father's Name"
                            variant="standard"
                            name="fatherName" // matches formData key
                            value={formData.fatherName}
                            onChange={handleChange}
                            fullWidth
                            error={!!formErrors.fatherName}
                            helperText={formErrors.fatherName}
                        />
                    </div>

                    <div id="form-row">
                        <TextField
                            label="Mother's Name"
                            variant="standard"
                            name="motherName" // matches formData key
                            value={formData.motherName}
                            onChange={handleChange}
                            fullWidth
                            error={!!formErrors.motherName}
                            helperText={formErrors.motherName}
                        />
                    </div>

                    <div id="form-row">
                        <div id="form-group">
                        <TextField
                            label="nationality"
                            variant="standard"
                            name="nationality"
                            value={formData.nationality}
                            fullWidth
                            disabled
                            />
                        </div>
                    </div>

                    <div id="form-group">
                    <label>gender</label>
                    <div id="radio-button-group">
                        <label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="Female" 
                                // onChange={handleChange} 
                                checked={formData.gender === 'Female'} 
                                disabled 
                            /> 
                            Female
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="Male" 
                                onChange={handleChange} 
                                checked={formData.gender === 'Male'} 
                                disabled 
                            /> 
                            Male
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="Other" 
                                onChange={handleChange} 
                                checked={formData.gender === 'Other'} 
                                disabled 
                            /> 
                            Other
                        </label>
                    </div>
                </div>

                </fieldset>

                {/* Contact Information */}
                <fieldset>
                    <legend id="contact">Contact Information</legend>
                    <div id="form-row">
                        <div id="form-group">
                        <TextField
                            label="personalEmail"
                            variant="standard"
                            name="personalEmail"
                            value={formData.personalEmail}
                            onChange={handleChange}
                            fullWidth
                            error={!!formErrors.personalEmail}
                            helperText={formErrors.personalEmail}
                            />
                        </div>
                        <div id="form-group">
                        <TextField
                            label="instituteEmail"
                            variant="standard"
                            name="instituteemail"
                            value={formData.instituteEmail}
                            fullWidth
                            disabled
                            />
                        </div>
                    </div>

                    <div id="form-row">
                        <div id="form-group">
                        <TextField
                            label="emergency_no"
                            variant="standard"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            error={!!formErrors.phone}
                            helperText={formErrors.phone}
                            />
                        </div>
                    </div>

                    <div id="form-row">
                    <div id="form-group">
                        <TextField
                            label="addr_street"
                            variant="standard"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                            error={!!formErrors.address}
                            helperText={formErrors.address}
                            />
                    </div>
                    <div id="form-group">
                    <TextField
                        label="addr_city"
                        variant="standard"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        fullWidth
                        error={!!formErrors.city}
                        helperText={formErrors.city}
                        />
                    </div>
                        
                    </div>

                    <div id="form-row">
                    <div id="form-group">
                        <TextField
                            label="addr_state"
                            variant="standard"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            fullWidth
                            error={!!formErrors.state}
                            helperText={formErrors.state}
                            />
                        </div>
                    <div id="form-group">
                    <TextField
                        label="zipcode"
                        variant="standard"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        fullWidth
                        error={!!formErrors.zip}
                        helperText={formErrors.zip}
                        />
                    </div>
                    </div>
                </fieldset>

                {/* Enrollment Details */}
                <fieldset>
                    <legend id="enrollment">Enrollment Details</legend>
                    <div id="form-row">
                       
                    <div id="form-group">
                            <TextField
                                label="Program of Study"
                                variant="standard"
                                name="Program of Study"
                                value={formData.program}
                                onChange={handleChange}
                                disabled
                                fullWidth />

                    </div>
                    <div id="form-group">
                            <TextField
                                label="year"
                                variant="standard"
                                name="year"
                                value={formData.Year}
                                disabled
                                fullWidth
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Admission Details */}
                <fieldset>
                    <legend id="adm-info">Admission Information</legend>
                    <div id="form-row">
                        <div id="form-group">
                        <TextField
                            label="admission_through"
                            variant="standard"
                            name="admissionthrough"
                            value={formData.AddmissionThrough}
                            fullWidth
                            disabled //non editable
                            />
                        </div>
                        <div id="form-group">
                        <TextField
                            label="admission_rank"
                            variant="standard"
                            name="admissionrank"
                            value={formData.AddmissionRank}
                            onChange={handleChange}
                            fullWidth
                            disabled //non editable
                            />
                        </div>
                    </div>
                </fieldset>

                <button id="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Profile;