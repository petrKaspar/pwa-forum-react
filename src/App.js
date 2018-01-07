import React, { Component } from 'react';
import Login from './Login';
import Thread from './Thread';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

export default class App extends Component {
  
  constructor(props) {
    super(props)
    // the initial application state
    this.state = {
      user: null,
      isAuthenticated: false
    };
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  // App "actions" (functions that modify state)
  signIn(username, password) {
    // This is where you would call Firebase, an API etc...
    // calling setState will re-render the entire app (efficiently!)

    this.setState({
      user: {
        username,
        password,
      },
      isAuthenticated: true
    })

    this.render();

  }
  
  signOut() {
    // clear out user from state
    this.setState({user: null})
    localStorage.setItem('isAuthenticated', false);
    localStorage.setItem('username', 'to this great chat application');
    //this.render();
  }
  
  render() {


    const isLoggedIn = localStorage.getItem('isAuthenticated');
    let body = null;
    if (isLoggedIn === "true") {
      body =  <Thread url='http://pwa-forum-backend.eu-4.evennode.com/api/threads' />;

    } else {
      body = <Login onSignIn={this.signIn.bind(this)}/>;
    }

    return (
      <Router>
        <div>

        { 
          (isLoggedIn === "true") ? 

            <ul>
              <li><span><a href="/" onClick={this.signOut.bind(this)} class="btn btn-info" role="button" >Sign out</a></span></li>
            </ul>
            
          :
            <ul>
              <li><a href="/sign-up" class="btn btn-info" role="button">Sign up</a></li>
            </ul>
        }
          
          {body}

        </div>
      </Router>
    )

  }
  
}

