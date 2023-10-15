import React, { useState } from "react";

import { getAddress } from "viem";

import { useAccount } from 'wagmi'

import { PaperPlaneIcon } from '@radix-ui/react-icons'

const ChatBox = ({ client, messageHistory, conversation, setShowContactList, selectedContact }) => {

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
      return "Vendor" 
    } else if(selectedContact && selectedContact.address) {
      return "Vendor"
    } else {
      return "Vendor"
    }    
  }

    return (
<div className=" ">
      <ul className=" m-2 p-3  overflow-y-scroll no-scrollbar max-h-[500px] max-w-[500px] ">
        {messages.map((message, index) => (
          
          <li
            key={message.id}
            className={`m-2 p-2 border-2 rounded-md ${getUserName(message) === "You" ? " text-right bg-green-200" : "text-left bg-white"}`}
            >

              <div className="flex flex-col ">

            <strong className="text-green-900">
              {/* {getUserName(message)} */}
            </strong>

            <span className="flex-wrap">{message.content}</span>

            <span className="text-[12px]"> ({message.sent.toLocaleTimeString()})</span>


              </div>



            
          </li>
        ))}
      </ul>

</div>
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

      <h1 className="font-bold text-white mx-auto flex justify-center items-center text-[30px] m-1 p-1">Chat with Vendor</h1>

      {/* <button onClick={() => setShowContactList(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button> */}

{/* div for the Message List */}
      <div className="">
        <MessageList messages={messageHistory}/>
      </div>

{/* div for the Input and Send Button */}

      <div className="m-2 p-2 flex items-center justify-center">
        <input
          type="text"
          className="p-3 m-4 w-full border-2 border-white rounded-md"
          onKeyPress={handleInputChange}
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="p-3 m-1 bg-rose-600 border-2 border-white rounded-md hover:bg-green-500 transition-all duration-300 ease-in-out text-white ">
          <PaperPlaneIcon />
        </button>
      </div>



    </div>
  );
}

export default ChatBox;