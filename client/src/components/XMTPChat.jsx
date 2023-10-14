"use client"
import React, {useState, useRef, useEffect} from 'react'
import { useAccount } from "wagmi"
import {Client} from "@xmtp/xmtp-js"
import ChatBox from '@/components/ChatBox'

const BOT_ADDRESS = "0x937C0d4a6294cdfa575de17382c7076b579DC176"


const XMTPChat = () => {
    const { address } = useAccount()
    const [currentAccount, setCurrentAccount] = useState("");
    const [messages, setMessages] = useState(null);
    const convRef = useRef(null);
    const clientRef = useRef(null);
    const [signer, setSigner] = useState(null);
    const [isOnNetwork, setIsOnNetwork] = useState(false);

    console.log("HI i am vendor address :",address)

    useEffect(() => {
        if (isOnNetwork && convRef.current) {
          const streamMessages = async () => {
            const newStream = await convRef.current.streamMessages();
            for await (const msg of newStream) {
              const exists = messages.find((m) => m.id === msg.id);
              if (!exists) {
                setMessages((prevMessages) => {
                  const msgsnew = [...prevMessages, msg];
                  return msgsnew;
                });
              }
            }
          };
          streamMessages();
        }
      }, [messages, isOnNetwork]);

      const newConversation = async function (xmtp_client, addressTo) {
        if (await xmtp_client?.canMessage(PEER_ADDRESS)) {
          const conversation = await xmtp_client.conversations.newConversation(
            addressTo
          );
          convRef.current = conversation;
          const messages = await conversation.messages();
          setMessages(messages);
        } else {
          console.log("Can't message because is not on the network.");
        }
      };

      const initXmtp = async function () {
        const xmtp = await Client.create(signer, { env: "production" });
        newConversation(xmtp, PEER_ADDRESS);
        setIsOnNetwork(!!xmtp.address);
        clientRef.current = xmtp;
      };

  return (
    <section className="w-full h-screen flex justify-center">
    {!currentAccount && (
      <section className="mt-4">
        <p>Not Logged In</p>
      </section>
    )}
    {currentAccount && (
      <section className="w-full h-full flex justify-center">
        {currentAccount && !isOnNetwork && (
          <section className="mt-6">
            <button
              onClick={initXmtp}
              className="bg-lime-600 hover:bg-lime-500 px-8 py-2 text-slate-100 rounded-3xl uppercase"
            >
              Connect to XMTP
            </button>
          </section>
        )}
        {currentAccount && isOnNetwork && messages && (
          <ChatBox
            client={clientRef.current}
            conversation={convRef.current}
            messageHistory={messages}
          />
        )}
      </section>
    )}
  </section>
  )
}

export default XMTPChat