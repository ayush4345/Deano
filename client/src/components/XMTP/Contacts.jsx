import React, { useState, useEffect } from 'react'
import { init, useLazyQueryWithPagination, fetchQuery } from "@airstack/airstack-react";

init("29e4514124794cfba1002e869484a59e");

const Contacts = (props) => {
  const [contacts, setContacts] = useState([]);
  const [profileName, setProfileName] = useState("");
  const [results, setResults] = useState([]);
  const [variables, setVariables] = useState({
    name: ""
  })

  const lensQuery = `query LensUser($name: Identity!) {
    Wallet(input: {identity: $name, blockchain: ethereum}) {
      addresses
    }
  }`

  const fcQuery = `query FarcasterUser($name: Identity!)  {
    Wallet(input: {identity: $name, blockchain: ethereum}) {
      addresses
    }
  }`

  const [fetchLensUser, { data: lensData, loading: lensLoading, pagination: lensPagination }] = useLazyQueryWithPagination(
    lensQuery, variables
  );

  const [fetchFCUser, { data: fcData, loading: fcLoading, pagination: fcPagination }] = useLazyQueryWithPagination(
    fcQuery, variables
  );

  useEffect(() => {
    resolveContactsAndProfiles();
  }, []);

  const resolveSocial = async (address) => {
    const newQuery = ` 
    query MyQuery {
      Wallet(
        input: {identity: "${address}", blockchain: ethereum}
      ) {
        socials {
          dappName
          profileName
        }        
      }
    }
    `
    const response = await fetchQuery(newQuery)  
    
    if(response.data.Wallet.socials && response.data.Wallet.socials.length > 0) {
      return response?.data?.Wallet?.socials[0].profileName 
    }
    return "No web3 profile"
  }

  const resolveContactsAndProfiles = async () => {
    const results = await props.loadConversations()
    let existingContacts = [];
    for(const r of results) {
      existingContacts.push({
        profileName: await resolveSocial(r.peerAddress),
        address: r.peerAddress
      })    
      console.log(existingContacts)  
    }   
    setContacts(existingContacts)
  }
  
  const searchForUsers = async function() {
    let res;
    if(profileName.includes(".lens")) {
      res = await fetchLensUser(variables);
    } else {
      res = await fetchFCUser(variables);
    }

    setResults(res?.data?.Wallet?.addresses || []);
  }

  const handleInputChange = (e) => {
    setResults([]);
    setProfileName(e.target.value);  
    setVariables({
      name: e.target.value.includes(".lens") ? e.target.value : `fc_fname:${e.target.value}`
    })  
  }



  const setContactDetails = (contact) => {
    const clonedContacts = JSON.parse(JSON.stringify(contacts));
    clonedContacts.push(contact);
    setContacts(clonedContacts);
    localStorage.setItem('airstack-contacts', JSON.stringify(clonedContacts));
    localStorage.setItem('airstack-current-contact', JSON.stringify(contact));
    props.setSelectedContact(contact);
    props.setShowContactList(false);
  }

  const selectExistingContact = (contact) => {
    props.setSelectedContact(contact);
    props.setShowContactList(false);
  }

  const SearchResults = () => {
    return (
      <div className={styles.SearchResults}>
        <h3>{profileName}</h3>
        {
          results.map(r => {
            return (
              <div key={r}>
                <button onClick={() => setContactDetails({profileName, address: r})} key={r}>{r}</button>
              </div>
            )
          })
        }
      </div>           
    )
  }

  return (
    <div >
      <div>
        <input
          type="text"
          
          onChange={handleInputChange}
          value={profileName}
          placeholder="Search for new Lens or Farcaster contacts"
        />
        <button onClick={searchForUsers}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
        {
          results.length > 0 && profileName && 
          <SearchResults />
        }
        <div>
          {
            contacts?.map((c) => {
              return (
                <div onClick={() => selectExistingContact(c)} key={c.address}>
                  <h3>{c.profileName || "No name set"}</h3>
                  <p>{c.address}</p>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default Contacts