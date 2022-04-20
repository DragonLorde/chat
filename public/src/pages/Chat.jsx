import React , {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIroutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import io from 'socket.io-client';

function Chat() {

  const socket = useRef();

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [curentChat, setCurrentChat] = useState(undefined);
  const [isLoaded , setIsLoaded] = useState(false);

  useEffect( async () => {
    if(!localStorage.hasOwnProperty('chat-app-user')) {
      navigate('/login')
    } else {
      setCurrentUser( await JSON.parse(localStorage.getItem('chat-app-user')));
      setIsLoaded(true);
    }
  },[])
  useEffect( async () => {
    if(currentUser) {
      if(currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate('/setAvatar');
      }
    }
  },[currentUser]);

  useEffect(() => {
    if(currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
      console.log(socket)
    }
  }, [currentUser])
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <Container>
      <div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        {
          isLoaded && curentChat === undefined ? (
            <Welcome
            currentUser={currentUser}
            />
          ) : (
            <ChatContainer curentChat={curentChat} currentUser={currentUser} socket={socket}/>
          )
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
  gap: 1rem;
  background-color: #161819;
  .container {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat