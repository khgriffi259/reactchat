import React from 'react'
import Header from './Header'

function Main({ children, isAuthenticated, logout }) {
    return (
        <div>
            <Header 
                isAuthenticated={isAuthenticated}
                logout={logout}
            />
            { children }
        </div>
    )
}

export default Main
