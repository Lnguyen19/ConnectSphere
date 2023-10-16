import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './navBar';
import Inbox_messages from './inbox_messages';
import './all_messages.css';

const All_Messages = () => {
  const [recentConversations, setRecentConversations] = useState([]);
  const [user, setUser] = useState('');
  const [selectedUser,setSelectedUser] = useState('none');
  useEffect(()=>{
    console.log(selectedUser);
  },[selectedUser]);
  useEffect(() => {
    axios.post("https://mysocial-1473059facea.herokuapp.com/currentSession", { withCredentials: true })
      .then((response) => {
        if (response.data.username) {
          console.log(`the current user is ${response.data.username}`);
          setUser(response.data.username);
        } else {
          console.log(response.data);
          console.log("something else is wrong");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [user]);

  useEffect(() => {
    axios.get(`https://mysocial-1473059facea.herokuapp.com/recentConversation?username=${user}`, { withCredentials: true })
      .then(response => {
        console.log('Full response from the server:', response);
        if (response.data) {
          
          const filteredConversations = response.data.reduce((acc, convo) => {
            const existingConvo = acc.find(item => item.username === convo.username);
            if (!existingConvo || existingConvo.timestamp < convo.timestamp) {
              acc = acc.filter(item => item.username !== convo.username);
              acc.push(convo);
            }
            return acc;
          }, []);
          setRecentConversations(filteredConversations);

          console.log("Filtered data:", filteredConversations);
        } else {
          console.log('something is wrong with the response');
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [user]);

  return (
    <>
      <NavBar/>
      <div id='whole'>
        <div className="sidebaropen">
          {recentConversations.length === 0 ? (
            <div>
              <h2>No Conversation Found</h2>
            </div>
          ) : (
            recentConversations.map((convo, index) => (
              <ul className='list-group' id={index} key={index}>
                <div id='recent'>
                  <li className='bar'>
                   <a class="nav-link"   onClick={() => setSelectedUser(convo.username)}> {convo.username} </a>at: {convo.timestamp} <i className="bi bi-chat-square-dots"></i>
                    <p>Text: {convo.text}</p>
                  </li>
                </div>
              </ul>
            ))
          )}

        </div>
<div id = 'rightSideMessage'>
{
  (()=>{
   if(selectedUser==='none'){
    return(<div>
    <h2>
    No user selected
    </h2>

      </div>)
   }
   else {
    return(
   <div>
   <h2>
   <Inbox_messages receiver = {selectedUser}/>
   </h2>

   </div>


      )
   }


  })()}


</div>
      </div>
    </>
  );
};

export default All_Messages;
