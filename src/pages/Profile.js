import React from 'react'
import { Link } from 'react-router-dom'
import { TweetInFeed } from '../components'
import { defaultImages } from '../defaulImages'
import { useMoralis } from 'react-moralis';

const Profile = () => {
    const { Moralis } = useMoralis();
    const user = Moralis.User.current();
  return (
    <>
    <div className='pageIdentify'>Profile</div>
    <img className="profileBanner" src={user.attributes.banner ? user.attributes.banner : defaultImages[1]} />
    <div className="pfpContainer">
        <img src={user.attributes.pfp ? user.attributes.ppf : defaultImages[0]} className='profilePic' alt="" />
        <div className="profileName">{user.attributes.username.slice(0, 6)}</div>
        <div className="profileWallet">{`${user.attributes.ethAddress.slice(0, 4)}...${user.attributes.ethAddress.slice(38)}`}</div>
        <Link to="/settings">
            <div className="profileEdit">Edit Profile</div>
        </Link>
        <div className="profileBio">
            {user.attributes.bio}
        </div>
        <div className="profileTab">
            Your Tweets
        </div>
        <TweetInFeed profile={true} />
    </div>
    </>
  )
}

export default Profile