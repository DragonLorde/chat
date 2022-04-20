import React, {useState, useEffect, useRef, } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import Logout from './Logout';
import axios from 'axios';
import {getAllMessage, sendMessageRoute} from '../utils/APIroutes';
import { v4 as uuidv4 } from 'uuid';

export default function ChatContainer({curentChat, currentUser,socket}) {

    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [arraivalMessage, setArraivalMessage] = useState(null);


    useEffect( async() => {
        if(curentChat) {
            const response = await axios.post(getAllMessage, {
                from: currentUser._id,
                to: curentChat._id
            })
            setMessages(response.data);
        }
    }, [curentChat])

    const handleSendMsg = async (msg) => {
        console.log(socket)
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to:curentChat._id,
            message:msg,
        })
        socket.current.emit("send-msg" , {
            to:curentChat._id,
            from:currentUser._id,
            message:msg,
        })

        const msgs = [...messages];
        msgs.push({fromSelf:true, message:msg})
        setMessages(msgs)
    };

    useEffect(() => {
        if(socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArraivalMessage({fromSelf:false,message:msg});
            })
        }
    })

    useEffect(() => {
        arraivalMessage && setMessages((prev) => [...prev, arraivalMessage]);
    },[arraivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour:"smooth"})
    }, [messages])

    return (
        <>
            {
                curentChat && (
                    <Container>
                        <div className='chat-header'>
                            <div className='user-details'> 
                                <div className='avatar'>
                                    <img  src={`data:image/svg+xml;base64,${curentChat.avatarImage}`} alt="avatar" />    
                                </div>
                                <div className='username'>
                                    <h3>{ curentChat.username }</h3>
                                </div>
                            </div>
                            <Logout/>
                        </div>
                        <div className="chat-messages">
                            {messages.map((message) => {
                                return (
                                    <div ref={scrollRef} key={uuidv4()}>
                                        <div
                                            className={`message ${
                                            message.fromSelf ? "sended" : "recieved"
                                            }`}
                                        >
                                            <div className="content ">
                                            <p>{message.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <ChatInput handleSendMsg={handleSendMsg}/>
                    </Container>
                )
            }
        </>
    )
}


const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 78% 14.5%;
    gap: 0.1rem;
    overflow:hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-auto-rows: 15% 70% 15%;
    }
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 4rem;
                }
            }
            .username {
                h3 {
                    color: white;
                    font-size: 2rem;
                }
            }
        }

    }
    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        .message {
            display: flex;
            align-items: center;
            .content {
                padding: 1.2rem;
                font-size: 2rem;
                max-width: 40%;
                overflow-wrap: break-word;
                border-radius: 1rem;
                color: white;
            }
        }
        .sended {
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }
        .recived {
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
    }
`;