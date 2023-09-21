import React from 'react'
import { Icon } from 'web3uikit'
import { Link } from 'react-router-dom'
import { Home, Profile, Settings } from '../pages'
import "./Sidebar.css"
import { useMoralis } from 'react-moralis';
import { defaultImages } from '../defaulImages'

const Sidebar = () => {

  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  return (
    <div className='sideContent'>
      <div className="menu">
        
        <div className="details">
          <Icon fill='#fff' size={33} svg="twitter" />
        </div>
        <Link to="/" className='link'>
        <div className="details">
          <Icon fill='#fff' size={33} svg="list" />
          <Home />
        </div>
        </Link>
        <Link to="/profile" className='link'>
        <div className="details">
          <Icon fill='#fff' size={33} svg="user" />
          <Profile />
        </div>
        </Link>
        <Link to="/settings" className='link'>
        <div className="menuItems">
          <Icon fill='#fff' size={33} svg="cog" />
          <Settings />
        </div>
        </Link>
      </div>
      <div className="details">
      <img src={user.attributes.pfp ? user.attributes.ppf : defaultImages[0]} className='profilePic' alt="" />
      <div className="profile">
        <div className="who">
        {user.attributes.username.slice(0, 6)}
        </div>
        <div className="accWhen">
        {`${user.attributes.ethAddress.slice(0, 4)}...${user.attributes.ethAddress.slice(38)}`}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Sidebar