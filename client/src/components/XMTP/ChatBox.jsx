import React, { useState } from "react";

import { getAddress } from "viem";
import { useAccount } from 'wagmi'

function ChatBox({ client, messageHistory, conversation, setShowContactList, selectedContact }) {
  // const address = getAddress();
  const { address } = useAccount()
  const [inputValue, setInputValue] = useState("");

  // Function to handle sending a message
  const handleSend = async () => {
    if (inputValue) {
      await onSendMessage(inputValue);
      setInputValue("");
    }
  };

  // Function to handle sending a text message
  const onSendMessage = async (value) => {
    return conversation.send(value);
  };

  // MessageList component to render the list of messages
  const MessageList = ({ messages }) => {
    // Filter messages by unique id
    messages = messages.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
    );

  const getUserName = (message) => {
    if(message.senderAddress === address) {
      return "You"
    } else if(selectedContact && selectedContact.profileName !== "No web3 profile") {
      return selectedContact.profileName
    } else if(selectedContact && selectedContact.address) {
      return selectedContact.address
    } else {
      return 
    }    
  }

    return (
      <ul className="messageList">
        {messages.map((message, index) => (
          <li
            key={message.id}
            className="messageItem"
            title="Click to log this message to the console">
            <strong>
              {getUserName(message)}:
            </strong>
            <span>{message.content}</span>
            <span className="date"> ({message.sent.toLocaleTimeString()})</span>
            <span className="eyes" onClick={() => console.log(message)}>
              👀
            </span>
          </li>
        ))}
      </ul>
    );
  };

  // Function to handle input change (keypress or change event)
  const handleInputChange = (event) => {
    if (event.key === "Enter") {
      handleSend();
    } else {
      setInputValue(event.target.value);
    }
  };
  return (
    <div>
      <button onClick={() => setShowContactList(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <div >
        <MessageList messages={messageHistory} />
      </div>
      <div >
        <input
          type="text"
          
          onKeyPress={handleInputChange}
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Type your text here "
        />
        <button onClick={handleSend}>
          &#128073;
        </button>
      </div>
    </div>
  );
}

export default ChatBox;