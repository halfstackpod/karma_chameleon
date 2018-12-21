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

    // updateKarma = () => {
    //     let inc = +this.state.karma;
    //     Users.update( this.props.user._id, { $inc: { karma: inc} });
    //     this.setState({karma : 0});
    // }

    handleSubmit = (e) => {
        let textBox = e.target.textKarma.value;

        e.preventDefault();

        e.target.textKarma.value = "";

        let Plus = textBox.split("+").length - 1;
        let Minus = textBox.split("-").length - 1;
        let Sum = Plus - Minus;

        let inc = this.state.karma + Sum;

        if (inc <= 5) {
            Users.update( this.props.user._id, { $inc: { karma: inc } });
            this.setState({karma: 0});
        } else {
            this.setState({ karma: 0 });
        }
    }

    handleInputValue = () => {
        return this.state.karma === 0 ? "Limit 5" : this.state.karma;
    }

    render() {
        return (
            <form className="counter-wrap" onSubmit={this.handleSubmit.bind(this)}>
                <button className="subtract" type="button" onClick={this.subtractPoint}>-</button>
                <input type="text" value={this.handleInputValue()} name="textKarma"></input>
                <button className="add" type="button" onClick={this.addPoint}>+</button>

                <button className="apply" type="submit">Apply</button>
                
                <p className="karma-adding">{this.state.karma}</p>
                <button type="button" onClick={() => {Users.remove(this.props.user._id)}}>Remove Player</button>
                <hr></hr>
                <div></div>
            </form>
        );
    }
}

export default Counter;