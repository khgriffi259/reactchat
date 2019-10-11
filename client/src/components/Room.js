import React from 'react'

function Room({room, subscribeToRoom, currentRoomId}) {
    const isCurrentRoom = currentRoomId === room.id ? "active" : null;
    return (
        <li onClick={()=> subscribeToRoom(room.id)} className={isCurrentRoom}>
            {room.name}
        </li> 
    )
}

export default Room
