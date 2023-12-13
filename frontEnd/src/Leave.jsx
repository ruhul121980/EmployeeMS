import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Leave() {
  

  const [data, setData] = useState({
    name: '',
    id: '',
    reason: ''
  });
  const navigate = useNavigate();
  

  const handleSubmit = (event) => {
    console.log("submitted");
    event.preventDefault();

    axios.post('http://localhost:8081/leaveData', data)
      .then(response => {
        window.location.reload();
        navigate('/leave');
        console.log("posted to server")
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='d-flex flex-column align-items-center pt-3'>
      <h2>Leave Application</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            autoComplete='off'
            placeholder='Enter name'
            onChange={e => setData({ ...data, name: e.target.value })}
            required
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputId" className="form-label">Id</label>
          <input
            type="text"
            className="form-control"
            id="inputId"
            autoComplete='off'
            placeholder='Enter Id'
            onChange={e => setData({ ...data, id: e.target.value })}
            required
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputReason" className="form-label">Reason</label>
          <textarea
            type="text"
            className="form-control"
            id="inputReason"
            placeholder=''
            autoComplete='off'
            onChange={e => setData({ ...data, reason: e.target.value })}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Apply</button>
        </div>
      </form>
    </div>
  );
}

export default Leave;
