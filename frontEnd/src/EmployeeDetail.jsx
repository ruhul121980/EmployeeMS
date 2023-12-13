import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false); // State to manage table visibility

  useEffect(() => {
    axios.get(`http://localhost:8081/get/${id}`)
      .then(res => setEmployee(res.data.Result[0]))
      .catch(err => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        navigate('/start');
      })
      .catch(err => console.log(err));
  };

  const handleHistory = () => {
    axios.get(`http://localhost:8081/getLeaveHistory/${id}`)
      .then(res => {
        if (res.data.Status === 'Success') {
          setData(res.data.Result);
          setShowTable(true); // Show the table when data is available
        } else {
          alert('error');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='empInfo'>
      <h1 className="centered-heading">Employee Information</h1>
      <div className='d-flex justify-content-right flex-column align-items-center mt-3'>
        <img src={`http://localhost:8081/images/${employee.image}`} alt="" className='empImg' />
        <div className='d-flex align-items-right flex-column mt-5'>
          <h1>Name: {employee.name}</h1>
          <h1>Id: {employee.id}</h1>
          <h1>Email: {employee.email}</h1>
          <h1>Salary: {employee.salary}</h1>
        </div>
       
        <div className='d-flex justify-content-right flex-column align-items-left mt-3'></div>
        <div className='d-flex justify-content-left flex-column align-items-left mt-3'>
          <h1>Leave Information</h1>
          <div className='d-flex justify-content-right flex-column align-items-left mt-3'>
            <Link to="/leave"><h3>Apply for leave</h3></Link><br />
            <button className='btn btn-danger' onClick={handleHistory}>My Leave History</button>
          </div><br/>
          <div>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div><br/>
          {showTable && data.length > 0 && (
            <div className='px-5 py-3'>
              <div className='d-flex justify-content-center'></div>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Application No.</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((leave, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{leave.reason}</td>
                      <td>{leave.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
