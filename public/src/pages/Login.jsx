import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.svg'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import  axios from 'axios';
import { loginRoute } from '../utils/APIroutes';

function Login() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password:"",
    });

    useEffect(() => {
      if(localStorage.hasOwnProperty('chat-app-user')) {
        navigate('/')
      }
    } , []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidathion()) {
            const {password, username} = values;
            console.log(values)
            const {data} = await axios.post(loginRoute, {
                username,
                password
            });
            if(data.status === false ) {
                toast.error(data.msg, toastOpthions);
            }
            if(data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/");  
            }
        }
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    };

    const toastOpthions = {
        position: 'bottom-right',
        autoClose:8000,
        draggable:true,
        theme:"dark"
    }

    const handleValidathion = () => {
        const {password, username} = values;
        if(password === ""){
          toast.error("Email and paswword is required" , toastOpthions);
          return false;
        } else if(username === "") {
          toast.error("Email and paswword is required" , toastOpthions);
          return false;
        }
        return true;
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>Real <br/> Chat</h1>
                    </div>
                    <input 
                        type="text"  
                        placeholder='Username' 
                        name='username' 
                        onChange={event => handleChange(event)}
                        min="3"
                    />
                    <input 
                        type="password"  
                        placeholder='Pasword' 
                        name='password' 
                        onChange={event => handleChange(event)}
                    />
                    <button type='submit'>Login In</button>
                    <span>
                        Don`t hane an accoutn ?   
                            <Link to="/register">
                                Register  
                            </Link> 
                    </span>  
                </form>
            </FormContainer>
            <ToastContainer/>
        </>   
    )
}

const FormContainer = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    flex-direction:column;
    gap:1rem;
    align-items: center;
    background-color:#161819;
    .brand {
        display:flex;
        gap:1rem;
        justify-content:center;
        align-items:center;
        
        img {
            height:6rem;
        }
        h1 {
            font-weight: bold;
            font-size: 40px;
            color: #FFFFFF;
        }
    }
    form {
        display:flex;
        flex-direction:column;
        gap: 2rem;
        background: #27292E;
        border-radius: 25px;
        padding:3rem 6rem;
        justify-content:center;
        align-items:center;
        input {
            width:100%;
            background-color:white;
            padding: 1rem;
            color:black;
            font-size: 20px;
            border-radius:12px;
            border: 0.25rem solid #4e0eff;
            &:focus {
                border: 0.25rem solid #997af0;
                outline: none;
            }
        }
        button {
            width: 100%;
            background: #FFFFFF;
            border-radius: 12px;
            font-size: 20px;
            padding: 1rem;
            border-radius:12px;
            cursor: pointer;
            font-weight:bold ;
            text-transform:uppercase;
            transition:0.5s ease-in-out;
            &:hover {
                background-color:#4e0eff;
                color:white ;
            }
        }
        span {
            color:white;
            text-transform:uppercase;
            a {
                margin-left: 4px ;
                color: #4e0eff;
                text-decoration: none;
                font-weight:bold ;
            }
            
        }
    }
`; 

export default Login;