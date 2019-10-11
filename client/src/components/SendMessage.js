import React, { Component } from 'react'

export class SendMessage extends Component {
    
    state = {
        message: ''
    }
    
    handleChange = e => {
        this.setState({[e.target.id]: e.target.value});
        this.props.isTyping();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({message: ''});
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="send-message">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        id="message" 
                        value={this.state.message}
                        onChange={this.handleChange}
                        placeholder="enter message"
                    />
                </form>
            </div>
        )
    }
}

export default SendMessage;
