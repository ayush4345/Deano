"use client"

import { ConnectButton } from '@rainbow-me/rainbowkit'

import { Client, createClient } from "@xmtp/xmtp-js";
import { usePublicClient, useWalletClient } from 'wagmi'
import { WalletClient } from 'wagmi';

import React, { useEffect, useState, useRef } from "react";
import ChatBox from "@/components/XMTP/ChatBox"
import { useAccount } from 'wagmi'
import { useSigner } from '../../hooks/useSigner';

import Contacts from "./Contacts"

const BOT_ADDRESS = "0x937C0d4a6294cdfa575de17382c7076b579DC176";

export default function XMTPChat() {
  const [messages, setMessages] = useState(null);
  const convRef = useRef(null);
  const clientRef = useRef(null);
  const { address } = useAccount()
  const signer = useSigner()
  const isConnected = !!signer;
  const [isOnNetwork, setIsOnNetwork] = useState(false);
  const [showContactsList, setShowContactList] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null)

  // Function to load the existing messages in a conversation
  const newConversation = async function (xmtp_client, addressTo) {
    //Creates a new conversation with the address
    if (await xmtp_client?.canMessage(addressTo)) {
      const conversation = await xmtp_client.conversations.newConversation(
        addressTo,
      );
      convRef.current = conversation;
      //Loads the messages of the conversation
      const messages = await conversation.messages();
      setMessages(messages);
    } else {
      alert("The contact you searched for can't be messaged because they are not on the xmtp network.");
      //cant message because is not on the network.
    }
  };

  const loadConversations = async () => {
    const conversations = await clientRef.current.conversations.list()
    return conversations
  }

  // Function to initialize the XMTP client
  const initXmtp = async function () {
    const startConvo = async(contactToInit) => {
      console.log("Hi i was called from the initXMTP")
      console.log(address)
      console.log(signer)
      const xmtp = await Client.create(signer, { env: "production" });
      console.log("connected till here")
      //Create or load conversation with Gm bot
      newConversation(xmtp, contactToInit.address);
      // Set the XMTP client in state for later use
      setIsOnNetwork(!!xmtp.address);
      //Set the client in the ref
      clientRef.current = xmtp;
    }


    if(selectedContact) {
      startConvo(selectedContact);
    }  else {
      startConvo({address: BOT_ADDRESS})
    }  
  };

  useEffect(() => {
    if (isOnNetwork && convRef.current) {
      // Function to stream new messages in the conversation
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
      loadConversations();  
    }
  }, [messages, isOnNetwork]);

  useEffect(() => {
    const startConvo = async() => {
      const xmtp = await Client.create(signer, { env: "production" });
      //Create or load conversation with Gm bot
      newConversation(xmtp, selectedContact.address);
      // Set the XMTP client in state for later use
      setIsOnNetwork(!!xmtp.address);
      //Set the client in the ref
      clientRef.current = xmtp;
    }


    if(selectedContact) {
      startConvo();
    }
  }, [selectedContact]);

  return (
    <div>
      {/* Display the ConnectWallet component if not connected */}


      {!isConnected && (
        <div className='border-2 flex flex-col items-center justify-center w-fit mx-auto'>
          <ConnectButton></ConnectButton>
        </div>
      )}


      {/* Display XMTP connection options if connected but not initialized */}


      {isConnected && !isOnNetwork && (
        <div className='flex flex-col items-center justify-center w-fit mx-auto'>
          {/* <ConnectButton></ConnectButton> */}
          <button onClick={initXmtp} className=' bg-black text-white font-bold rounded-md p-3 m-2 hover:bg-rose-600 transition-all duration-300 ease-in-out'>
            Enable XMTP Identity
          </button>


        </div>
      )}



      {/* Render the Chat component if connected, initialized, and messages exist */}
      {isConnected && isOnNetwork && messages && !showContactsList ? (
        <div className='border-2 flex flex-col items-center justify-center w-fit mx-auto bg-black  rounded-lg m-2'>
          <ChatBox
            client={clientRef.current}
            conversation={convRef.current}  
            messageHistory={messages}
            selectedContact={selectedContact}
            setShowContactList={setShowContactList}
          />
        </div>
      ) : isConnected && isOnNetwork && messages &&
        (
          <Contacts loadConversations={loadConversations} setSelectedContact={setSelectedContact} setShowContactList={setShowContactList} />
        )
      }
    </div>
  );
}