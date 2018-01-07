/**
 * Created by Petr on 28.11.2017.
 */
import React, { Component } from 'react';
import Comment from './Comment';
import style from './style';

class CommentList extends Component {
    render() {
        let commentNodes = this.props.data.map(comment => {
            return (
                <Comment
                    author={ comment.author }
                    lastUpdate={ comment.lastUpdate }
                    uniqueID={ comment['_id'] }
                    onCommentDelete={ this.props.onCommentDelete }
                    onCommentUpdate={ this.props.onCommentUpdate }
                    key={ comment['_id'] }>
                    { comment.text }
                </Comment>
            )
        });
        return (
            <div style={ style.commentList }>
                { commentNodes }
            </div>
        )
    }
}

export default CommentList;