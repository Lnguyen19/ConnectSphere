import './homeFeed.css'
import axios from 'axios'
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const HomeFeed= ()=>{
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
 const [comment,setComment] =useState([]);
 const [currentComment,setCurrentComment] = ([]);
 //______________________________
const [userPicture,setUserPicture] = useState('');
 const [feeling,setFeeling] = useState('');
 const [feelingIcon, setFeelingIcon] = useState('');
const [iconColor,setIconColor] = useState('');
const [postId,setPostId] = useState('');
const [like,setLike] = useState(0);
const [likeSymbol,setLikeSymbol] = useState('bi bi-hand-thumbs-up');
const [canLike,setCanLike] = useState(true);
const [feedPicture,setFeedPicture] = useState('');
//var profile_pic ;
///__________________________
const [profilePic_,setProfilePic_] = useState([]);
const navigate = useNavigate();

//________________________________________






//________________________________________
const userAvatar = (picture)=>{
  var beingReturn;
if(picture=='undefined'){
     beingReturn = 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
}
else {
  beingReturn =  `https://res.cloudinary.com/dmyyrftce/image/upload/${picture}`;
}
//console.log(beingReturn);
return beingReturn;
}
useEffect(()=>{




 if(canLike==true){
   setLikeSymbol('bi bi-hand-thumbs-up');
  }
  else {
   setLikeSymbol('bi bi-hand-thumbs-up-fill');
 }
},[]);

const userExist=(username,postingArray)=>{
console.log(`the user is ${postingArray.length}`)
const find = postingArray.some(post=>post.username===username);
if(find){
  console.log('it exist');
  setCanLike(false);
  setLikeSymbol('bi bi-hand-thumbs-up-fill');
}
else {
  console.log('it does not exist');
  setCanLike(true);
  setLikeSymbol('bi bi-hand-thumbs-up');
}
return find;
}


const handleLikes = async (postId, username) => {
  try {
    const updatedPosts = [...posts];
    const postIndex = updatedPosts.findIndex((post) => post._id === postId);

    if (postIndex !== -1) {
      const userAlreadyLiked = userExist(username, updatedPosts[postIndex].likesCount);

      if (!userAlreadyLiked) {
        const response = await axios.post(
          'https://mysocial-1473059facea.herokuapp.com/liking',
          {
            postId: postId,
            username: username,
          },
          { withCredentials: true }
        );

        if (response.data) {
          console.log('Liked!');
          updatedPosts[postIndex].likesCount.push(username);
          setPosts(updatedPosts);
        }
      } else {
        const response = await axios.delete('https://mysocial-1473059facea.herokuapp.com/unlike', {
          data: {
            postId: postId,
            username: username,
          },
          withCredentials: true,
        });

        if (response.data) {
          console.log('Unliked');
          const likeIndex = updatedPosts[postIndex].likesCount.indexOf(username);
          if (likeIndex !== -1) {
            updatedPosts[postIndex].likesCount.splice(likeIndex, 1);
            setPosts(updatedPosts);
          }
        }
      }
    } else {
      console.log('Post not found');
    }
  } catch (error) {
    console.log(error);
  }
};


const add_comment = (comment,id,username)=>{
axios.post('https://mysocial-1473059facea.herokuapp.com/addComment',{
postId:id,
content: comment,
username: username, 

}).then(response=>{
  if(response){
console.log('comment successfully posted');
}
}).catch(error=>{
  console.log(error);
})



}



const click_on_profile = (posting)=>{
if(posting.username==user){
  navigate('/self',{state:{postingData:posting}});
}
else if (posting){
navigate('/profile_view', {state: {postingData: posting}});

}
else {

}

}

//____________


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


 //______________________________
useEffect(()=>{
axios.get("https://mysocial-1473059facea.herokuapp.com/getPosts",{withCredentials:true}).then((response)=>{
  if(response.data){
    setPosts(response.data);
  }
  else {
    console.log('it went into the else section')
  }
}).catch(error=>{
  console.log(error);
})

},[posts]);


useEffect(() => {
  axios.post("https://mysocial-1473059facea.herokuapp.com/currentSession", {}, {
    withCredentials: true,
  })
  .then((response) => {
    if (response.data.username) {
      console.log(`the current user is ${response.data.username}`);
      setUser(response.data.username);
    } else {
      console.log(response.data);
      console.log("something else is wrong");
    }
  })
  .catch((error) => {
    console.log(error);
  });
}, [user]);



const addPost = async () => {
  try {
  
    const profilePicResponse = await axios.get(`https://mysocial-1473059facea.herokuapp.com/getProfilePic/${user}`, { withCredentials: true });

    let profile_pic;

    if (profilePicResponse.data && profilePicResponse.data.length > 0) {
      console.log("Fetched profile picture URL:", profilePicResponse.data[0].pictureUrl);
      profile_pic = profilePicResponse.data[0].pictureUrl;
    } else {
      console.log('No profile picture found.');
      profile_pic = 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
    }

   
    const postData = new FormData();
    postData.append('content', content);
    postData.append('location', location);
    postData.append('username', user);
    postData.append('profile_pic', profile_pic);
    
  
    if(picture){
  postData.append('picture',picture);
}
     postData.append('feeling', feeling);
    postData.append('feelingIcon', feelingIcon);
    postData.append('iconColor', iconColor);

  
    const postResponse = await axios.post('https://mysocial-1473059facea.herokuapp.com/addPost', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Successfully posted!', postResponse.data);

  } catch (error) {
    console.error('Error in addPost:', error);
  }
};


const getProfilePic = async (username) => {
    try {
      const profilePicResponse = await axios.get(`https://mysocial-1473059facea.herokuapp.com/getProfilePic/${username}`, { withCredentials: true });

      if (profilePicResponse.data && profilePicResponse.data.length > 0) {
        if( profilePicResponse.data[0].pictureUrl){
        console.log("Fetched profile picture URL:", profilePicResponse.data[0].pictureUrl);
        return `https://res.cloudinary.com/dmyyrftce/image/upload/${profilePicResponse.data[0].pictureUrl}`;
            }

        else{ console.log('No profile picture found.');
        return 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';

        }


      } else {
        console.log('No profile picture found.');
        return 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
      }
    } catch (error) {
      console.log(error);
      return 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
    }


  };
  useEffect(() => {
   
    const fetchProfilePics = async () => {
      const pics = await Promise.all(posts.map(async (post) => await getProfilePic(post.username)));
      setProfilePic_(pics);
    };

    fetchProfilePics();
  }, [posts]);

return(<>
  <div id = 'wholeThing'>
    <div id='storage' style={{minHeight: '350px'}} onLoad = {()=> resetIcon()}>
   <input type ='text' placeholder ="How's the weather today?" class="form-control" id ='posting' onChange={(e)=>setContent(e.target.value)}/>
   <input type ='file' id ='photoInput' onChange = {(e)=>setPicture(e.target.files[0])}/>
     <div id = 'feeling'className="dropdown">

        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
         <i class= {feelingIcon} style={{color:`${iconColor}`}}></i> 
          {feeling}
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
   {(() => {
    if (posts.length === 0) {
        return (
            <div>
                <h2>
                    No Posts Yet, Upload your first post to be join the conversation today.
                </h2>
            </div>
        );
    }
else {
 return posts.map((posting,index)=>(
 <div id = 'posts_photos' key = {index}>
    { // <img src={`http://localhost:3001${posting.picture}`} style = {{height:'500px',width:'600px'}}/>
  }
    <div  class = 'container' onLoad = {()=>userExist(user,posting.likesCount)}>
   <div class = 'row'>
    <div class = 'col-lg-6'>
   <div  class="card" style={{width: "1000px"}}>
 { //<img class="card-img-top" src="https://assets2.cbsnewsstatic.com/hub/i/r/2023/03/15/749d5e5c-e9bd-43bd-a4c0-682b6e7b2ce3/thumbnail/640x360/dfde84421bdc52d56b818dddb1b06d4b/image009.png?v=ab9bbd2a20facf22a21dc5066c583597" style = {{height:'500px',width:'70%'}}alt="Card image cap"/>
  }
  <img class="card-img-top" src={`https://res.cloudinary.com/dmyyrftce/image/upload/${posting.picture}`} style = {{height:'500px',width:'auto'}}alt="Card image cap"/>

  <div class="card-body" >

    <h5 class="card-title"> 
<img src = {profilePic_[index]} style = {{height:'40px',width:'40px'}}/>
     {"  "}  <a class="nav-link"  onClick={()=>click_on_profile(posting)}>{posting.username}</a> </h5> 
    <p class="card-text">{posting.content}</p>
  </div>
  <div >
  <ul id = 'info'class="list-group ">
    <li id = 'list' style = {{borderColor:'lightGreen'}}>Posted on: {posting.timestamp}</li>
    <li id = 'list'  style = {{borderColor:'lightGreen'}}>Location: {posting.location}</li>
    <li  id = 'list'  style = {{borderColor:'lightGreen'}}>
       <i class= {posting.feelingIcon}  style = {{color:`${posting.iconColor}`}}/>{posting.feeling}</li>
  </ul>
  </div>
  <div id = 'comment_section'>
   <input type = 'text' id = 'comments' onChange = {(e)=>{setComment(e.target.value)}}/>
   <button id = 'post_comment' onClick = {()=>add_comment(comment,posting._id,user)}>Post Comment</button>

 </div>
  <div class="card-body" >
    <a href="#" class="card-link" onClick= {()=>handleLikes(posting._id,user)}> <i class= {likeSymbol} />{posting.likesCount.length} likes</a>
    <a href="#" class="card-link">{posting.comments.length} Comment</a>
 {posting.comments.map((comment, commentIndex) => (
          <div key={commentIndex} id = 'commentSection'>
          
            <p>{comment.username}: {comment.content}</p>
            <p style = {{color:'gray'}}> at {comment.timestamp} </p>
          </div>
        ))}

  </div>
<h2> </h2>
 
</div>



    </div>
</div>
 </div>
<br/>


 </div>
))}
})()}











</div>
</div>
	</>)
}
export default HomeFeed;