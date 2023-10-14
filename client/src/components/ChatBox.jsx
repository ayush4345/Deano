import React, { useState } from "react";

const ChatBox = ({ client, messageHistory, conversation }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = async () => {
    if (inputValue) {
      await onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const onSendMessage = async (value) => {
    return conversation.send(value);
  };

  const MessageList = ({ messages }) => {
    messages = messages.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );

    return (
      <ul>
        {messages.map((message, index) => (
          <li
            key={message.id}
            className="relative my-1 py-2 pl-2 odd:bg-lime-600 odd:text-slate-100 rounded-lg"
            title="Click to log this message to the console"
          >
            <strong>
              {message.senderAddress === client.address ? "You" : "Bot"}:{" "}
            </strong>
            <span>{message.content}</span>
            <span className="absolute right-2 bg-slate-200 text-black rounded-full px-2">
              {" "}
              {message.sent.toLocaleTimeString()}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const handleInputChange = (event) => {
    if (event.key === "Enter") {
      handleSend();
    } else {
      setInputValue(event.target.value);
    }
  };

  return (
    <section className="w-1/2 h-5/6 flex flex-col justify-between bg-white mt-4 rounded-lg">
      <section className="flex-1 flex-col-reverse items-start overflow-y-auto p-2">
        <MessageList messages={messageHistory} />
      </section>
      <section className="flex items-center p-2 border-t-2">
        <input
          type="text"
          onKeyUp={handleInputChange}
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Type your text here "
          className="w-5/6 h-10 outline-none"
        />
        <button
          onClick={handleSend}
          className="w-1/6 h-10 bg-lime-600 hover:bg-lime-500 text-slate-100 cursor-pointer"
        >
          SEND
        </button>
      </section>
    </section>
  );
}

export default ChatBox;