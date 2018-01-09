/**
 * Created by Petr on 28.11.2017.
 */
import React, { Component } from 'react';
import './table.css';
import axios from 'axios';  // Using HTTP request with Axios. Axios is a promise based HTTP client for Node.js and browser. Like fetch and superagent, it can work on both client and server.

class Thread extends Component {
    constructor(props) {
        super(props);

        this.state={ data: [] };

        this.loadThreadsFromServer();
    }
    loadThreadsFromServer() {
        axios.get(this.props.url)
            .then(res => {
                this.setState({ data: res.data });
            })
    }

    render() {
        return (
            <div>
                <h3>Threads list of the chat forum</h3>
                <table class="center">
                    {this.state.data.map(function(object) {
                        return (
                            <tr>
                                <th>
                                    <a href={`/comment-box/${object.id}`} >
                                        <h4>{object.title}</h4>
                                        <p>{object.text}</p>
                                    </a>
                                </th>   
                            </tr>
                        );
                    })}
                </table>
            </div>   

        );
    //<h3>pocet = {this.state.data.length}</h3>
    }
}

export default Thread;
