import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/myApp';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import allReducer from './reducers/main';
import * as fetchUserAction from './actions/mainaction';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);
const store = createStore(allReducer, enhancer);
//store.dispatch(fetchUserAction.fetchUser());
store.dispatch(fetchUserAction.pageAction());
store.dispatch(fetchUserAction.fetchState());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
