import {useState,useEffect} from 'react';
import axios from 'axios';
import NavBar from './navBar';
import './following.css';
const Following = ()=>{
const [friends,setFriends] = useState([])
const [username,setUsername] = useState('');
const [profilePic,setProfilePic] = useState([]);
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

useEffect(()=>{
axios.get(`http://localhost:3001/getFollowing/${username}`).then(response=>{

if(response.data){
	setFriends(response.data);
}else{
	console.log("Data was sent but it did not send the right data");
}
       
}).catch((error)=>{
	console.log(error);
})

},[username]);
const unfollow = (person)=>{

axios.delete('http://localhost:3001/removeFollowing',{params:{
  username:username,
  following:person,
}}).then(response=>{
  if(response.data){
  console.log('successfully deleted user');
   setFriends((prevFriend)=>prevFriend.filter((item)=> item.following!==person));
}
}).catch(error=>{

  console.log(error);
});
axios.delete('http://localhost:3001/removeFollower',{params:{
  username:person,
  follower:username,
}}).then(response=>{
  if(response.data){
  console.log('successfully deleted user');
 setFriends((prevFriend)=>prevFriend.filter((item)=> item.follower!==person));
}
}).catch(error=>{

  console.log(error);
});
}

const getProfilePic = async (username) => {
    try {
      const profilePicResponse = await axios.get(`http://localhost:3001/getProfilePic/${username}`, { withCredentials: true });

      if (profilePicResponse.data && profilePicResponse.data.length > 0) {
        if( profilePicResponse.data[0].pictureUrl){
        console.log("Fetched profile picture URL:", profilePicResponse.data[0].pictureUrl);
        return `http://localhost:3001${profilePicResponse.data[0].pictureUrl}`;
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
      const pics = await Promise.all(friends.map(async (friend) => await getProfilePic(friend.following)));
      setProfilePic(pics);
    };

    fetchProfilePics();
  }, [friends]);




return(<>
<div id = 'wholeThingLJ'>
  <NavBar/>
  <h1 id = 'ljH1'>  Following </h1>
     <h2 id = 'ljH2'>Total Following: {friends.length}</h2>
  {
friends.map((friend,index)=>(
<div class = 'ljborder'key = {index}>
<ul className="ljlistGroup">
 <li className = 'ljList'>
 <img src = {profilePic[index]} style={{height:'50px',width:'50px'}}/>
   {friend.following}
   <button class = 'ljButton'style = {{position:'relative', left:'80px'}} onClick ={()=>unfollow(friend.following)}> Unfollow</button>
</li>
</ul>

</div>




  ))



  }
</div>
</>
	);
}
export default Following;