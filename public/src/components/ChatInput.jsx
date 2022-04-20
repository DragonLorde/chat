import React, {useState} from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';


export default function ChatInput({handleSendMsg}) {


    const [showEmojiPicker , setEmojiPiker] = useState(false);
    const [msg,setMsg] = useState("");
    
    const handleEmojiPikerHideShow = () => {
        setEmojiPiker(!showEmojiPicker);

    }

    const handlEmojiCLick = (event, emoji) => {
        let meassege = msg;
        meassege += emoji.emoji;
        setMsg(meassege);
    }

    const sendChat = async (event) => {
        event.preventDefault();
        if(msg.length > 0) {
            console.log(msg)
            handleSendMsg(msg);
            setMsg("")
        }
    } 

    return <Container>
        <div className='button-container'>
            <div className='emoji'>
                <BsEmojiSmileFill onClick={ handleEmojiPikerHideShow }/>
                {
                    showEmojiPicker && <Picker onEmojiClick={handlEmojiCLick}/>   
                }
            </div>
        </div>
        <form className='input-container' onSubmit={ (e) => sendChat(e) }>
            <input type="text"  placeholder='type your message here...' value={msg} onChange={ (e) => setMsg(e.target.value) } />
            <button className='submit'>
                <IoMdSend />
            </button>
        </form>
    </Container>
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #27292E;
    padding:0 2rem ;
    padding-bottom: 0.3rem;
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 2.5rem;
                color: white;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: absolute;
                top: -350px;
            }
        }
    }
    .input-container {
        width: 100%;
        box-sizing: 2rem;
        display: flex;
        align-content: center;
        border-radius: 2rem ;
        gap: 2rem;
        background-color: white;
        input {
            width: 90%;
            height: 60%;
            background: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.4rem;
            &::selection {
                background-color: #9186f3;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 1.3rem 4rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            svg {
                font-size: 3rem;
                color:white;
            }
        }
    }
`;