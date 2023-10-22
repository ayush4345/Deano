import React, { useState } from "react";
import { getAddress } from "viem";
import { useAccount } from 'wagmi'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { Combobox } from "./Combobox"

const ChatBox = ({ client, messageHistory, conversation, setShowContactList, selectedContact, peer, contactList }) => {

  const { address } = useAccount()
  const [inputValue, setInputValue] = useState("");

  function getTimeDifference(timeString) {
    const providedTime = new Date(timeString);
    const currentTime = new Date();

    const timeDifference = currentTime - providedTime;

    const secondsDifference = timeDifference / 1000;
    const minutesDifference = secondsDifference / 60;
    const hoursDifference = minutesDifference / 60;
    const daysDifference = hoursDifference / 24;

    if (daysDifference >= 1) {
      return Math.floor(daysDifference) + " day(s) ago";
    } else if (hoursDifference >= 1) {
      return Math.floor(hoursDifference) + " hour(s) ago";
    } else if (minutesDifference >= 1) {
      return Math.floor(minutesDifference) + " minute(s) ago";
    } else {
      return Math.floor(secondsDifference) + " second(s) ago";
    }
  }

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
        <ul className=" m-2 p-3 overflow-y-scroll no-scrollbar max-h-[500px] max-w-[500px] ">
          {messages.map((message, index) => (

            <li
              key={message.id}
              className={`m-2 p-2 rounded-t-lg ${getUserName(message) === "You" ? "text-right rounded-l-lg bg-[#D35F70] text-white" : "text-left rounded-r-lg bg-[#FEECEB]"}`}
            >
              <div className="flex flex-col ">
                <strong className="text-green-900">
                  {/* {getUserName(message)} */}
                </strong>
                <span className="flex-wrap">{message.content}</span>
                <span className="text-[9px] text-[#34090B]"> {getTimeDifference(message.sent)}</span>
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
    <div className="flex flex-col items-center">

      <div className=" mx-auto w-full flex flex-col justify-center py-3 items-center rounded-t-lg shadow-sm">
        <h1 className="font-semibold text-[#2b5174] text-[24px] ">Chat with {peer}</h1>
        {contactList.length > 0 && <Combobox contactList={contactList}/>}
      </div>

      {/* div for the Message List */}
      <div className="">
        <MessageList messages={messageHistory} />
      </div>

      {/* div for the Input and Send Button */}

      <div className=" m-auto mx-5 mb-5 bg-slate-50 rounded-md border-2 border-transparent focus-within:border-2 focus-within:border-[#2b5174] flex items-center justify-center">
        <input
          type="text"
          className="p-3 w-full bg-slate-50 rounded-md outline-none "
          onKeyPress={handleInputChange}
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="p-3 m-1 bg-[#2b5174] border-2 border-white rounded-md hover:bg-[#5a2895] transition-all duration-300 ease-in-out text-white ">
          <PaperPlaneIcon />
        </button>
      </div>

    </div>
  );
}

export default ChatBox;