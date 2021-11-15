import React from 'react';
import './App.css';
import SignInOutContainer from './containers';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/home';
import Signup from './components/signup';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import temp from './components/temp';
import CreateTrees from "./components/CreateTrees";


function App() {
  return (

    
    <div className="App"> 
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path ="/" component={Home}/>
            <Route path= "/login" component={SignInOutContainer}/>
            <PrivateRoute path = "/create-tree" component={CreateTrees}/>
            <PrivateRoute path ="/temp" component={temp}/>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
} 

export default App;
