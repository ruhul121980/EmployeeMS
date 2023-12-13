import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
export default function LeaveRequest() {

  const [data,setData]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:8081/getLeave')
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

  const handleApproval = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:8081/leave-request/${id}`, { status });
      navigate('/leaverequest');
      window.location.reload();
      //navigate('/leaverequest');
      
    } catch (error) {
      console.error('Error updating leave request:', error);
    }
  };

  

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center'>
        <h3>Pending Leave Request</h3>

      </div>
  
      <table className='table'>
        <thead>
          <tr>
            <th>Name  </th>
            
            <th>Id</th>
            <th>Reason</th>
            <th>Status</th>
           

          </tr>
        </thead>
        <tbody>
          {data.map((leave,index)=>{
           return <tr key={index}>
              <td>{leave.name}</td>
              
              <td>{leave.id}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
             
              <td>
                {leave.status === 'Pending' && (
                  <>
                    <button onClick={() => handleApproval(leave.id, 'Approved')}>Approve</button>
                    <button onClick={() => handleApproval(leave.id, 'Rejected')}>Reject</button>
                  </>
                )}
                </td>

            </tr>
          })}
        </tbody>
        </table>

    </div>
  )
}
