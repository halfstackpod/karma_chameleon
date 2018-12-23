import React from 'react';
import TitleBar from './TitleBar';
import AddUser from './AddUser';
import UserList from './UserList';
import OrderedView from './OrderedView';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);
import AccountsWrapper from './AccountsWrapper.js';

export default class App extends React.Component{
    render() {
        return (
            <Provider store={store}>
                <div>
                    <div className="loginForm">
                        <AccountsWrapper />
                        <br></br>
                        <br></br>
                    </div>
                    <div>
                        <TitleBar />
                        <AddUser karma={0}/>
                        <UserList users={this.props.users}/>
                        <OrderedView />
                    </div>
                </div>
            </Provider>

        );
    }
}