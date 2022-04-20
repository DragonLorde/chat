import React from 'react';
import styled from 'styled-components';
import hello from "../assets/Hello.gif";

export default function Welcome({currentUser}) {
  return <Container>
      <img src={hello} alt="hello" />
      <h1>
          Welcome, <span> {currentUser.username} </span>
      </h1>
      <h3>
          Please select chat
      </h3>
  </Container>
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    font-size: 28px;
    img {
        height: 30rem;
    }
    span {
        color: #4e00ff;
    }
`;
