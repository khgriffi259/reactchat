import React, { Component } from 'react'
import Room from './Room';


export class RoomList extends Component {
    
    render() {
        const { rooms, subscribeToRoom, currentRoomId } = this.props;

        const orderedRooms = [...rooms].sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
        
        return (
            <div className="room-list">
                <ul>
                    {orderedRooms.map(room => (
                       <Room 
                            key={room.id} 
                            room={room}
                            subscribeToRoom={subscribeToRoom}
                            currentRoomId={currentRoomId}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export default RoomList
