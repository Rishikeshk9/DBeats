
import  Track from './component/track.component';
import  Switch from './component/switch.component';
import logo from './logo.svg';
import './App.css';
import Navbar from './component/navbar.component';
import Form from './component/form.component';
import Switcher from './component/switcher.component';
import Connection from './component/connection.component';
import '../node_modules/noty/lib/noty.css';

import '../node_modules/noty/lib/themes/metroui.css';
import React, { Component } from 'react';
import Web3 from 'web3';
import useWeb3Modal from "./hooks/useWeb3Modal";

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal}) {
  
  return (
    <div>
      <button
      className="btn"
      style={{margin: "20px"}}
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } 
        else {
          logoutOfWeb3Modal();
        }
      }}
    >

      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </button>
    
    {provider ? <p>{provider.provider.selectedAddress}</p> : <div></div>}
    </div>
    
    
  );
}
function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  return (
    <div className="bg-blue-50">
     

 
      <Switcher />
      <Connection />
       <div className="">
        <WalletButton
          provider={provider}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
        />
      </div>
      
    </div>
  );
}

export default App;
