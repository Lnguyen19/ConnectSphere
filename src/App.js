import logo from './logo.svg';
import Sidebar from './sidebar';
import Register from './register';
import Login from './login';
import MainPage from './mainPage';
import Followers from './followers';
import Profile_view from './profile_view';
import Self_profile from './self_profile';
import Following from './following';
import Message_prototype from './messages';
import All_Messages from './all_messages';
import Search from './search';
import Friends_post from './friends_post'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
       <Router>
    
        <Routes>
          <Route path = "/" element = {<Login/>}/>
          <Route path="signup" element={<Register/>} />
          <Route path = 'main' element = {<MainPage/>}/>
          
          <Route path = "self" element = {<Self_profile/>}/>
         
           <Route path ="dm" element = {<Message_prototype/>}/>
           <Route path = "follower" element = {<Followers/>}/>
           <Route path = "following" element = {<Following/>}/>
           <Route path ="profile_view" element = {<Profile_view/>}/>
           <Route path = "inbox" element = {<All_Messages/>}/>
           <Route path = "search" element = {<Search/>}/>
           <Route path = "friends" element = {<Friends_post/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
