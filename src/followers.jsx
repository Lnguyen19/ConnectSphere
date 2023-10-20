import {useState,useEffect} from 'react';
import axios from 'axios';
import NavBar from './navBar';
import './followers.css';
const Followers = ()=>{
const [friends,setFriends] = useState([])
const [username,setUsername] = useState('');
const [profilePic,setProfilePic] = useState([]);
//________________________________________________________________________________
const userAvatar = (picture)=>{
  var beingReturn;
if(picture=='undefined'){
     beingReturn = 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
}
else {
  beingReturn =  `https://res.cloudinary.com/dmyyrftce/image/upload/${picture}`;
}
//console.log(beingReturn);
console.log(beingReturn);
return beingReturn;
}

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
    // Fetch profile pictures for each friend
    const fetchProfilePics = async () => {
      const pics = await Promise.all(friends.map(async (friend) => await getProfilePic(friend.follower)));
      setProfilePic(pics);
    };

    fetchProfilePics();
  }, [friends]);












//__________________________________________________

useEffect(()=>{
axios.post("https://mysocial-1473059facea.herokuapp.com/currentSession", { withCredentials: true }).then((response)=>{
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
axios.get(`https://mysocial-1473059facea.herokuapp.com/getFollowers/${username}`,{withCredentials:true}).then(response=>{
  if(response.data){
    setFriends(response.data);
   // console.log(response.data.length)
  }

}).catch(error=>{
  console.log(error);
})
},[username])
const unfollow = (person)=>{

axios.delete('https://mysocial-1473059facea.herokuapp.com/removeFollower',{params:{
  username:username,
  follower:person,
}}).then(response=>{
  if(response.data){
  console.log('successfully deleted user');
 setFriends((prevFriend)=>prevFriend.filter((item)=> item.follower!==person));
}
}).catch(error=>{

  console.log(error);
});
axios.delete('https://mysocial-1473059facea.herokuapp.com/removeFollowing',{params:{
  username:person,
  following:username,
}}).then(response=>{
  if(response.data){
  console.log('successfully deleted user');
   setFriends((prevFriend)=>prevFriend.filter((item)=> item.following!==person));
}
}).catch(error=>{

  console.log(error);
})

}


return(
  <>
  <div id = 'wholeThingLJ'>
    <NavBar/>
  <h1 id= 'ljH1'>  Followers </h1>
     <h2 id='ljH2'>Total Followers: {friends.length}</h2>
  {
friends.map((friend,index)=>(
<div class = 'ljborder'key = {index}>
<ul className="ljlistGroup">

 <li className = 'ljList'>
   <img src = {profilePic[index]} style = {{height:'50px',width:'50px'}}/>
   {friend.follower}
   <button class = 'ljButton' onClick = {()=>unfollow(friend.follower)}> Remove</button>
</li>
</ul>
</div>




  ))



  }
</div>
</>
	);
}
export default Followers;