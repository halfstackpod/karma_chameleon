import React from 'react';
import AddUser from './AddUser';
import UserList from './UserList';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

export default class App extends React.Component{
    render() {
        return (
            <Provider store={store}>
                <div>
                    <div>Hello</div>
                    <AddUser karma={0}/>
                    <UserList users={this.props.users}/>
                </div>
            </Provider>
        );
    }
}