import {useState,useEffect} from 'react'
import './self_profile.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const Self_profile = ()=>{
   
 const [follow_status,setFollow_status] = useState('');
 const [posts,setPosts] = useState([]);
 const [user,setUser] = useState('');
 const [username,setUsername] = useState('');
 const [username_,setUsername_] = useState('');
 const [totalPost, setTotalPost] = useState();
 const [profile_pic, setProfile_pic] = useState('');
 const [background,setBackground] = useState('');
const alt_background = 'https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500';
const alt_profile = 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
const default_bio = "This user has not set a biography";
//________
// const [profile_pic, setProfile_pic] = useState('');
const location = useLocation();
const profile = location.state.postingData;
const [picture,setPicture] = useState(alt_profile);
const [background_picture,setBackground_picture] = useState(alt_background);
const [bio,setBio] = useState(default_bio);
const [biography,setBiography] = useState(default_bio);
const [readOnly_,setReadOnly_] = useState(true);


//_____testing




//
//const profile ='a'
const userAvatar = (picture)=>{
  var beingReturn;
if(picture=='undefined'){
     beingReturn = 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
}
else {
  beingReturn =  `https://mysocial-1473059facea.herokuapp.com/${picture}`;
}
//console.log(beingReturn);
return beingReturn;
}

const handleProfile_pic_change= (e)=>{
  const file = e.target.files[0];
  setProfile_pic(file)
}
const handleBackground_change = (e)=>{
  const file = e.target.files[0];
  setBackground(file);
}
const handleBio_change= (e)=>{
  const file = e.target.value
    console.log("New Bio Value:", file);
  setBio(e.target.value);
}
//____________________________________________________________________
const uploadBio = ()=>{
  const formData = new FormData();
  //formData.append('bio',bio);
  axios.post(`https://mysocial-1473059facea.herokuapp.com/addBio/${username.username}`,{bio:bio},{withCredentials:true}).then(response=>{
     console.log(bio);
    console.log('Bio value received in the response:', response.data.bio); 
    setBio(response.data.bio);
    console.log('bio data successfully sent');
  }).catch(error=>{
    console.log(error);
  })
  setReadOnly_(true);
}
//____________________________________________________________________
const uploadProfilePic=()=>{
  const formData = new FormData();
  formData.append('pictureUrl',profile_pic);
axios.post(`https://mysocial-1473059facea.herokuapp.com/addProfilePicture/${username.username}`,formData,{withCredentials:true}).then(response=>{
  setPicture(`https://mysocial-1473059facea.herokuapp.com${response.data.pictureUrl}`)
  console.log('sent successfully');
}).catch(error=>{
  console.log(error);
})}
const uploadBackgroundPic = ()=>{
const formData = new FormData();
formData.append('background',background);
axios.post(`https://mysocial-1473059facea.herokuapp.com/addBackgroundPicture/${username.username}`,formData,{withCredentials:true}).then(response=>{
setBackground_picture(`https://mysocial-1473059facea.herokuapp.com${response.data.background}`)
console.log('sent background successfully');

}).catch(error=>{
  console.log(error);
})

}


//_______

//_____________________________________
useEffect(()=>{

axios.get(`https://mysocial-1473059facea.herokuapp.com/viewProfile/${profile.username}`,{withCredentials:true}).then(response=>{
  if(response.data){
    setUsername(response.data);
  }
  else {
    console.log('something else was wrong');
  }

 if (response.data.pictureUrl) {
          setPicture(`https://mysocial-1473059facea.herokuapp.com${response.data.pictureUrl}`);
        } else {
          setPicture(alt_profile);
        }

 if(response.data.background){
  setBackground_picture(`https://mysocial-1473059facea.herokuapp.com${response.data.background}`);
 }else {
  setBackground_picture(alt_background);
 }

if(response.data.bio){
  setBio(response.data.bio);
}else {
  setBio(default_bio)
}


}).catch(error=>{
  console.log(error);
})

},[])

useEffect(()=>{
axios.get(`https://mysocial-1473059facea.herokuapp.com/getUserPosts/${username.username}`,{withCredentials:true}).then(response=>{
  if(response.data){
    setPosts(response.data);
  }

}).catch(error=>{
  console.log(error);
})
},[posts])


const testingUsername = (username)=>{
if(username){
  return username;
}
else {
  return 'null';
}
}
const testingName = (name)=>{
if(name){
  return username;
}
else {
  return 'null';
}
}
const testingAge = (age)=>{
if(age){
  return age;
}
else {
  return 0;
}
}
 

//_____________________________________
return(<>;
   <div id = 'all' class = 'header-container'> 
   <div id='back-pic'>
     <img id = 'background_pic' src ={background_picture}/>
           
    </div>

    <div id = 'profile' class = 'container-fluid'>
  <img className = 'profile-picture'src = {picture}/>
  <br/>
  <div id= 'name'>
      <input id = 'backgroundInput' type = 'file' onChange= {handleBackground_change}/> 
      <div id = 'updateBackground' onClick={uploadBackgroundPic}> <button >Update background</button> </div>
  <h2 style = {{fontWeight:'bold'}}>Username: {testingUsername(username.username)}</h2>
  <h2 style = {{fontWeight:'bold'}}>Name: {testingName(username.name)} </h2>  
  <h2 style = {{fontWeight:'bold'}}>Age: {testingAge(username.age)}</h2>

   </div>
<div id = 'profile_update'>
<input type = 'file'  onChange ={handleProfile_pic_change}/>
<div>
<button  onClick = {uploadProfilePic}> Update profile photo</button>
</div>
</div>

<div id='stats'> <h3>Followers:  Following:  Total Post: 34</h3> </div>
<div id = 'actions'> <button class = 'btn-lg btn-success'>Message</button>  <button class = 'btn-lg btn-primary' >Follow</button> </div>
</div>


<div id ='bioSection'class ='container-fluid'>
<h1>Bio</h1>
<div id = 'bio'>

 {//<textarea  style = {{width:'100%',height:'280px'}} onChange={
   //(e)=>{setBio(e.target.value)}}  value = {bio}></textarea>
 }
 <input type = 'text' style = {{width:'100%',height:'280px'}} onChange = {handleBio_change}/> 
</div>
<button class = 'btn-danger' onClick = {()=>setReadOnly_(false)} >Edit </button> 
<button id = 'submitBio'class = 'btn-success' onClick = {()=>uploadBio()}> Submit Bio</button>
</div>
<div id = 'postSection'>
<h1>Posts</h1>









</div>




   </div>


  </>)

}
export default Self_profile;