import React from 'react';
import TopUsers from './TopUsers';

export default class OrderedView extends React.Component {
    state = {
        top: -1,
        botton: -1
    }

    getTopUsers = () => {
        this.setState.top = 1;
        this.setState.bottom = -1;
    }

    getBottomUsers = () => {
        this.setState.top = -1;
        this.setState.bottom = 11;
    }

    render() {
        return (
            <div className="TopUsers">
                <button className="ui secondary basic button" type="button" onClick={this.getTopUsers}>
                    Top Users!
                </button>
                <button className="ui secondary basic button" type="button" onClick={this.getBottomUsers}>
                    Bottom Users!
                </button>
            </div>
        )
    }

}