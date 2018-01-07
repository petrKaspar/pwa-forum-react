/**
 * Created by Petr on 28.11.2017.
 */
import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state= {
            toBeUpdated: false,
            lastUpdate: '',
            author: '',
            text: ''
    };
        //binding all our functions to this class
        this.deleteComment = this.deleteComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
        this.timeConverter = this.timeConverter.bind(this);
    }
    updateComment(e) {
        e.preventDefault();
        //brings up the update field when we click on the update link.
        this.setState({ toBeUpdated: !this.state.toBeUpdated });
    }
    handleCommentUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        //if author or text changed, set it. if not, leave null and our PUT 
        //request will ignore it.
        let author = (this.state.author) ? this.state.author : null;
        let text = (this.state.text) ? this.state.text : null;
        //let lastUpdate = (this.state.lastUpdate) ? this.state.lastUpdate : null;
        let comment = { author: author, text: text, lastUpdate: Date.now() + ''};
        this.props.onCommentUpdate(id, comment);
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            author: '',
            text: '',
            lastUpdate: ''
    })
    }
    deleteComment(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onCommentDelete(id);
        console.log('oops deleted');
    }
    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }
    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
    timeConverter(UNIX_timestamp){
        var time = 'time is unknown';
        if (UNIX_timestamp !== undefined){
          var a = new Date(Number(UNIX_timestamp.toString().substring(0,10) * 1000));
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          time = date + '. ' + month + '. ' + year + ' ' + hour + ':' + min + ':' + sec ;
        }
      return time;
    }
    render() {
        return (
            <div style={ style.comment }>
                <h4>{this.props.author}</h4>
                <span dangerouslySetInnerHTML={ this.rawMarkup() } />
                <a style={ style.updateLink } role="button" onClick={ this.updateComment }>update</a>
                <a style={ style.deleteLink } role="button" onClick={ this.deleteComment }>delete</a>
                <span style={ style.lastUpdate }>last update: {this.timeConverter(this.props.lastUpdate)}</span>

                { (this.state.toBeUpdated)
        ? (<form onSubmit={ this.handleCommentUpdate }>
            <input type='text' placeholder='Update name…' style={ style.commentFormAuthor } value={ this.state.author } onChange= { this.handleAuthorChange } />
            <input type='text' placeholder='Update your comment…' style= { style.commentFormText } value={ this.state.text } onChange={ this.handleTextChange } />
            <input type='submit' style={ style.commentFormPost } value='Update' />
            </form>)
        : null}

                <hr style={ style.hr }/>
            </div>
        )
    }
}

export default Comment;