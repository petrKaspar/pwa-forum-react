/**
 * Created by Petr on 28.11.2017.
 */
import React, { Component } from 'react';
//axios - pomoci AJAX se po pridani noveho zaznamu (i pres postmana) automaticky prenacte stranka a novy komentar se objevi.
// pollInterval pro prenacitani je nastaveny na 2s. Nastavuje se v index.js, kde se vola CommentBox
import axios from 'axios';  // Using HTTP request with Axios. Axios is a promise based HTTP client for Node.js and browser. Like fetch and superagent, it can work on both client and server.
import CommentList from './CommentList';
import CommentForm from './CommentForm';
//import DATA from './data/data'; // nacteni zdrojovych dat ze statickeho souboru (pro prvotni ucely)
import style from './style';

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    }
    loadCommentsFromServer() {
        axios.get(`${this.props.url}/${this.props.id_thread}`)
            .then(res => {
                this.setState({ data: res.data });
            })
    }
    handleCommentSubmit(comment) {
        let comments = this.state.data;
        comment.lastUpdate = Date.now();
        comment.id_thread = this.props.id_thread;

        let newComments = comments.concat([comment]);
        this.setState({ data: newComments });
        
        axios.post(this.props.url, comment)
            .catch(err => {
                console.error(err);
                this.setState({ data: comments });
            });
    }
    handleCommentDelete(id) {
        axios.delete(`${this.props.url}/${id}`)
            .then(res => {
                console.log('Comment deleted');
            })
            .catch(err => {
                console.error(err);
            });
    }
    handleCommentUpdate(id, comment) {
        //sends the comment id and new author/text to our api
        axios.put(`${this.props.url}/${id}`, comment)
            .catch(err => {
                console.log(err);
            })
    }
    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }
    signOut() {
        // clear out user from state
        // automatic redirection to the login page
        this.setState({user: null})
        localStorage.setItem('isAuthenticated', false);
        localStorage.setItem('username', 'on this cool page');
        //this.render();
    }
    render() {
        return (
            <div>
                <ul>
                  <li><span><a href="/" onClick={this.signOut.bind(this)} class="btn btn-info" role="button" >Sign out</a></span></li>
                </ul>
                <div style={ style.commentBox }>
                
                    <h2 style={ style.title }>Comments:</h2>
                    <CommentList
                        onCommentDelete={ this.handleCommentDelete }
                        onCommentUpdate={ this.handleCommentUpdate }
                        data={ this.state.data }/>
                    <CommentForm onCommentSubmit={ this.handleCommentSubmit }/>
                </div>
                </div>
        )
    }
}

export default CommentBox;