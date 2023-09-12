import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function AddEmployee() {
  const [data, setData] = useState({
   name:'',
    email: '',
    password: '',
    address: '',
    image:'',
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("address", data.address);
    formdata.append("image", data.image);
  
    axios.post('http://localhost:8081/create', formdata)
      .then((res) => {
        console.log('Response:', res.data); 
      })
      .catch(err => console.log(err)); 
      
  }
  

  return (
    <div className='d-flex-column align-items-center pt-5'>
      <h2>Add Employee</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
      <div className="col-12">
          <label htmlFor="inputName" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName" autoComplete='off'
            placeholder='Enter name'
            onChange={e => setData({ ...data, name: e.target.value })}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4" autoComplete='off'
            placeholder='Enter Email'
            onChange={e => setData({ ...data, email: e.target.value })}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputPassword4" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            placeholder='Enter Password' autoComplete='off'
            onChange={e => setData({ ...data, password: e.target.value })}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder='Enter Address' autoComplete='off'
            onChange={e => setData({ ...data, address: e.target.value })}
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label" htmlFor="inputGroupFile01">Select Image</label>
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            onChange={e => setData({ ...data, image: e.target.files[0] })}
          />
        </div>
        
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
