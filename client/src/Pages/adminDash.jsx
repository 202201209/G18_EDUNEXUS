import React, { useState } from 'react';
import axios from 'axios';
import dummy from '../../src/Components/Helper/admindata.json';
import '../CSS/adminDash.css';

const dummydata = dummy;
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
    axios
      .get(`${ENDPOINT}/api/admin/start-course-allocation?batch=${selectedBatch}`)
      .then((response) => {
        console.log(cookiesid);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDistributeClick = () => {
    axios
      .post(`${ENDPOINT}/api/admin/allocate-courses`)
      .then((response) => {
        console.log(response.data);
        setCourseData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleApproveClick = () => {
    if (!courseData || !courseData.allocations) return;

    axios
      .post(`${ENDPOINT}/api/admin/approve-course-allotment`, courseData.allocations)
      .then((response) => {
        console.log(response.data);
        setCourseData(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const currentYear = new Date().getFullYear();
  const lastFourYears = Array.from({ length: 4 }, (_, i) => currentYear - i);

  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="semester-selection">
        <label htmlFor="batch-select">Select Batch:</label>
        <select
          id="batch-select"
          value={selectedBatch}
          onChange={handleBatchChange}
        >
          <option value="" disabled>
            Select Batch
          </option>
          {lastFourYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="registration-actions">
        <button
          className="btn-start-registration"
          onClick={handleStartClick}
          disabled={!isButtonEnabled}
        >
          Start
        </button>
        <button
          className="btn-start-registration"
          onClick={handleDistributeClick}
        >
          Distribute Courses
        </button>
        
      </div>

      <div className="student-data-section">
        <h2>Allocations and Scores</h2>
        <table className="student-data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Courses</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(dummydata.allocations).map(([student, courses]) => (
              <tr key={student}>
                <td>{student}</td>
                <td>{courses.join(', ')}</td>
                <td>{dummydata.scores[student] || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
          className="btn-approve-registration"
          onClick={handleApproveClick}
        >
          Approve
        </button>
    </div>
  );
};

export default AdminDash;
