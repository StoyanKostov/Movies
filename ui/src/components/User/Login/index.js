import { connect } from 'react-redux';
import React, { Component } from 'react';
import { login } from '../../../actions/user.js';

class Login extends Component{
    constructor(props) {
        super(props)
        this.user = {};
        this.loginHandler = this.loginHandler.bind(this);
        this.userInputhandler = this.userInputhandler.bind(this);
    }
    loginHandler(e) {
        e.preventDefault();
        this.setState({ 'error': '' });
        if (!this.isFormValid()) {
            return;
        }
        this.props.login(this.user);
    }
    userInputhandler(e) {
        this.user[e.target.name] = e.target.value;
    }
    render(){
        this.isFormValid = () => {
            let inputs = document.querySelectorAll('input');
            for (let input of inputs) {
                if (!input.checkValidity()) {
                    alert(`${input.name} value is not valid!`);
                    return false;
                }
            }
            return true;
        }
        return (
            <div>
                <h2>Login user</h2>
                <form id='createUser'>
                    <label for="username">
                        Username: <input type="text" id="username" name="username" onChange={this.userInputhandler} required />
                    </label>
                    <label for="password">
                        Password: <input type="password" id="password" name="password" onChange={this.userInputhandler} required />
                    </label>
                    <button onClick={this.loginHandler}>Login</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (user) => {
            dispatch(login(user))
        }
    }
}

const LoginContainer = connect(
    null,
    mapDispatchToProps
)(Login)


export default LoginContainer