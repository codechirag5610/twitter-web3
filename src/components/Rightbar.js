import React from 'react'
import { Input } from 'web3uikit'
import { spaceshooter, netflix, js, youtube, academy } from '../images/images'
import "./Rightbar.css"

const Rightbar = () => {
  const trends = [
    {
      img: spaceshooter,
      text: "Learn how to build a Web3 FPS game using unity...",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-space-fps-game/"
    },
    {
      img: youtube,
      text: "Best youtube channel to learn about Web3...",
      link: "https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw"
    },
    {
      img: netflix,
      text: "Let's make Netflix with moralis!!!",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-netflix-clone/"
    },
    {
      img: js,
      text: "Become web3 developer just with JS",
      link: "https://academy.moralis.io/all-courses"
    },
    {
      img: academy,
      text: "Master Defi in 2022",
      link: "https://academy.moralis.io/courses/defi-101"
    },
  ]
  return (
    <div className='rightbarContent'>
      <Input 
        label='Search Twitter' 
        name='Search Twitter' 
        labelBgColor='#141d26'
      >
        <div className="trends">
          News For You
          {trends.map((trend, index) => {
            return(
              <>
                <div key={index} className="trend" onClick={() => window.open(trend.link)}>
                  <img src={trend.img} alt="" />
                  <div className="trendText">{trend.text}</div>
                </div>
              </>
            )
          })}
        </div>
      </Input>
    </div>
  )
}

export default Rightbar