import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password2: "",
      fieldValidationError: "",
      userCreated: "",
      data: []
    };
    this.postUserToServer = this.postUserToServer.bind(this);
  
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  postUserToServer() {
      let user = {
        user: "",
        password: ""
      };
      user.user = this.state.email;
      user.password = this.state.password;

      axios.get('http://pwa-forum-backend.eu-4.evennode.com/api/users/'+this.state.email)
            .then(res => {

              var myObject = JSON.stringify(res.data);             

              if (JSON.parse(myObject).success){
                console.log("Username already exist.");
                this.setState({fieldValidationError: "Username already exist."});
                this.setState({userCreated: ""});

                /*ReactDOM.render(
                    <App/>,
                    document.getElementById('root') 
                );*/

              } else {
                axios.post('http://pwa-forum-backend.eu-4.evennode.com/api/users', user)
                .then(res => {
                  localStorage.setItem('isAuthenticated', true);
                  localStorage.setItem('username', this.state.email);
                  this.setState({userCreated: "User " + this.state.email + " successfully created!"});
                  this.setState({fieldValidationError: ""});

                  this.setState({email: "", password: "", password2: ""});

                  this.render();
                  
                })
                .catch(err => {
                    console.error(err);
                });
              }  
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.email.length === 0){
      this.setState({fieldValidationError: "Username is empty."});
      this.setState({userCreated: ""});
    }
    else if (this.state.password.length === 0){
      this.setState({fieldValidationError: "Password is empty."});
      this.setState({userCreated: ""});
    }
    else if (this.state.password !== this.state.password2){
      this.setState({fieldValidationError: "Both passwords must match."});
      this.setState({userCreated: ""});
    }
    else {
      this.postUserToServer();
    }
    this.render();

  }

  render() {
                  
    return (
      <div className="Login">
        <h3 class='success'>{this.state.userCreated}</h3>
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
          <FormGroup controlId="password2" bsSize="large">
            <ControlLabel>Repeate password</ControlLabel>
            <FormControl
              ref="password2"
              value={this.state.password2}
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
            Sign Up
          </Button>
        </form>
        <h5 class='validateForm'>{this.state.fieldValidationError}</h5>
      </div>
    );

  }
}
//https://codepen.io/wmdmark/pen/qNJQQQ