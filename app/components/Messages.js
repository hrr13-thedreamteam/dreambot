import React from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:1337');

const Messages = ({messages}) => {
      return (
        <div> Hello from DreamBot:

      {messages.map(message => {
        return <span> <br/> {message.text} </span>
      })}

      </div>
    )
}

export default Messages;
