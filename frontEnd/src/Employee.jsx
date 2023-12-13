import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
export default function Employee() {

  const [data,setData]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:8081/getEmployee')
    .then(res=>{
      if(res.data.Status==="Success"){
        console.log(res.data.Result)
        setData(res.data.Result);
      }else{
        alert("error")
      }
    })
    .catch(err=>console.log(err));
      
  },[])

  const handleDelete=(id)=>{
    axios.delete('http://localhost:8081/delete/'+id)
    .then(res=>{
      if(res.data.Status==="Success"){
       window.location.reload(true);
      }else{
        alert("error")
      }
    })
    .catch(err=>console.log(err));
      
  
   }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center'>
        <h3>Employee List</h3>

      </div>
      <Link to="/create" className='btn btn-success'>Add Employee</Link>
      <table className='table'>
        <thead>
          <tr>
            <th>Name  </th>
            <th>Id  </th>
            <th>Image</th>
            <th>email</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {data.map((employee,index)=>{
           return <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.id}</td>
              <td>{
               <img src={'http://localhost:8081/images/'+employee.image} alt="" className='employee_image' />

        
                }</td>
              <td>{employee.email}</td>
              <td>{employee.address}</td>
              <td>{employee.salary}</td>
              <td>
              <Link to={'/employeeEdit/'+employee.id} className='btn btn-primary btn-sm me-2'>edit</Link>

                <button onClick={e=>handleDelete(employee.id)} className='btn btn-sm btn-danger'>delete</button>
              </td>

            </tr>
          })}
        </tbody>
        </table>

    </div>
  )
}
