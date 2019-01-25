import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
    }

    onSubmit(e) {
        e.preventDefault();

        let username = this.refs.username.value.trim();
        let password = this.refs.password.value.trim();

        if (password.length < 8) {
            return this.setState({ error: 'Password must be at least 8 characters long'});
        }

        Accounts.createUser({username, password}, (err) => {
            if (err) {
                console.log('Signup Callback', err);
                this.setState({ error: err.reason });
            } else {
                this.setState({ err: "" });
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit.bind(this)}>
                <input type="text" ref="username" name="username" placeholder="User Name"/>
                <input type="password" ref="password" name="password" placeholder="Password"/>
                <button>Sign Up</button>
                </form>
                <Link to="/">Have an account? Login Here!</Link>
            </div>
        )
    }
}