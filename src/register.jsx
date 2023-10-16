import React, { useEffect, useState } from "react";
import axios from 'axios';
import './register.css';
import { useNavigate } from 'react-router-dom';
const Register = ()=>{
const [usernameSignUp,setUsernameSignUp] = useState("");
const [passwordSignUp,setPasswordSignUp] = useState("");
const [message,setMessage] = useState('');
const [name,setName] = useState("");
const [age,setAge] = useState();
 axios.defaults.withCredentials = true;
const navigate = useNavigate();
const reset=()=>{
  setMessage('');
}
const register = ()=>{

    axios.post("https://mysocial-1473059facea.herokuapp.com/register", {name,age,username: usernameSignUp, password: passwordSignUp})
  .then((response) => {
    console.log(response);
    setMessage('Your account has been successfully registered, press done to log into your account')
  })
  .catch((error) => {
    console.error(error);
  });

}
return (
 <>
    <div id = 'wholeThingLJ3'>
    <img class="lamacorn2" src="https://cdn-icons-png.flaticon.com/256/4313/4313401.png" alt=""/>
        <div className="container mt-5" onLoad = {reset} >
            <div className="row justify-content-center">
                <div className="col-md-5 reg">
                    <div className="text-center mb-5">
                        <h1 className="ljSignUp" style = {{fontWeight:'bold'}}>Sign Up</h1>
                        <p className="text-muted">Join the fastest growing media site in the world!</p>
                    </div>

                            <div className="ljName">
                            <input 
                                 type = 'text'
                             
                                placeholder="Name"
                                onChange={(e) => {
                                   setName(e.target.value)
                                }} 
                            />
                        </div>

                            <div className="ljAge">
                            <input 
                                 type = 'number'
                             
                                placeholder="Your age"
                                onChange={(e) => {
                                    setAge(e.target.value)
                                }} 
                            />
                        </div>



                   
                        <div className="ljUsername">
                            <input 
                                type="text" 
                              
                                placeholder="Username"
                                onChange={(e) => {
                                    setUsernameSignUp(e.target.value);
                                }} 
                            />
                        </div>

                        <div className="ljPassword">
                            <input 
                                type="password" 
                    
                                placeholder="Password"
                                onChange={(e) => {
                                    setPasswordSignUp(e.target.value);
                                }} 
                            />
                        </div>
                   <div className="d-grid">
                            <button className="ljRegisterButton" onClick={register}>Register</button>
                            <h2 class = 'text-success'>{message} </h2>
                        </div>
                         <br/>
                        <br/>  
                </div>
            </div>
        </div>
    </div>
    </>
);




}
export default Register;