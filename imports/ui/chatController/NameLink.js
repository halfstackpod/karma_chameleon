import React from 'react';

export default class NameLink extends React.Component {

    render() {
        const names = this.props.userList.map((val) => {
            return <li>{val}</li>
        })
        return (
            <div>
                <ul>
                    {names}
                </ul>
            </div>
        )
    }
}