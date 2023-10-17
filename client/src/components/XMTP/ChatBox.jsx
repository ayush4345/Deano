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
      if (message.senderAddress === address) {
        return "You"
      } else if (selectedContact && selectedContact.profileName !== "No web3 profile") {
        return "Vendor"
      } else if (selectedContact && selectedContact.address) {
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
              className={`m-2 p-2 rounded-t-lg ${getUserName(message) === "You" ? "text-right rounded-l-lg bg-[#3D5A66] text-white" : "text-left rounded-r-lg bg-white"}`}
            >
              <div className="flex flex-col ">
                <strong className="text-green-900">
                  {/* {getUserName(message)} */}
                </strong>
                <span className="flex-wrap">{message.content}</span>
                <span className="text-[12px] text-[#81A8B1]"> {message.sent.toLocaleTimeString()}</span>
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

      <h1 className="font-semibold text-[#202009] bg-[#E9ECED] mx-auto w-full flex justify-center items-center text-[24px] rounded-t-lg shadow-md">chat with vendor</h1>

      {/* <button onClick={() => setShowContactList(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button> */}

      {/* div for the Message List */}
      <div className="">
        <MessageList messages={messageHistory} />
      </div>

      {/* div for the Input and Send Button */}

      <div className=" m-auto mx-5 mb-5 bg-slate-50 rounded-md border-2 border-transparent focus-within:border-2 focus-within:border-[#6796A2] flex items-center justify-center">
        <input
          type="text"
          className="p-3 w-full bg-slate-50 rounded-md outline-none "
          onKeyPress={handleInputChange}
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="p-3 m-1 bg-[#62929E] border-2 border-white rounded-md hover:bg-[#466972] transition-all duration-300 ease-in-out text-white ">
          <PaperPlaneIcon />
        </button>
      </div>



    </div>
  );
}

export default ChatBox;