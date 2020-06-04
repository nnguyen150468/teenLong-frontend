import React, {useEffect, useState} from 'react';
import NavBar from './components/NavBar'
import {Switch, Route, Link} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchResultPage from './pages/SearchResultPage'
import LoginPage from './pages/LoginPage'
import AlreadyLoggedIn from './components/AlreadyLoggedIn'
import MustLogInFirst from './components/MustLogInFirst'
import SignupPage from './pages/SignupPage'
import AddWordPage from './pages/AddWordPage'
import PasswordRecoverPage from './pages/PasswordRecoverPage'
import SetNewPasswordPage from './pages/SetNewPasswordPage'
import MyProfilePage from './pages/MyProfilePage'
import MyPendingWordsPage from './pages/MyPendingWordsPage'
import MyApprovedWordsPage from './pages/MyApprovedWordsPage'
import UserPage from './pages/UserPage'
import FilterByFirstCharPage from './pages/FilterByFirstCharPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(async()=> {
    await checkUser()
    setLoaded(true)
  }, [])

  async function checkUser(){
    const urlToken = window.location.href.split("?token=")[1]
    ? window.location.href.split("?token=")[1].split("#")[0] : null

    const localToken = localStorage.getItem("teenLongToken")
    const token = localToken || urlToken

    
    if(!token) return 

    const res = await fetch(process.env.REACT_APP_SERVER + "/users/me", {
      headers: {authorization: `Bearer ${token}`}
    })

    const body = await res.json()
    
    console.log('body App ====',body)

    //if request succeeds, set the user and token. If not, remove previous token
    //to prevent hackers
    if(body.status === "success"){
      setUser(body.user)
      localStorage.setItem("teenLongToken", token)
    } else {
      setUser(null)
      localStorage.removeItem("teenLongToken")
    }
  }  

  if(!loaded) {return <div>Loading...</div>}

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      {/* <Header /> */}
      <Switch>
        
        <Route path="/search/:keyWord" exact component={SearchResultPage}/>
        {/* <Route path="/login" exact user={user} setUser={setUser}  component={LoginPage} /> */}
        <AlreadyLoggedIn path="/login" exact user={user} setUser={setUser} component={LoginPage}/>
        <AlreadyLoggedIn path="/signup" exact user={user} component={SignupPage} />
        <Route path="/addWord"  exact component={AddWordPage} />
        <AlreadyLoggedIn path="/users/recoverPassword" exact component={PasswordRecoverPage} />
        <AlreadyLoggedIn path="/email/:token" exact component={SetNewPasswordPage} />
        <Route path="/" user={user} exact component={HomePage} />
        <MustLogInFirst path="/myProfile" exact user={user} component={MyProfilePage} />
        <MustLogInFirst path="/myProfile/pendingWords" exact user={user} component={MyPendingWordsPage} />
        <MustLogInFirst path="/myProfile/approvedWords" exact user={user} component={MyApprovedWordsPage} />
        <Route path="/users/:userID" exact component={UserPage} />
        <Route path="/filter/first-char/:character" exact component={FilterByFirstCharPage}/>
      </Switch>
      
      
      {/* <div className="d-flex">
        <div className="col-3"></div>
        <div className="col-6">
          <Words /> 
        </div>
      </div> */}
    </div>
  );
}

export default App;
