import React, { useState } from 'react';
import axios from 'axios';

const ENDPOINT = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
const AdminDash = () => {
  const cookiesid = JSON.parse(localStorage.getItem('userInfo'));
  
  const [selectedBatch, setSelectedBatch] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [courseData, setCourseData] = useState(null);

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
    setIsButtonEnabled(true);
  };

  const handleStartClick = () => {
    axios.get(`${ENDPOINT}/api/admin/start-course-allocation?batch=${selectedBatch}`)
      .then(response => {
    console.log(cookiesid);
        // handle success
        console.log(response.data);
      })
      .catch(error => {
        // handle error
        console.error(error);
      });
  };

  const handleDistributeClick = () => {
    axios.post(`${ENDPOINT}/api/admin/allocate-courses`)
      .then(response => {
        console.log(response.data);
        setCourseData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleApproveClick = () => {
    axios.post(`${ENDPOINT}/api/admin/approve-course-allotment`, courseData.allocations)
      .then(response => {
        console.log(response.data);
        setCourseData(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const currentYear = new Date().getFullYear();
  const lastFourYears = Array.from({ length: 4 }, (_, i) => currentYear - i);

  return (
    <div>
        <h1>Admin Dashboard</h1>
      <select value={selectedBatch} onChange={handleBatchChange}>
        <option value="" disabled>Select Batch</option>
        {lastFourYears.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <button onClick={handleStartClick} disabled={!isButtonEnabled}>Start</button>
      <button onClick={handleDistributeClick}>Distribute Courses</button>
      {courseData && (
        <div>
          <p>{courseData.allocations.Student_1}</p>
          <button onClick={handleApproveClick}>Approve</button>
        </div>
      )}
    </div>
  );
};

export default AdminDash;
