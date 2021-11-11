import React from 'react';
import './App.css';
import SignInOutContainer from './containers';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/home';
import Signup from './components/signup';



function App() {
  return (

    
    <div className="App"> 
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path ="/" component={Home}/>
            <Route path= "/login" component={SignInOutContainer}/>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
} 

export default App;
