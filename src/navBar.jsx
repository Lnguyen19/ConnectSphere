import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate,Outlet } from 'react-router-dom';
import axios from 'axios'
import './navBar.css'

const NavBar = ()=>{
const [click,setClick] = useState(false);
const [user,setUser] = useState("");
const navigate = useNavigate();

const handleClick = ()=>{

	setClick(!click);
}
const close = ()=>{
	setClick(false);
}


useEffect(()=>{
axios.post("http://localhost:3001/currentSession", { withCredentials: true }).then((response)=>{
if(response.data.username){
  console.log(`the current user is ${response.data.username}`)
  setUser(response.data.username);
}
else {
  console.log(response.data)
console.log("something else is wrong")
}

}).catch(error=>{
  console.log(error)
})

},[user])

return(<>
<div className = 'navBar_'>
<nav class="navbar navbar-expand-lg navbar-light " >
  <div class="container-fluid">
    <a class="navbar-brand " href="#">Hi {user}</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarNav">
      <ul class="navbar-nav " style = {{fontWeight:'bold'}}>
        <li class="nav-item " >
          <a class="nav-link active" aria-current="page" onClick={()=>navigate('/main')} ><i class="bi bi-house icon_"></i> Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " onClick = {()=>navigate('/follower')}><i class="bi bi-person-plus-fill icon_"></i> Followers</a>
        </li>
         <li class="nav-item">
          <a class="nav-link"  onClick ={()=>navigate('/following')}><i class="bi bi-person-fill-check icon_"></i> Followings</a>
        </li>
        <li class="nav-item">
          <a class="nav-link"  onClick = {()=>navigate('/inbox')} ><i class="bi bi-chat-left-dots icon_"></i> Messages</a>
        </li>
         <li class="nav-item">
          <a class="nav-link" onClick = {()=>navigate('/friends')} ><i class="bi bi-people-fill icon_" ></i> Friend's Posts</a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link" onClick = {()=>navigate('/search')} ><i class="bi bi-search icon_" ></i> Search for a user</a>
        </li>
         <li class="nav-item" style = {{position:'relative', left:"700px"}}>
          <a class="nav-link"  href="#" >Log out</a>
        </li>



      </ul>
    </div>
  </div>
</nav>


</div>



<Outlet/>
	</>)
}

export default NavBar;