import React, { useState, useRef, useEffect } from 'react'
import { Input } from 'web3uikit'
import { Link } from 'react-router-dom'
import './Settings.css'
// import { pfp1, pfp2, pfp3, pfp4, pfp5 } from '../images/images'
import { defaultImages } from '../defaulImages'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';


const Settings = () => {
    const inputFile = useRef(null);
    const [pfps, setPfps] = useState([]);
    const { Moralis, isAuthenticated, account } = useMoralis();
    const [selectedFile, setSelectedFile] = useState();
    const [selectedPFP, setSelectedPFP] = useState();
    const [theFile, setTheFile] = useState();
    const [username, setUsername] = useState();
    const [bio, setBio] = useState();
    const Web3Api = useMoralisWeb3Api();
    // const pfps = [pfp1, pfp2, pfp3, pfp4, pfp5];

    const resolveLink = (url) => {
        if(!url || !url.includes("ipfs://")) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/")
    }

    useEffect(() => {

        const fetchNFTs = async () => {
            const options = {
                chain: 'mumbai',
                address: account
            }
            const mumbaiNFTs = await Web3Api.account.getNFTs(options);
            const images = mumbaiNFTs.result.map(
                (e) => resolveLink(JSON.parse(e.metadata)?.image)
            );
            setPfps(images)
        }
        fetchNFTs();

    }, [isAuthenticated, account]);

    const onBannerClick = () => {
        inputFile.current.click();
    } 
    const changeHandler = (event) => {
        const img = event.target.files[0];
        setTheFile(img);
        setSelectedFile(URL.createObjectURL(img));
    }
    const saveEdits = async () => {
        const User = Moralis.Object.extend("_User");
        const query = new Moralis.Query(User);
        const myDetails = await query.first();

        if (bio) {
            myDetails.set("bio", bio);
        }
        if (username) {
            myDetails.set("username", username);
        }
        if(selectedPFP){
            myDetails.set("pfp", selectedPFP);
        }
        if (theFile) {
            const data = theFile;
            const file = new Moralis.File(data.name, data);
            await file.saveIPFS();
            myDetails.set("banner", file.saveIPFS());
        }

        await myDetails.save();
        window.location.reload();
    }
  return (
    <>
        <div className="pageIdentify">Settings</div>
        <div className="settingsPage">
            <Input 
                label='Name' 
                name='NameChange' 
                width='100%' 
                labelBgColor='#141d26' 
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
                label='Bio' 
                name='BioChange' 
                width='100%' 
                labelBgColor='#141d26' 
                onChange={(e) => setBio(e.target.value)}
            />
            <div className="pfp">
                Profile Image (Your NFTs )
                {pfps.map((pfp, index) => (
                    <>
                        <img src={pfp} onClick={() => {setSelectedPFP(pfps[index]);}} className={selectedPFP === pfp ? 'pfpOptionSelected' : "pfpOption"} />
                    </>
                ))}
            </div>
            <div className="pfp">
                Profile Banner
                <div className="pfpOptions">
                    <img src={selectedFile} onClick={onBannerClick} className="banner" alt="" />
                    <input type="file" name='file' ref={inputFile} onChange={changeHandler} style={{ display: 'none'}} />
                </div>
            </div>
            <div className="save" onClick={() => saveEdits()}>
                Save
            </div>
        </div>
    </>
  )
}

export default Settings