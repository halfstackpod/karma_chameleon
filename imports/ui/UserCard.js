import React from 'react';
import Counter from './Counter';

class UserCard extends React.Component {
    state = { karma: this.props.user.karma };

    // renderUser() {
    //     if (this.props.user.alias === null) {
    //         return <p>{this.props.user.name} has {this.props.user.karma}</p>
    //     } else {
    //         return <p>{this.props.user.alias} has {this.props.user.karma}</p>
    //     }
    // }

    render() {
        return (
            <div className="user-card" key={this.props.user._id}>
                <div className="user-bio">
                    {/* {this.renderUser.bind(this)} */}
                    <p>{this.props.user.alias} has {this.props.user.karma}</p>
                </div>
                <Counter user={this.props.user}/>
            </div>
        );
    }
}

export default UserCard;