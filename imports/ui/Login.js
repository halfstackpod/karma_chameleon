import React from 'react';
import { Meteor } from 'meteor/meteor';
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

        Meteor.loginWithPassword(username, password, (err) => {
            if (err) {
                console.log("Some login error occured", err);
                this.setState({ error: "Unable to login - please check username and password" });
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
                    <button>Sign In</button>
                </form>
                <Link to="/signup">Need an account? Signup Here!</Link>
            </div>
        )
    }
}