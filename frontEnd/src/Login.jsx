import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const navigate=useNavigate();
  const [error,setError]=useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/login', values) 
      .then(res=>{
        if(res.data.Status==='Success'){
          navigate('/');

        }else {
          setError(res.data.Error);

        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className='text-danger'>
          {error && error};
        </div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Log In
          </button>
          <p>You agree to our terms and policies</p>
          <button className="btn btn-secondary border w-100 rounded-0">Create Account</button>
        </form>
      </div>
    </div>
  );
}
