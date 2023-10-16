import './homefeed_experiment.css'
import axios from 'axios'
import {useState,useEffect} from 'react';
const Homefeed_experiment= ()=>{
const opinion = [
{feeling:'I am Burning!',icon:'bi bi-brightness-high-fill',styles:'orange'}
,{feeling:'It is too hot!',icon:'bi bi-brightness-high',styles:'orange'}
,
{feeling:'Just right!',icon:'bi bi-brightness-low',styles:'orange'},
{feeling:'A little chilly',icon:'bi bi-thermometer-low',styles:'blue'}
,{feeling:'It is so cold!',icon:'bi bi-snow',styles:'blue'},
{feeling:'I am freezing !',icon:'bi bi-snow2',styles:'blue'},
{feeling:'Raining!',icon:'bi bi-cloud-rain-fill',styles:'skyblue'},]
const [posts,setPosts] = useState([]);
const [user,setUser] = useState('');
const [content,setContent] = useState('');
const [location,setLocation] = useState('');
 const [picture, setPicture] = useState(null);
 //newly added 
 const [userPicture,setUserPicture] = useState('');
 const [feeling,setFeeling] = useState('');
 const [feelingIcon, setFeelingIcon] = useState('');
const [iconColor,setIconColor] = useState('');



const resetIcon=()=>{
setFeeling('Select an option');  
 setFeelingIcon('bi bi-thermometer');
 setIconColor('red');
}


const handleFeelingIcon = (option)=>{
setFeelingIcon(option)

}
const handleFeeling = (option,icon,color)=>{
 
   setFeeling(option);
  setFeelingIcon(icon);
  setIconColor(color);
}


// end of new 
useEffect(()=>{
axios.get("http://localhost:3001/getPosts",{withCredentials:true}).then((response)=>{
  if(response.data){
    setPosts(response.data);
  }
  else {
    console.log('it went into the else section')
  }
}).catch(error=>{
  console.log(error);
})

},[posts])


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


const addPost = async()=>{
const formData = new FormData();
formData.append('content',content)
formData.append('location',location)
if(picture){
  formData.append('picture',picture);
}
formData.append('username',user)
axios.post('http://localhost:3001/addPost',formData,{
 headers:{
  'Content-Type':'multipart/form-data'
 }

}).then(response=>{
  console.log('successfully posted!')
}).catch(error=>{
  console.log(error)
})}



return(<>
  <div id='storage' style={{minHeight: '350px'}} onLoad = {()=> resetIcon()}>
   <input type ='text' placeholder ="How's the weather today?" class="form-control" id ='posting' onChange={(e)=>setContent(e.target.value)}/>
   <input type ='file' id ='photoInput' onChange = {(e)=>setPicture(e.target.files[0])}/>
     <div id = 'feeling'className="dropdown">

        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
         <i class= {feelingIcon} style={{color:`${iconColor}`}}></i>  {feeling}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
         {opinion.map((weather,index)=>(

            <li key = {index}>
            <a className="dropdown-item"  onClick= {()=>handleFeeling(weather.feeling,weather.icon,weather.styles)} >
            
              <i class={weather.icon} style = {{color:`${weather.styles}`}}></i> {weather.feeling}
            </a>
          </li>
      

         ))}

        </ul>
      </div>

   <input id = 'location' type = 'text' placeholder = 'location' onChange = {(e)=>setLocation(e.target.value)}/>
   <button class = 'btn-primary 'id = 'upload_button' onClick = {()=>{addPost()}}> Post+</button>
   {

//Started from here

   }
 <div id ='postCard' class = 'container'>
   <div class = 'row'>
    <div class = 'col-lg-6'>
   <div  class="card" style={{width: "1000px"}}>
  <img class="card-img-top" src="https://assets2.cbsnewsstatic.com/hub/i/r/2023/03/15/749d5e5c-e9bd-43bd-a4c0-682b6e7b2ce3/thumbnail/640x360/dfde84421bdc52d56b818dddb1b06d4b/image009.png?v=ab9bbd2a20facf22a21dc5066c583597" style = {{height:'500px',width:'auto'}}alt="Card image cap"/>
  
 { <a
//  className="ui-rect ui-bg-cover"
//  style={{
 //   backgroundImage:
  //    'url("https://i0.wp.com/timesofsandiego.com/wp-content/uploads/2021/08/Tuesday-High-Temps.jpg?ssl=1")',
  //  width: 'auto', // Adjust the width as needed
  //  height: '500px', // Adjust the height as needed
  //}
//}
></a>
}
  <div class="card-body" >

    <h5 class="card-title"> 
<img src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' style = {{height:'40px',width:'40px'}}/>
     {"  "} Username</h5>
    <p class="card-text">Wow! the weather is crazy lately, stay cool everyone!</p>
  </div>
  <div >
  <ul id = 'info'class="list-group list-group-flush ">
    <li id = 'list' class="list-group-item">Posted on: 9/23/2023</li>
    <li id = 'list' class="list-group-item">Location: San Diego California</li>
    <li  id = 'list' class="list-group-item">It is burning right !</li>
  </ul>
  </div>
  <div class="card-body">
    <a href="#" class="card-link">7 likes</a>
    <a href="#" class="card-link"> 2 Comments</a>
  </div>

</div>



    </div>
</div>
 </div>






</div>

	</>)
}
export default Homefeed_experiment;