import { Routes, Route } from 'react-router-dom';
import { Rightbar, Sidebar, TweetInFeed } from './components';
import { Home, Profile, Settings } from './pages';
import './App.css';
import { useMoralis } from 'react-moralis';
import{ ConnectButton, Icon } from "web3uikit";

const App = () => {
  const { isAuthenticated, Moralis } = useMoralis();
  return (
    <div className="App">
      {isAuthenticated ? (
        // <div className="page">
        //   <div className="sidebar">
        //     <Sidebar />
        //     <div
        //      className="logout" 
        //      onClick={() => {
        //        Moralis.User.logOut().then(() => {
        //          window.location.reload();
        //          });
        //          }}
        //          >
        //           Logout
        //       </div>
        //   </div>
          <div className="mainWindow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          // <div className="rightBar">
          //   <Rightbar />
          // </div>
        // </div>
        // <div>Hello</div>
      ) : (
        <div className="loginPage">
          <Icon fill='#000' size={40} svg="twitter" />
          <ConnectButton />
        </div>
      )}
    </div>
  );
}

export default App;
