import React, { useEffect, useState } from "react";
import axios from 'axios';
import './login.css'
import { useNavigate } from 'react-router-dom';
const Login = ()=>{
  const navigate = useNavigate();
const [usernameLogin,setUsernameLogin] = useState("");
const [passwordLogin,setPasswordLogin] = useState("");
const [userId, setUserId] = useState("");
const [log, setLog] = useState(false);
const [messageLabel,setMessageLabel] = useState('');
 axios.defaults.withCredentials = true;



const login = ()=>{


    axios.post("http://localhost:3001/getUser", {
  username: usernameLogin,
  password: passwordLogin,
})
  .then((response) => {
    console.log(response);
    if(response.data.success=="login successful"){
      //setUserId(response.data.username)
      console.log(usernameLogin)
 navigate('/main');
  console.log("it worked")
    console.log(messageLabel);
}
else{
  console.log("did not work");
  setMessageLabel('Wrong login combination')
  console.log(messageLabel);


}
   // }
    
  })
  .catch((error) => {
    console.error(error);
      setMessageLabel('Wrong login combination')
   // navigate('main');
    //setLog(false);


  });
 
//if()navigate("main");
  //correct(log);
}

return(
<>
   <div id = 'ljWholeThing'>
  <div className = 'loging'>
      <img class="lamacorn" src="https://cdn-icons-png.flaticon.com/256/4313/4313401.png" alt=""/>
      <h1 class="h3 mb-3 font-weight-bold">Please sign in</h1>
      <div class = 'm-3  border border-warning border-3'>
      <label  class="sr-only">Username</label>
      <input type="text" id="inputEmail" class="form-control" placeholder="Username"   onChange = {(e)=>{
    setUsernameLogin(e.target.value)
  }} />

     </div>

     <div class = 'm-3  border border-warning border-3'>
      <label  class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password"  onChange = {(e)=>{
    setPasswordLogin(e.target.value)
   }}/>
      </div>
      <button  class  ='ljButtonSignIn' onClick = {login}>Sign in</button>
      <br/>
      <label class = 'text-danger'> {messageLabel} </label>
      <div class = 'container mt-5'>
      <label class= 'ljLabel'>Don't have an account ? Sign up using the button below  </label>
      <br/>
      <button class = 'LJsecondary' onClick = {()=>navigate('/signup')}> Sign Up</button>
      </div>
      
   </div>
   </div>
    </>
  )

}
export default Login;