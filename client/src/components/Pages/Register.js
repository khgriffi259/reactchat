import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Redirect } from 'react-router-dom';


const styles = {
  title: {
    marginBottom: '20px'
  },
  textField: {
    width: '100%',
    marginBottom: 5,
  },
  btnBlock: {
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  errors: {
    marginTop: 15,
    marginBottom: 15,
    color: 'red'
  }
};

class Register extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    password2: ''
  };


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    const { history } = this.props;
    e.preventDefault();
    const user = await this.props.registerUser(this.state);
    if (user) {
      history.push('/login');
    }
  };

  render() {
    const { classes, errors, isAuthenticated } = this.props;
    if (isAuthenticated) return <Redirect to="/" />
    
    return (
        <Grid container justify="center">
          <Grid item xs={12} md={6} style={{ marginTop: 30}}>
            <h1 className={classes.title}> Register </h1>
            <Paper style={{ padding: 8 }}>
                <form onSubmit={this.handleSubmit}>
                  <p className={classes.errors}>{errors && errors.invalid}</p>  
                  <TextField
                      type='email'
                      label='Email'
                      name='email'
                      className={classes.textField}
                      value={this.state.email}
                      onChange={this.handleChange}
                      helperText={errors ? errors.email : ''}
                      error = {errors && errors.email ? true : false}
                  />
                  <TextField
                      type='text'
                      label='Username'
                      name='username'
                      className={classes.textField}
                      value={this.state.username}
                      onChange={this.handleChange}
                      helperText={errors ? errors.username : ''}
                      error = {errors && errors.username ? true : false}
                  />
                  <TextField
                      type='password'
                      label='Password'
                      name='password'
                      className={classes.textField}
                      value={this.state.password}
                      onChange={this.handleChange}
                      helperText={errors ? errors.password : ''}
                      error = {errors && errors.password ? true : false}
                  />
                  <TextField
                      type='password'
                      label='Confirm Password'
                      name='password2'
                      className={classes.textField}
                      value={this.state.password2}
                      onChange={this.handleChange}
                      helperText={errors ? errors.password2 : ''} 
                      error = {errors && errors.password2 ? true : false}
                  />
                  <div className={classes.btnBlock}>
                      <Button variant='outlined' type='submit'>
                        Submit
                      </Button>
                  </div>
                </form>
            </Paper>
          </Grid>
        </Grid>
        );
    }
}


export default withRouter(withStyles(styles)(Register));
