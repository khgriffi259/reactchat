import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Main from './components/Layout/Main';
import ProtectedRoute from './ProtectedRoute';

import api from './services/api';

class App extends Component {
  constructor(){
    super();
    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    this.state = {
      isAuthenticated: userInfo && userInfo.isAuthenticated || false,
      userId: userInfo && userInfo.userId || null,
      errors: null,
    }

    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  async loginUser(creds){
    try {
      const user = await api.call('post', 'auth/login', creds);
      console.log(user);
      this.setState({
        ...this.state,
        userId: user.userId,
        isAuthenticated: !!user.userId, 
        errors: null
      }, () => {
        localStorage.setItem('userInfo', JSON.stringify({userId: this.state.userId, isAuthenticated: this.state.isAuthenticated}));
      });
    } catch (error) {
      console.log(error.response.data);
      this.setState({...this.state, errors: error.response.data});
    }
  }

  async registerUser(creds) {
    console.log(creds);
    this.setState({...this.state, registerSuccess: false});
    try {
      const user = await api.call('post', 'auth/register', creds);
      console.log('created user: ', user);
      return user;
    } catch (error) {
      console.log(error.response.data);
      this.setState({...this.state, errors: error.response.data});
      return null;
    }

  }
  
  logout(){
    this.setState({
        ...this.state,
        userId: null,
        isAuthenticated: false
    },() => {
      localStorage.removeItem('userInfo');
    });
  }

  render() {
    const { isAuthenticated, userId, errors, registerSuccess } = this.state;
    
    return (
      <div className="App">
        <BrowserRouter>
          <Main 
            isAuthenticated={isAuthenticated}
            logout={this.logout}
          >
            <Switch>
              <ProtectedRoute exact path="/" component={ Home } isAuthenticated={isAuthenticated} userId={userId} loginUser={this.loginUser} errors={errors}/>
              <Route exact path="/login" component={() => <Login loginUser={this.loginUser} errors={errors} />} />
              <Route exact path="/register" component={() => <Register registerUser={this.registerUser} isAuthenticated={isAuthenticated} errors={errors}  />} />
            </Switch>
          </Main>
        </BrowserRouter>
      </div>
    )
  };
}

export default App;
