import React from 'react';

import {Users} from './../api/users';

class Counter extends React.Component {
    state = { karma: 0 };

    addPoint = () => {
        if (this.state.karma < 5) {
            this.setState({ karma: this.state.karma += 1 });
        }
    }

    subtractPoint = () => {
        if (this.state.karma > -5) {
            this.setState({ karma: this.state.karma -= 1 });
        }
    }

    updateKarma = () => {
        let inc = +this.state.karma;
        Users.update( this.props.user._id, { $inc: { karma: inc} });
        this.setState({karma : 0});
    }

    render() {
        return (
            <div className="counter-wrap">
                <button className="subtract" onClick={this.subtractPoint}>-</button>
                <p className="karma-adding">{this.state.karma}</p>
                <button className="add" onClick={this.addPoint}>+</button>
                <button className="apply" onClick={this.updateKarma}>Apply</button>
            </div>
        );
    }
}

export default Counter;