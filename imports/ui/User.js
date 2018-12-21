import React from 'react';
import Counter from './Counter';

class User extends React.Component {
    state = { karma: this.props.user.karma };

    render() {
        return (
            <div className="user-card">
                <div className="user-bio">
                    <p>{this.props.user.alias} has {this.props.user.karma}</p>
                </div>
                <Counter user={this.props.user}/>
            </div>
        );
    }
}

export default User;