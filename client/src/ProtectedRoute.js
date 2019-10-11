import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import Login from './components/Pages/Login';

 const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {         
            return rest.isAuthenticated ? 
                <Component {...props} userId={rest.userId} isAuthenticated={rest.isAuthenticated} /> : 
                <Login loginUser={rest.loginUser} errors={rest.errors}/>
        }}>
            
        </Route>
    )
}

export default ProtectedRoute
