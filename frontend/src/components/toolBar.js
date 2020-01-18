import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { logIn, logOut } from '../actions/userActions';
import { getTasks } from '../actions/taskActions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { clientId } from '../config';
import './toolBar.css';
import {
    Navbar,
    NavbarBrand,
    NavbarText
} from 'reactstrap';

class ToolBar extends Component {

    static propTypes = {
        token: PropTypes.string,
        currentUser: PropTypes.object,
        getTasks: PropTypes.func.isRequired,
        logIn: PropTypes.func.isRequired,
        logOut: PropTypes.func.isRequired
    }

    componentDidMount() {
        if (this.props.token && this.props.currentUser) {
            this.props.getTasks();
        }
    }

    onGoogleLogInSuccess = response => {
        this.props.logIn(response);
        this.props.getTasks();
    }

    onGoogleLogInFail = response => {
        console.log('err', response);
    }

    onLogOut = () => {
        this.props.logOut();
        this.props.getTasks();
    }

    render() {
        return (
            <Navbar color="light" fixed="top" light expand="md" className="toolbar">
                <NavbarBrand href="/">TODOS</NavbarBrand>
                {this.props.currentUser ? (
                    <div className="user-info-container">
                        <img className="user-img" src={this.props.currentUser.profileObj.imageUrl} alt="User"/>
                        <span className="user-name" >Hello, {this.props.currentUser.profileObj.givenName}</span>
                        <NavbarText onClick={this.onLogOut} style={{cursor: "pointer"}}>Log out</NavbarText>
                    </div>
                ): (
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Log in with Google"
                        onSuccess={this.onGoogleLogInSuccess}
                        onFailure={this.onGoogleLogInFail}
                        cookiePolicy={'single_host_origin'}
                    />
                )}
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    token: state.userStates.token,
    currentUser: state.userStates.currentUser
})

export default connect(mapStateToProps, {logIn, logOut, getTasks})(ToolBar);