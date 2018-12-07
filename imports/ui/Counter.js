import React from 'react';

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

    render() {
        return (
            <div className="counter-wrap">
                <button className="subtract" onClick={this.subtractPoint}>-</button>
                <p className="karma-adding">{this.state.karma}</p>
                <button className="add" onClick={this.addPoint}>+</button>
                <button className="apply">Apply</button>
            </div>
        );
    }
}

export default Counter;