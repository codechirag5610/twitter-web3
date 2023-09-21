import React, { useState, useRef }  from 'react'
import { TweetInFeed } from '../components'
import { defaultImages } from '../defaulImages'
import { TextArea } from 'web3uikit'
import { Icon } from 'web3uikit'
import './Home.css'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';


const Home = () => {
    const { Moralis } = useMoralis();
    const contractProcessor = useWeb3ExecuteFunction();
    const user = Moralis.User.current();
    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState();
    const [theFile, setTheFile] = useState();
    const [tweet, setTweet] = useState();

    const maticTweet = async () => {
        if (!tweet) return;

        let img;
        if(theFile) {
            const data = theFile;
            const file = new Moralis.File(data.name, data);
            await file.saveIPFS();
            img = file.ipfs();
        } else {
            img = "No Image";
        }

        let options = {
            contractAddress: "0xB4fF785e9f6f00D8f8F4192586e9d9e2c9DDA052",
            functionName: "addTweet",
            abi:[{
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "tweetTxt",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "tweetImg",
                        "type": "string"
                    }
                ],
                "name": "addTweet",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            }],
            params: {
                tweetTxt: tweet,
                tweetImg: img,
            },
            msgValue: Moralis.Units.ETH(1),
        }

        await contractProcessor.fetch({
            params: options,
            onSucces: () => {
                saveTweet();
            },
            onError: (error) => {
                console.log(error.data.message)
            }
        });
    }

    const onImmageClick = () => {
        inputFile.current.click();
    } 
    const changeHandler = (event) => {
        const img = event.target.files[0];
        setSelectedFile(URL.createObjectURL(img));
    }
    const saveTweet = async () => {
        if(!tweet) return;

        const Tweets = Moralis.Object.extent("Tweets");

        const newTweet = new Tweets();

        newTweet.set("tweetTxt", tweet);
        newTweet.set("tweetPfp", user.attributes.pfp);
        newTweet.set("tweetAcc", user.attributes.ethAddress);
        newTweet.set("tweetUserName", user.attributes.username);

        if(theFile){
            const data = theFile;
            const file = new Moralis.File(data.name, data);
            await file.saveIPFS();
            newTweet.set("tweetImg", file.saveIPFS());
        }
        await newTweet.save();
        window.location.reload();
    }
  return (
    <>
    <div className="pageIdentify">Home</div>
    <div className='mainContent'>
        <div className="profileTweet">
            <img src={user.attributes.pfp ? user.attributes.ppf : defaultImages[0]} className='profilePic' alt="" />
            <div className="tweetBox">
                <TextArea 
                    label='' 
                    name='tweetTxtArea' 
                    value='Hi! Show your Thoughts Here.' 
                    type="text" 
                    onChange={(e) => setTweet(e.target.value)}
                    width='95%' />

                    {selectedFile && (
                        <img src={selectedFile} className="tweetImg" />
                    )}
                <div className="inputOrTweet">
                    <div className="imgDiv" onClick={onImmageClick}>
                        <input type="file" name="file" ref={inputFile} onChange={changeHandler} style={{ display: "none" }} />
                        <Icon fill="#1DA1F2" size={20} svg="image"></Icon>
                    </div>
                    <div className="tweetOptions">
                        <div className="tweet" onClick={saveTweet}>Tweet</div>
                        <div className="tweet" onClick={maticTweet} style={{ backGroundColor: "#8247e5"}}>
                            <Icon fill='#fff' size={20} svg="matic" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TweetInFeed profile={false} />
    </div>
    </>
  )
}

export default Home