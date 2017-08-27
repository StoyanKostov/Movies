import { connect } from 'react-redux';
import React, { Component } from 'react';
import { register } from '../../../actions/user.js';

class Register extends Component {
    constructor(props) {
        super(props)
        this.user = {};
        this.userInputhandler = this.userInputhandler.bind(this);
        this.registrationHandler = this.registrationHandler.bind(this);
    }
    registrationHandler(e) {
        e.preventDefault();
        this.setState({ 'error': '' });
        if (!this.isFormValid()) {
            return;
        }
        if (this.user.password !== this.user.confirmPasword) {
            alert('Password mismatch');
            return;
        }
        this.props.register(this.user);
    }
    userInputhandler(e) {
        this.user[e.target.name] = e.target.value;
    }
    render() {
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
                <h2>Register user</h2>
                <form id='createUser'>
                    <label>
                        User name: <input type="text" id="username" name="username" onChange={this.userInputhandler} required />
                    </label>
                    <label>
                        First name: <input type="text" id="firstName" name="firstName" onChange={this.userInputhandler} required />
                    </label>
                    <label>
                        Last name: <input type="text" id="lastName" name="lastName" onChange={this.userInputhandler} required />
                    </label>
                    <label>
                        Email: <input type="email" id="email" name="email" onChange={this.userInputhandler} required />
                    </label>
                    <label>
                        Enter Password: <input type="password" id="password" name="password" onChange={this.userInputhandler} required />
                    </label>
                    <label>
                        Confirm Password: <input type="password" id="confirmPasword" name="confirmPasword" onChange={this.userInputhandler} required />
                    </label>
                    <button onClick={this.registrationHandler}>Register</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        register: (user) => {
            dispatch(register(user))
        }
    }
}

const RegisterContainer = connect(
    null,
    mapDispatchToProps
)(Register)


export default RegisterContainer