import React from 'react';

class Counter extends React.Component {
    state = { points: 0 };

    addPoint = () => {
        let newTotal = this.state.points + 1;
        this.setState({ points: newTotal });
    }

    subtractPoint = () => {
        let newTotal = this.state.points - 1;
        this.setState({ points: newTotal });
    }

    render() {
        return (
            <div className="counter-wrap">
                <button className="subtract" onClick={this.subtractPoint}>-</button>
                <p className="points-adding">{this.state.points}</p>
                <button className="add" onClick={this.addPoint}>+</button>
            </div>
        );
    }
}

export default Counter;