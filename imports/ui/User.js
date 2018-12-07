import React from 'react';
import Counter from './Counter';

class User extends React.Component {
    render() {
        return (
            <div className="user-card">
                <div className="user-bio">
                    <p>{this.props.user.alias} has {this.props.user.karma}</p>
                </div>
                <Counter karma={this.props.user.karma} />
            </div>
        );
    }
}

export default User;