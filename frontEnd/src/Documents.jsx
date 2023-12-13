import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Documents() {
   const [formData, setFormData] = useState({
      id: '',
      image: ''
   });
   const navigate = useNavigate();

   const handleSubmit = (event) => {
      console.log("submitted");
      event.preventDefault();
      const formdata = new FormData();
      formdata.append("id", formData.id);
      formdata.append("image", formData.image);
      axios.post('http://localhost:8081/documents', formdata)
         .then(res => {
            
          window.location.reload(true);
           // navigate('/documents');
         })
         .catch(err => console.log(err));
   }

   const handleDelete=(id)=>{
      axios.delete('http://localhost:8081/deletedocument/'+id)
      .then(res=>{
        if(res.data.Status==="Success"){
         window.location.reload(true);
        }else{
          alert("error")
        }
      })
      .catch(err=>console.log(err));
        
    
     }

   const [documents, setDocuments] = useState([]);
   useEffect(() => {
      axios.get('http://localhost:8081/getDocuments')
         .then(res => {
            if (res.data.Status === "Success") {
              
              navigate('/documents');
             
               console.log(res.data.Result)
               setDocuments(res.data.Result);
            } else {
               alert("error");
            }
         })
         .catch(err => console.log(err));
   }, []);

   return (
      <div>
         <div className='d-flex flex-column align-items-center pt-3'>
            <h2>Documents</h2>
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
               <div className="col-12">
                  <label htmlFor="inputId" className="form-label">Employee Id</label>
                  <input
                     type="text"
                     className="form-control"
                     id="inputId" autoComplete='off'
                     placeholder='Enter Id'
                     onChange={e => setFormData({ ...formData, id: e.target.value })} required
                  />
               </div>

               <div className="col-12 mb-3">
                  <label className="form-label" htmlFor="inputGroupFile01">Select Image</label>
                  <input
                     type="file"
                     className="form-control"
                     id="inputGroupFile01"
                     onChange={e => setFormData({ ...formData, image: e.target.files[0] })} required
                  />
               </div>

               <div className="col-12">
                  <button type="submit" className="btn btn-primary">Store</button>
               </div>
            </form>
         </div>

         <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
               <h3>Documents</h3>
            </div>

            <table className='table'>
               <thead>
                  <tr>
                     <th>Id</th>
                     <th>Image</th>
                     <th>Action</th>
                  </tr>
               </thead>

               <tbody>
                  {documents.map((document, index) => {
                     return (
                        <tr key={index}>
                           <td>{document.id}</td>
                           <td>
                           <img src={`http://localhost:8081/images/${document.image}`} alt="" className='document_image' />

                           </td>
                           <td>
                           <button onClick={e=>handleDelete(document.id)} className='btn btn-sm btn-danger'>delete</button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default Documents;
