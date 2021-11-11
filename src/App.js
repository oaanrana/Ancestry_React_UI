import React from 'react';
import './App.css';
import SignInOutContainer from './containers';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/home';
import Signup from './components/signup';
import PrivateRoute from './components/PrivateRoute';
import CreateTree from './components/CreateTree';
import Navbar from './components/Navbar';


function App() {
  return (

    
    <div className="App"> 
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path ="/" component={Home}/>
            <Route path= "/login" component={SignInOutContainer}/>
            <PrivateRoute path = "/create-tree" component={CreateTree}/>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
} 

export default App;
