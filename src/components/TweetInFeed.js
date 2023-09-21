import React, { useEffect, useState } from 'react'
import { Icon } from 'web3uikit'
import { defaultImages } from '../defaulImages'
import { golf, canoe } from '../images/images'
import "./TweetInFeed.css"
import { useMoralis } from 'react-moralis'

const TweetInFeed = ({ profile }) => {
  const { Moralis, account } = useMoralis();
  const [tweetArr, setTweetArr] = useState([]);

  useEffect(() => {
    const gettweets = async () => {
      try {
        const Tweets = Moralis.Object.extend("Tweets");
        const query = new Moralis.Query(Tweets);
        if(profile) {
          query.equalTo("tweeterAcc", account);
        }
        const results = await query.find();

        setTweetArr(results);
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    }
    gettweets();
  }, [profile]);
  return (
    <>
    {tweetArr?.map((tweet) => (
    <div className='FeedTweet'>
      <img src={tweet.attributes.tweeterPfp ? tweet.attributes.tweeterPfp : defaultImages[0]} className='profilePic' alt="" />
      <div className="completeTweet">
        <div className="who">
        {tweet.attributes.username.slice(0, 6)}
          <div className="accWhen">{`${tweet.attributes.ethAddress.slice(0, 4)}...${tweet.attributes.ethAddress.slice(38)}, 
              ${tweet.attributes.createdAt.toLocaleString('en-us', { month: "short"})}
              ${tweet.attributes.createdAt.toLocaleString('en-us', { day: "numeric"})}`}</div>
        </div>
        <div className="tweetContent">
          {tweet.attributes.tweetTxt}
          {tweet.attributes.tweetImg && <img src={golf} className='tweetImg' alt="" />}
        </div>
        <div className="interactions">
          <div className="interactionNums">
            <Icon fill='#3f3f3f' size={20} svg="messageCircle" />
          </div>
          <div className="interactionNums">
            <Icon fill='#3f3f3f' size={20} svg="star" />
          </div>
          <div className="interactionNums">
            <Icon fill='#3f3f3f' size={20} svg="matic" />
          </div>
        </div>
      </div>
    </div>)).reverse()}
    </>
  )
}

export default TweetInFeed