import {useState,useEffect} from 'react'
import './search.css'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './navBar'
const Search = ()=>{
const [username,setUsername] = useState('');
const [searchInput, setSearchInput] = useState('');
const navigate = useNavigate();
useEffect(()=>{
axios.get(`https://mysocial-1473059facea.herokuapp.com/search`, { params: { username: searchInput }},{withCredentials:true}).then(response=>{
	if(response.data){
		setUsername(response.data);

	}
	else {
		console.log('name not found')
	}
}).catch(error=>{
	console.log(error);
})

console.log('the result is ',username);
},[searchInput]);
const userAvatar = (picture)=>{
  var beingReturn;
if(picture=='undefined'){
     beingReturn = 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
}
else {
  beingReturn =  `https://mysocial-1473059facea.herokuapp.com${picture}`;
}
//console.log(beingReturn);
return beingReturn;
}
return(<>
  <NavBar />
  <div id="all">
    <div id="searchBar">
      <i id="glasses" className="bi bi-search" style={{ height: '100px' }}></i>
      <input
        type="text"
        id="searchInput"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button>Search</button>
    </div>
    {(() => {
      if (username==='User not found') {
        return (
          <div>
            <h2>User Not Found.</h2>
          </div>
        );
      }
      else {
        return(

          <div>
            <img src = {userAvatar(username.pictureUrl)} style ={{height:'50px',width:'50px'}} /><p id ='searchedUser'>
            <a class="nav-link" > {username.username} </a>
</p>


          </div>


        	)

      }
      // Add more conditions or return JSX for other cases if needed
    })()}
  </div>
</>
	)
}
export default Search;