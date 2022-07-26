import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import axios from "axios";

function App() {

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId:
          "596130570992-vsdb5efqmodjp7sehiin4d4plj1l1vt1.apps.googleusercontent.com",
        plugin_name: "chat",
      });
    });
  }, []);



  async function responseSuccessGoogle(response) {
    console.log(response)
    try{
      let tokenId = response.tokenId
      const res = await axios.post(`http://localhost:5000/api/login-google`,{tokenId})
      console.log(res.data)
      setProfile(response.profileObj)
    }catch(err){

    }
  };
  const responseErrorGoogle = (response) => {
    alert('Error')
  };

  return (
    <div className="App">
      <header className="App-header">Login google</header>


      {profile?
        <div>
            <p>login by{profile.email}</p>
            <p onClick={()=>setProfile(null)}>Logout</p>
        </div>:
        <GoogleLogin
          clientId="596130570992-vsdb5efqmodjp7sehiin4d4plj1l1vt1.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={(response)=>responseSuccessGoogle(response)}
          onFailure={responseErrorGoogle}
          cookiePolicy={'single_host_origin'}
        />
      }
    </div>
  );
}

export default App;
