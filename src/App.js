import React from 'react';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import EmployeeData from './EmployeeData';
import { clear } from '@testing-library/user-event/dist/clear';

function App() {
  const [data,setData]=useState([]);
  const [firstName ,setfirstName]=useState('');
  const [lastName ,setLastName]=useState('');
  const [age ,setage]=useState(0);
  const [id ,setId]=useState(0);
  const [isupdate,setIsupdate]=useState(false);
  useEffect(()=>{
    setData(EmployeeData)
  },[]);

  const hanldeedit=(id)=> {
   const dt=data.filter(item => item.id=== id);
   if(dt !== undefined)
   {
    setIsupdate(true);
    setId(id);
    setfirstName(dt[0].firstName);
    setLastName(dt[0].lastName);
    setage(dt[0].age);
   }
  }
  const hanldedelete = (id) => {
    if(id>0){
      const dt =data.filter(item=> item.id !== id);
      setData(dt);
    }
  }
  const handleUpdate=()=>{
     const index=data.map((item)=>{
      return item.id
     }).indexOf(id);
     const dt=[...data];
     dt[index].firstName=firstName;
     dt[index].lastName=lastName;
     dt[index].age=age;
     setData(dt);
     handleClear();
     
  }

  const handleSave=(e)=>{
    let error='';
    if(firstName === '')
      error+='firstName is required';
    
    if(lastName === '')
      error+='lastName is required';
    
    if(age <= 0)
    error+='age is required';
    
    if(error === ' '){
    
    e.preventDefault();
    const dt=[...data];
    const newObject={
      id:EmployeeData.length+1,
      firstName:firstName,
      lastName:lastName,
      age:age
    } 
    dt.push(newObject);
    setData(dt);
  }
  else{
    alert(error);
  }
}
  const handleClear=()=>{
    setId(0);
    setfirstName('');
    setLastName('');
    setage('');
    setIsupdate(false);
  }
  return (
    <div className="App">
       <h1>CRUD OPERATION</h1>
       <hr/>
       <div style={{display: 'flex',justifyContent: 'center', Margintop:'10px',marginBottom:'10px'}}>
        <div>
          <label>First Name:</label>
          <input type='text' placeholder='enter your first Name' onChange={(e)=>setfirstName(e.target.value)} value={firstName}></input>
        </div>&nbsp;
        <div>
          <label>Last Name:</label>
          <input type='text' placeholder='enter your last Name' onChange={(e)=>setLastName(e.target.value)}value={lastName}></input>
        </div>&nbsp;
        <div>
          <label>Age:</label>
          <input type='text' placeholder='enter your age' onChange={(e)=>setage(e.target.value)} value={age}></input>
        </div>
        &nbsp;
        <div>
          {
            !isupdate ?
            <button className='btn btn-primary' onClick={(e)=>handleSave(e)}>Save</button> 
            :
            <button className='btn btn-primary' onClick={()=>handleUpdate()}>update</button>
          }
          <button className='btn btn-warning' onClick={()=>handleClear()}>clear</button>
        </div>
       </div>
        <table className='table table-over'>
         <thead>
          <tr>
            <td>Sr.no</td>
            <td>Id</td>
            <td>FirstName</td>
            <td>LastName</td>
            <td>Age</td>
            <td>Action</td>
            
          </tr>
         </thead>
         <tbody>
          {
            data.map((item, index)=>{
              return(
                 <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
              <button className='btn btn-primary' onClick={()=>hanldeedit(item.id)}>edit</button> &nbsp;
              <button className='btn btn-danger' onClick={()=>hanldedelete(item.id)}>delete</button>
        
            </td>
                 </tr>
              )
            })
          }
         </tbody>
        </table>
    </div>
  );
}


export default App;
