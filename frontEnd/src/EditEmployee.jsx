import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

export default function EditEmployee() {
  const [data, setData] = useState({
    name: '',
    email: '',
    address: '',
    salary: '',
  });

  const navigate = useNavigate();

  const{id}=useParams();
  useEffect(()=>{
    
    axios.get('http://localhost:8081/get/'+id)
   .then(res=>{
    setData({...data,name:res.data.Result[0].name,
      email:res.data.Result[0].email,
      address:res.data.Result[0].address,
      salary:res.data.Result[0].salary,

    })

   })
   .catch(err=>console.log(err));

  },[] )


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.put(`http://localhost:8081/update/${id}`, data);
      if (response.data.Status === "Success") {
        navigate('/employee');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className='d-flex flex-column align-items-center pt-3'>
      <h2>Update Employee</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor='inputName' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='inputName'
            autoComplete='off'
            placeholder='Enter name'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })} 
          />
        </div>

        <div className='col-12'>
          <label htmlFor='inputEmail4' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='inputEmail4'
            autoComplete='off'
            placeholder='Enter Email'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

       

        <div className='col-12'>
          <label htmlFor='inputAddress' className='form-label'>
            Address
          </label>
          <input
            type='text'
            className='form-control'
            id='inputAddress'
            placeholder='Enter Address'
            autoComplete='off'
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })} 
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputSalary' className='form-label'>
            Salary
          </label>
          <input
            type='text'
            className='form-control'
            id='inputSalary'
            autoComplete='off'
            placeholder='Enter Salary'
            value={data.salary}
            onChange={(e) => setData({ ...data, salary: e.target.value })}
          />
        </div>

        <div className='col-12'>
          <button type='submit' className='btn btn-primary'>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
