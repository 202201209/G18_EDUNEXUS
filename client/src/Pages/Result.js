import React, { useState } from 'react';
import '../CSS/Result.css';

const Result = () => {
    const [studentDetails] = useState({
        name: '',
        studentId: '',
        program: '',
        semester: '',
    });

    const [gradeDetails] = useState([
        { courseTitle: 'Course 1', courseCode: '', creditHours: '', grade: '', gradePoints: '' },
        { courseTitle: 'Course 2', courseCode: '', creditHours: '', grade: '', gradePoints: '' },
        { courseTitle: 'Course 3', courseCode: '', creditHours: '', grade: '', gradePoints: '' },
        { courseTitle: 'Course 4', courseCode: '', creditHours: '', grade: '', gradePoints: '' },
        { courseTitle: 'Course 5', courseCode: '', creditHours: '', grade: '', gradePoints: '' },
        { courseTitle: 'Course 6', courseCode: '', creditHours: '', grade: '', gradePoints: '' },
    ]);

    const [performanceSummary] = useState({
        creditsRegistered: '',
        creditsEarned: '',
        gradePointsEarned: '',
        spi: '',
        cumulativeCreditsRegistered: '',
        cpi: '',
    });

    return (
        <div className="card">
            <h2>Student Report Card</h2>

            {/* Student Details Table */}
            <table className="details-table">
                <tbody>
                    <tr>
                        <td><strong>Name:</strong></td>
                        <td>{studentDetails.name}</td>
                        <td><strong>Student ID:</strong></td>
                        <td>{studentDetails.studentId}</td>
                    </tr>
                    <tr>
                        <td><strong>Program:</strong></td>
                        <td>{studentDetails.program}</td>
                        <td><strong>Semester:</strong></td>
                        <td>{studentDetails.semester}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Grade Details</h3>

            {/* Grade Details Table */}
            <table className="grade-table">
                <thead>
                    <tr>
                        <th>Course Title</th>
                        <th>Course Code</th>
                        <th>Credit Hours</th>
                        <th>Grade</th>
                        <th>Grade Points</th>
                    </tr>
                </thead>
                <tbody>
                    {gradeDetails.map((course, index) => (
                        <tr key={index}>
                            <td>{course.courseTitle}</td>
                            <td>{course.courseCode}</td>
                            <td>{course.creditHours}</td>
                            <td>{course.grade}</td>
                            <td>{course.gradePoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Performance Summary</h3>

            {/* Performance Summary Table */}
            <table className="performance-table">
                <tbody>
                    <tr>
                        <td><strong>Credits Registered:</strong></td>
                        <td>{performanceSummary.creditsRegistered}</td>
                        <td><strong>Credits Earned:</strong></td>
                        <td>{performanceSummary.creditsEarned}</td>
                    </tr>
                    <tr>
                        <td><strong>Grade Points Earned:</strong></td>
                        <td>{performanceSummary.gradePointsEarned}</td>
                        <td><strong>SPI:</strong></td>
                        <td>{performanceSummary.spi}</td>
                    </tr>
                    <tr>
                        <td><strong>Cumulative Credits Registered:</strong></td>
                        <td>{performanceSummary.cumulativeCreditsRegistered}</td>
                        <td><strong>CPI:</strong></td>
                        <td>{performanceSummary.cpi}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Result;
