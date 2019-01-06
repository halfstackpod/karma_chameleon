import React from 'react';
import Counter from './Counter';

class UserCard extends React.Component {
    state = { karma: this.props.user.karma };

    render() {
        return (
            <div className="ui card user-card" key={this.props.user._id}>
                <div className="content">
                    <img className="right floated mini ui image" src="http://fuuse.net/wp-content/uploads/2016/02/avatar-placeholder.png" />
                    <div className="user-bio">
                    <div className="header">{this.props.user.alias}</div>
                    <div className="meta">has {this.props.user.karma} karma</div>
                    <Counter user={this.props.user}/>
                </div>                
                </div>
            </div>
        );
    }
}

export default UserCard;