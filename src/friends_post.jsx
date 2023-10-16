import './friends_post.css'
import axios from 'axios'
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './navBar';
const Friends_posts = ()=>{

	const [friends,setFriends] = useState([]);
	const [posts,setPosts] = useState([]);
	const [username,setUsername] = useState('');
	const [joint,setJoint] = useState([]);
  const [canLike,setCanLike] = useState(true);
  const [likeSymbol,setLikeSymbol]  = useState('bi bi-hand-thumbs-up');
  const navigate = useNavigate();
  
const userAvatar = (picture)=>{
  var beingReturn;
if(picture=='undefined'){
     beingReturn = 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
}
else {
  beingReturn =  `http://localhost:3001${picture}`;
}
//console.log(beingReturn);
return beingReturn;
}
useEffect(()=>{
axios.post("http://localhost:3001/currentSession", { withCredentials: true }).then((response)=>{
if(response.data.username){
  console.log(`the current user is ${response.data.username}`)
  setUsername(response.data.username);
}
else {
  console.log(response.data)
console.log("something else is wrong")
}

}).catch(error=>{
  console.log(error)
})

},[]);


useEffect(() => {
  axios.get('http://localhost:3001/getSubscribe', {
    params: {
      username: username
    },
    withCredentials: true
  }).then(response => {
    if (response.data) {
      setFriends(response.data);
      //console.log('the data is ', response.data);
    }
  }).catch(error => {
    console.log(error);
  });
}, [username,friends]);

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

},[posts]);


useEffect(()=>{
 let merged = posts.filter(post => friends.some(friend => friend.following === post.username));

  
  setJoint(merged)
 

},[joint])


const join = (post,friend)=>{
  let merged = post.filter(post_=>friend.some(friend_=>friend_.username===post.username));
  console.log('the merged array is ',merged);
  setJoint(merged)
 
}

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
const handleLikes=(postId, username)=>{

  if(canLike==true){
  axios.post('http://localhost:3001/liking',{
    postId: postId,
    username:username,
  },{withCredentials:true}).then(response=>{
    if(response.data){
       console.log("liked!");
       setCanLike(false);
    }
  }).catch(error=>{
    console.log(error);
  });
 }

else {
  axios.delete('http://localhost:3001/unlike', {
            data: {
                postId: postId,
                username: username,
            },
            withCredentials: true
        }).then(response=>{
    if(response.data){
      console.log("unliked");
      setCanLike(true);

    }
  }).catch(error=>{
    console.log(error);
  })
}

}

const add_comment = (comment,id,username)=>{
axios.post('http://localhost:3001/addComment',{
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
if(posting.username==username){
  navigate('/self',{state:{postingData:posting}});
}
else if (posting){
navigate('/profile_view', {state: {postingData: posting}});

}
else {

}

}








return(
<>
<NavBar/>
<div id= 'allFriends'>
 {(() => {
    if (joint.length === 0) {
        return (
            <div>
                <h2>
                    No Posts Yet, Upload your first post to be join the conversation today.
                </h2>
            </div>
        );
    }
else {
 return joint.map((posting,index)=>(
 <div id = 'posts_photos' key = {index} >
    { // <img src={`http://localhost:3001${posting.picture}`} style = {{height:'500px',width:'600px'}}/>
  }
    <div  class = 'container' >
   <div class = 'row'>
    <div class = 'col-lg-6'>
   <div  class="card" style={{width: "1000px"}}>
 { //<img class="card-img-top" src="https://assets2.cbsnewsstatic.com/hub/i/r/2023/03/15/749d5e5c-e9bd-43bd-a4c0-682b6e7b2ce3/thumbnail/640x360/dfde84421bdc52d56b818dddb1b06d4b/image009.png?v=ab9bbd2a20facf22a21dc5066c583597" style = {{height:'500px',width:'70%'}}alt="Card image cap"/>
  }
  <img class="card-img-top" src={`http://localhost:3001${posting.picture}`} style = {{height:'500px',width:'auto'}}alt="Card image cap"/>

  <div class="card-body" >

    <h5 class="card-title"> 
<img src = {userAvatar(posting.profile_pic)} style = {{height:'40px',width:'40px'}}/>
     {"  "}  <a class="nav-link"  >{posting.username}</a> </h5> 
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
   <input type = 'text' id = 'comments' />
   <button id = 'post_comment' >Post Comment</button>

 </div>
  <div class="card-body" >
    <a href="#" class="card-link" > <i class={'bi bi-hand-thumbs-up'}  />{posting.likesCount.length} likes</a>
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
</>
	);
}
export default Friends_posts;