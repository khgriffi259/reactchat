import React, { Component } from 'react'

export class UserList extends Component {
    
    render() {
        const { users } = this.props;
       console.log(users);
        return (
            <div className="user-list">
                <h1>Users:</h1>
                <ul>
                    {users && users.map(user => (
                       <li key={user.id} > {user.name} {user.presence.state} </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default UserList
