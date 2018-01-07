/**
 * Created by Petr on 28.11.2017.
 */
import React, { Component } from 'react';
import style from './style';
import axios from 'axios';  // Using HTTP request with Axios. Axios is a promise based HTTP client for Node.js and browser. Like fetch and superagent, it can work on both client and server.

class User extends Component {
    constructor(props) {
        super(props);

        this.state={ data: [] };

        this.loadUsersFromServer();
    }
    loadUsersFromServer() {
        axios.get(this.props.url)
            .then(res => {
                this.setState({ data: res.data });
            })
    }

    render() {
        return (
            <div>
                <h2>Uživatelé</h2>
                <h3>pocet = {this.state.data.length}</h3>
                <span>
                    {this.state.data.map(function(object) {
                        return (
                            <h3>{object.user}</h3>
                        );
                    })}
                </span>
            </div>   

        );

    }
}

export default User;
