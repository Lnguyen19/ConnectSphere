import io from 'socket.io-client';
import {useEffect, useState} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
const Inbox_messages= (Receiver)=>{
	const location = useLocation();
   //const Receiver = receiver;
  //const Receiver = location.state.nameData;
  const [user,setUser] = useState('');
  const [socket, setSocket] = useState();
  const [messageBox, setMessageBox] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState([]);

  //  const socketConnection = io.connect('http://localhost:3001');


  
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

},[]);
//useEffect(() => {
//  const fetchConversation = async () => {
//    try {
 //     const response = await axios.get(`http://localhost:3001/conversation/${user}/${Receiver}`);
  //    if (response.data) {
   //     setConversation(response.data);
    //  }
   // } catch (error) {
   //   console.error('Error fetching conversation:', error);
   // }
  //};
  //const intervalId = setInterval(fetchConversation, 2000); 
  //fetchConversation();
  //return () => {
   // clearInterval(intervalId); 
  //};
//}, [user, Receiver]);

// ...

useEffect(() => {
  const fetchConversation = async () => {
    try {
      console.log('Fetching conversation for user:', user, 'and Receiver:', Receiver);
      const responseSender = await axios.get(`http://localhost:3001/conversation/${user}/${String(Receiver.receiver)}`);
      const responseReceiver = await axios.get(`http://localhost:3001/conversation/${String(Receiver.receiver)}/${user}`);
      setConversation(prevConversation => {
        const updatedConversation = [...prevConversation];
        responseSender.data.forEach(message => {
          if (!updatedConversation.find(m => m._id === message._id)) {
            updatedConversation.push(message);
          }
        });
        responseReceiver.data.forEach(message => {
          if (!updatedConversation.find(m => m._id === message._id)) {
            updatedConversation.push(message);
          }
        });
        updatedConversation.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        return updatedConversation;
      });
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };
  const intervalId = setInterval(fetchConversation, 2000);
  fetchConversation();

  return () => {
    clearInterval(intervalId);
  };
}, [user, Receiver]);

// ...



const handleInput = ()=>{
//event.preventDefault();
axios.post(`http://localhost:3001/send_messages`,{
text:messageBox,
sender:user,
receiver: Receiver.receiver,
},{withCredentials:true}).then(response=>{
console.log(`${user} sent ${Receiver} a message`);
}).catch(error=>{
  console.log('there was an issue');
})

}
  return (
    <div>
      <ul>
        {conversation.map((message, index) => (
          <h3 key={index}>{`${message.sender}: ${message.text}`}</h3>
        ))}
      </ul>
      
        <input
          type="text"
          value={messageBox}
          onChange={(e) => setMessageBox(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit"  onClick={()=>handleInput()}>Send</button>  
    </div>
  );
}
export default Inbox_messages;