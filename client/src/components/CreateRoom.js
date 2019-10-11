import React, { Component } from 'react'

export class CreateRoom extends Component {
    
    state = {
        roomName: ''
    }

    handleChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createRoom(this.state.roomName);
        this.setState({roomName: ''});
    }
    
    render() {
        return (
            <div className="new-room-form">
            <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        id="roomName" 
                        value={this.state.roomName}
                        onChange={this.handleChange}
                        placeholder="Create New Room"
                    />
                </form>
            </div>
        )
    }
}

export default CreateRoom
