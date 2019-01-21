import React from 'react';

import '../styles/karma.css';
import {userKarma} from '../../api/userKarma';
import { Meteor } from 'meteor/meteor';

class Counter extends React.Component {
    state = { karma: 0, message: 'Limit 5', confirmation: '' };

    isKarma = (val) => {
        return (val === "+" || val === "-");
    }

    checkOwner = () => {
        return this.props.user.owner === Meteor.userId();
    }

    addPoint = () => {
        if (this.state.karma < 5) {
            this.setState({ karma: this.state.karma += 1, message: this.state.karma, confirmation: '' });
        }
    }

    subtractPoint = () => {
        if (this.state.karma > -5) {
            this.setState({ karma: this.state.karma -= 1, message: this.state.karma, confirmation: '' });
        }
    }

    randomPoint = () => {
        let pointVal = Math.floor(Math.random()*20) + 1; 
        pointVal *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

        let toUpdate = {
            _id: this.props.user._id,
            inc: pointVal
        }
        Meteor.call('userKarma.update', toUpdate);
        this.setState({ karma: 0, message: 'Limit 5', confirmation: `You gave ${this.props.user.alias} ${pointVal} points` });
    }

    handleSubmit = (e) => {
        let textBox = e.target.textKarma.value;
        e.preventDefault();
        if (!isNaN(+textBox)) {
            e.target.textKarma.value = "";

            let sum = 0;
            if (this.isKarma(textBox.charAt(0))) {
                textBox = textBox.substr(1);
                let plus = textBox.split("+").length - 1;
                let minus = textBox.split("-").length - 1;
                sum = plus - minus;
            }

            let inc = this.state.karma + sum;

            if (inc <= 5 && inc >= -5) {
                let toUpdate = {
                    _id: this.props.user._id,
                    inc
                }
                Meteor.call('userKarma.update', toUpdate);
                this.setState({ karma: 0, message: 'Limit 5', confirmation: `You gave ${this.props.user.alias} ${inc} points` });
            } else {
                this.setState({ karma: 0, message: 'Limit 5', confirmation: '' });
            }
        }        
    }

    handleInputValue = (event) => {
        var currentValue = +event.target.value;

        if (isNaN(currentValue)) {
            this.setState({ karma: currentValue, message: event.target.value, confirmation: '' });
        } else {
            if (currentValue === 0) {
                this.setState({ karma: 0, message: event.target.value, confirmation: '' });
            } else {
                this.setState({ karma: currentValue, message: currentValue, confirmation: '' });
            }
        }
    }

    render() {

        var isOwner = this.checkOwner();

        return (
            <form className="counter-wrap" onSubmit={this.handleSubmit}>
                <button className="subtract ui negative basic button" type="button" onClick={this.subtractPoint}>—</button>
                <div className="ui input">
                    <input type="text" value={this.state.message} onChange={this.handleInputValue} name="textKarma"></input>
                </div>
                <button className="add ui positive basic button" type="button" onClick={this.addPoint}>+</button>
                <button className="ui button yellow" type="button" onClick={this.randomPoint}>RANDOM</button>
                <button className="apply ui primary button" type="submit">Apply</button>
                <p>{this.state.confirmation}</p>

                { isOwner &&
                    <button className="ui primary negative button" type="button" onClick={() => {userKarma.remove(this.props.user._id)}}>Remove Player</button>
                }
                <hr></hr>
                <div></div>
            </form>
        );
    }
}

export default Counter;