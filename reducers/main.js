import {combineReducers} from 'redux';
import userReducer from './reducer-users';
import stateReducer from './reducer-state';
import cityReducer from './reducer-city';
import fieldReducer from './reducer-fields';
import pageReducer from './reducer-paging';

const allReducers=combineReducers({
    users:userReducer,
    state:stateReducer,
    city:cityReducer,
    obj:fieldReducer,
    page:pageReducer
})
export default allReducers;
