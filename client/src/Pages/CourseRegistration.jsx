import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/CR.css'; // Add styles for the registration page
import CourseCard from '../Components/CourseRegistration/CourseCard'; // Import the CourseCard component
import CourseModal from '../Components/CourseRegistration/CourseModal'; // If you want to show modals for course details
import { Paper } from '@mui/material';


const ENDPOINT = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

const CourseRegistration = () => {
  const [formData, setFormData] = useState({
    // name: 'Aryan Solanki',
    // id: '202201239',
    // semester: '5'
  });
  const [studentCourses, setStudentCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [preferences, setPreferences] = useState(['', '', '', '', '']);
  const [allocationStatus, checkSelection] = useState(false);

  useEffect(() => {
    const sid = JSON.parse(localStorage.getItem("userInfo")).SID; // Replace with your actual logic for retrieving the student ID
    if (sid) {
      const fetchStudentInfo = async () => {
        try {
          const response = await axios.get(`${ENDPOINT}/api/user/course_registration?sid=${sid}`);
          const { studentInfo, courses, allocationStatus} = response.data;
          setFormData(studentInfo);
          setStudentCourses(courses);
          checkSelection(allocationStatus);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching student info:', error);
        }
      };

      fetchStudentInfo();
    }
  }, []);

  const handleCourseClick = (course) => setSelectedCourse(course);
  const handleModalClose = () => setSelectedCourse(null);

  const handlePreferenceChange = (index, courseId) => {
    const newPreferences = [...preferences];
    newPreferences[index] = courseId;
    setPreferences(newPreferences);
  };

  const handleReset = () => setPreferences(['', '', '', '', '']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (preferences.some((course) => course === '')) {
      alert('Please select all 5 preferences before submitting.');
      return;
    }

    const confirmation = window.confirm('Are you sure you want to submit the form?');
    if (confirmation) {
      try {
        const response = await axios.post(`${ENDPOINT}/api/user/course_registration`, {
          studentId: formData.sid,
          name: formData.sid,
          semester: formData.year,
          courses: preferences
        });

        if (response.status === 200) {
          alert('Preferences submitted successfully!');
        }
      } catch (error) {
        console.error('Error during course registration:', error);
        alert('Failed to register courses. Please try again.');
      }
    }
  };

  return (
    <div className="course-container">
      <div className="header-section">
        <h1 className="course-registration-title">Course Registration</h1>
        <div className="student-info">
          <div className="info-item">
            <span className="info-label">Student Name:</span>
            <span className="info-value">{formData.sid}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Student ID:</span>
            <span className="info-value">{formData.sid}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Semester:</span>
            <span className="info-value">{formData.year}</span>
          </div>
        </div>
      </div>

      <div className="courses-grid">
        
        {studentCourses.map((course) => (
          <CourseCard
            key={course.course_code}
            course={course}
            onClick={handleCourseClick}
            isSelected={preferences.includes(course.course_code)}
          />
        ))}
      </div>
      <Paper>
      <form className="course-selection-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {preferences.map((_, index) => (
            <div key={index} id="form-group">
              <label htmlFor={`preference${index + 1}`}>Preference {index + 1}</label>
              <select
                id={`preference${index + 1}`}
                value={preferences[index]}
                onChange={(e) => handlePreferenceChange(index, e.target.value)}
              >
                <option value="">-- Select a Course --</option>
                {studentCourses.map((course) => (
                  <option
                    key={course.course_code}
                    value={course.course_code}
                    disabled={preferences.includes(course.course_code) && preferences[index] !== course.course_code}
                  >
                    {course.course_name}
                    {course.course_name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="form-actions">
        {
          allocationStatus && (
            <>
              <button
                type="submit"
                className="btn-submit"
                disabled={!allocationStatus} // Button is disabled if allocationStatus is false
              >
                Submit Registration
              </button>
              <button
                type="button"
                className="btn-reset"
                onClick={handleReset}
                disabled={!allocationStatus} // Reset button is also disabled if allocationStatus is false
              >
                Reset Selection
              </button>
            </>
          )
        }

        </div>
      </form>
      </Paper>
      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default CourseRegistration;
