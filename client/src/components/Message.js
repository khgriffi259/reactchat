import React from 'react'

function Message({username, text}) {
    return (
        <div>
            <div className="message-username">
                {username}
            </div>
            <br/>
            <div className="message-text">
                {text}
            </div>            
        </div>
    )
}

export default Message
