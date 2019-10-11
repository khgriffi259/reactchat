import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreVert from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';


const styles = {
    root: {
        flexgrow: 1
    },
    logo: {
        color: '#fff',
        fontSize: 30,
        textTransform: 'uppercase'
    },
    space:{
        justifyContent: 'space-between'
    }
};

class Header extends Component {

    state = {
        anchorEl: null
    }

    handleMenu = e => {
        console.log(e.currentTarget);
        console.log(this.props.isAuthenticated);
        this.setState({anchorEl: e.currentTarget});

    }

    handleClose = () => {
        this.setState({anchorEl: null});
    }

    handleLogout = () => {
        this.setState({anchorEl: null});
        this.props.logout();
    }
    render(){
        const { classes, isAuthenticated } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        const guestLinks = (
            <div>
                <IconButton 
                    aria-owns={open ? 'menu-appbar': undefined}
                    aria-haspopup="true"
                    color="inherit"
                    onClick={this.handleMenu}
                >
                    <MoreVert />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem>
                        <Link to="/login">Login</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/register">Register</Link>
                    </MenuItem>
                </Menu>
            </div>        );

        const authLinks = isAuthenticated && (
            <div>
                <IconButton 
                    aria-owns={open ? 'menu-appbar': undefined}
                    aria-haspopup="true"
                    color="inherit"
                    onClick={this.handleMenu}
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}> 
                        <Link to='#'>Profile </Link> 
                    </MenuItem>
                    <MenuItem>
                        <Link to="#" onClick={this.handleLogout}>Logout</Link>
                    </MenuItem>
                </Menu>
            </div>
        );
        
        return (
            <div className={classes.root}>
                <AppBar position="static" style={{backgroundColor: 'black'}}>
                    <Toolbar className={classes.space}>
                        React-Chat
                        { isAuthenticated ? authLinks : guestLinks }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
};



export default withStyles(styles)(Header);