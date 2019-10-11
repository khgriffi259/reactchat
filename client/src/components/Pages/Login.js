import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Redirect } from 'react-router-dom';
import { red } from '@material-ui/core/colors';


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

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: null
  };


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    const { history } = this.props;
    e.preventDefault();
    this.props.loginUser(this.state);
    history.push('/');
  };

  render() {
    const { classes, isAuthenticated, errors } = this.props;

    if (isAuthenticated) return <Redirect to="/" />

    return (
        <Grid container justify="center">
          <Grid item xs={12} md={6} style={{ marginTop: 30}}>
            <h1 className={classes.title}>Login</h1>
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
                    type='password'
                    label='Password'
                    name='password'
                    className={classes.textField}
                    value={this.state.password}
                    onChange={this.handleChange}
                    helperText={errors ? errors.password : ''}
                    error = {errors && errors.password ? true : false}
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

const mapStateToProps = state => ({
  errors: state.errors.errors,
  auth: state.auth
});

export default withRouter(withStyles(styles)(Login));
