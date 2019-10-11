import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import '../styles/Home.css';

import RoomList from '../RoomList'
import MessageList from '../MessageList'
import CreateRoom from '../CreateRoom'
import SendMessage from '../SendMessage'
import Chatkit from '@pusher/chatkit-client';
import {tokenUrl, instanceLocator} from '../../config';
import UserList from '../UserList';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            roomId: null,
            room: null,
            messages: [],
            joinableRooms: [],
            joinedRooms: [],
            userTyping: '',
        }

        this.sendMessage = this.sendMessage.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.subscribeToRoom = this.subscribeToRoom.bind(this);
        this.getRooms = this.getRooms.bind(this);
    }

    async componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: this.props.userId,
            tokenProvider: new Chatkit.TokenProvider({
                // url: tokenUrl
                url: 'http://localhost:4000/api/auth/authenticate'
            })               
        })
        console.log(chatManager);
        try {
            this.currentUser = await chatManager.connect();
            this.getRooms();
            this.subscribeToRoom(this.currentUser.rooms[0].id);
        } catch(error) {
            console.log(error)
        }
    }
    
    async componentDidUpdate(){
        this.getRooms();
    }
    
    async getRooms() {
        try {            
            const joinableRooms = await this.currentUser.getJoinableRooms();
                this.setState({
                    joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
        } catch (error) {
            console.log('Error getting rooms: ', error);
        }
    }

    async subscribeToRoom(roomId){
      
        this.setState({messages: []});
        try {
            const room = await this.currentUser.subscribeToRoomMultipart({
                roomId: roomId,
                hooks: {
                    onMessage: async message => {
                        const text = message.parts[0].payload.content;
                        // const { senderId } = message;
                        const username = message.sender.name;
                        this.setState({
                            messages: [...this.state.messages, {username, text}]
                        });
                    },
                    onUserStartedTyping: user => {
                        this.setState({userTyping: `${user.name} is typing...`})
                        console.log((`${user.name} is typing...`))
                    },
                    onUserStoppedTyping: user => {
                        // this.setState({userTyping: ''})
                        setTimeout(()=>{
                            this.setState({userTyping: ''});
                        }, 1000)
                        console.log(`${user.name} stopped typing `)
                    }
                }
            });
            console.log(room);
            this.setState({room});
            this.setState({roomId});
            this.getRooms();

        } catch (error) {
            console.log(`Error subscribing to room:  ${error}`);
        }

    }

    async sendMessage(text){
        const { roomId } = this.state;
        try {
            await this.currentUser.sendSimpleMessage({
                roomId,
                text
            });
        } catch (error) {
            console.log(error)            
        }
    }

    async createRoom(room){
        try {
            const newRoom = await this.currentUser.createRoom({
                name: room
            });
            console.log('new room created: ', newRoom);
            this.subscribeToRoom(newRoom.id);
        } catch (error) {
            console.log('error creating new room: ', error);
        }
    }

    async getUsers(room){
        try {
            
        } catch (error) {
            
        }
    }

    async isTyping(roomId) {
        // console.log(roomId);
        try {
            const response = await this.currentUser.isTypingIn({roomId});
            console.log('Success');            
        } catch (error) {
            console.log('Error sending typing indicator: ', error);
        }
    }

    render(){
        const { messages, joinableRooms, joinedRooms, userTyping, roomId, room } = this.state;
        // const users = room.users;
        const users = room && room.users;
    
        if (!this.props.isAuthenticated) return <Redirect to="/login" />;


        return (
            <div className="home">
                <UserList 
                    users={users}
                />
                <RoomList 
                    rooms={[...joinableRooms, ...joinedRooms]} 
                    subscribeToRoom={this.subscribeToRoom} 
                    currentRoomId={roomId}
                />
                <MessageList 
                    messages={messages} 
                    userTyping={userTyping}
                />
                <CreateRoom 
                    createRoom={this.createRoom}
                />
                <SendMessage 
                    sendMessage={this.sendMessage} 
                    isTyping={()=>this.isTyping(roomId)} 
                />    
            </div>
        )

    }
}

export default Home
