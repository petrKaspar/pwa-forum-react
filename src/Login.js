import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';
import App from './App';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      fieldValidationError: "",
      data: []
    };
    this.loadUserFromServer = this.loadUserFromServer.bind(this);
  
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  loadUserFromServer() {
    // check data from server
            axios.get('http://pwa-forum-backend.eu-4.evennode.com/api/users/'+this.state.email)
            .then(res => {

              var myObject = JSON.stringify(res.data);                     

              if (JSON.parse(myObject).success){
                if (this.state.email === JSON.parse(myObject).user.user && this.state.password === JSON.parse(myObject).user.password){
                    console.log("Prihlaseni probehlo uspesne.");
                    localStorage.setItem('isAuthenticated', true);
                    localStorage.setItem('username', this.state.email);

                    this.props.onSignIn(this.state.email, this.state.password);

                } else {
                  console.log("Neplatne uzivatelske jmeno nebo heslo.");
                  this.setState({fieldValidationError: "Username or password is incorrect."});
                  localStorage.setItem('isAuthenticated', false);
                  localStorage.setItem('username', 'to this great chat application');
                }  
              } else{
                localStorage.setItem('isAuthenticated', false);
                localStorage.setItem('username', 'to this great chat application');
                console.log("Prihlaseni se nezdarilo> " + JSON.parse(myObject).reason);
                this.setState({fieldValidationError: "Username or password is incorrect. " + JSON.parse(myObject).reason});

              }
            
            })

  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.loadUserFromServer();
  }

  render() {
                  
                  if (localStorage.getItem('isAuthenticated') === true) {
                    return (
                      <div>
                        <App/>
                      </div>
                    )
                  } else {

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              //type="email" pro validaci emailu            
              ref="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              ref="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
        <h5 class='validateForm'>{this.state.fieldValidationError}</h5>
      </div>
    );
    }
  }
}