import React from 'react';
import QuoraHeader from './QuoraHeader';
import SideBar from './SideBar';
import Feed from './Feed';
import Widget from './Widget';
import "./css/Quora.css";

function Quora() {
  return (
    <div className="quora">
      <QuoraHeader/>
      <div className="quora-contents">
        <div className="quora-content">
            <SideBar/> 
            <Feed/>
            <Widget/>
        </div>
      </div>
    </div>
  )
}

export default Quora
