import io from 'socket.io-client';
import {useEffect, useState} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
const Messages_prototype = ()=>{
	const location = useLocation();
	const Receiver = location.state.nameData;
	const [user,setUser] = useState('');
  const [socket, setSocket] = useState();
  const [messageBox, setMessageBox] = useState('');
  const [messages, setMessages] = useState([]);
  console.log('Before socket connection attempt');
    const socketConnection = io.connect('http://localhost:3001');
useEffect(()=>{

socketConnection.on('connect_error', (error) => {
    console.error('Error connecting to socket:', error);
});
socketConnection.on('message',(message)=>{
setMessages((prevMessage)=>[...prevMessage,message])
});

setSocket(socketConnection);
 return () => {
      socketConnection.disconnect();
    };

},[]);


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

},[user]);




const handleInput = ()=>{
//event.preventDefault();
 const text = messageBox.trim();
 if(text&&socket){
 	   const senderUsername = user; 
      const receiverUsername = Receiver;

socket.emit('sendMessages',{sender:senderUsername,receiver:receiverUsername,text},(error)=>{
	 if (error) {
          console.error(error);
        } else {
          // Clear the message box after sending
          setMessageBox('');
        }
})


 }

}


  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{`${message.sender}: ${message.text}`}</li>
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
export default Messages_prototype;