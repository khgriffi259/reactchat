import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message'

const styles = {
    userTyping: {
        color: 'white',
    }
}

class MessageList extends Component {
    
    componentWillUpdate(){
        const node = ReactDOM.findDOMNode(this);
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
    }

    componentDidUpdate(){
        const node = ReactDOM.findDOMNode(this);
        
        if (this.shouldScrollToBottom){
            node.scrollTop = node.scrollHeight;
        }
    }
    
    render(){
        const {messages, userTyping} = this.props;
        return (
            <div className="message-list">
                {messages.map((message, index) => {
                    return(
                    <Message key={index} username={message.username} text={message.text}/>
                    )
                })}
                {userTyping && <div style={styles.userTyping}> {userTyping} </div> }
            </div>
        )
    }
}

export default MessageList
