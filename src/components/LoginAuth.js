import React, { useState,useEffect } from 'react';
import { getTokens} from '../store';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import auth from '../auth/auth';




function SignIn() {


const dispatch = useDispatch();
const navigate = useNavigate();
const { token} = useSelector((state) => state);
const [data, setData] = useState({username:"",password:""})
const onChange = (e) => {e.preventDefault(); setData({...data,[e.target.name]:e.target.value})};

const handleSubmit = (e) => {dispatch(getTokens(data)); e.preventDefault()}



useEffect(() => {
  if(token.status==="success"&&!JSON.parse(localStorage.getItem('jwtToken')).error){
    auth.isAuthenticated = true;
    navigate("user");
  }
}, [token.status]) 




  return (


  <div className='containerlogin'>
      <form onSubmit={handleSubmit} >

            <h3 style={{textAlign:"center",fontSize:"25px" }}>Log in</h3>

            <div className="form-group">
               
                <label>username</label>
                <input onChange={onChange} value={data.username} name="username"  type="text" className="form-control" placeholder="Enter username" autoComplete='off'/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input onChange={onChange} value={data.password} name="password" type="password" className="form-control" placeholder="Enter password" autoComplete='off' />
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
          
            <div>{JSON.parse(localStorage.getItem('jwtToken'))&&JSON.parse(localStorage.getItem('jwtToken')).error?<div className='failedlogen'>User name or password is incorrect.</div>:""}</div>
      </form>
  </div>
  )
}

export default SignIn;