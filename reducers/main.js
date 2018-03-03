import {combineReducers} from 'redux';
import userReducer from './reducer-users';
import stateReducer from './reducer-state';
import cityReducer from './reducer-city';
import fieldReducer from './reducer-fields';
import pageReducer from './reducer-paging';
import editReducer from './reducer-editing';
import loginFieldReducer from './reducer-loginFields';
import loginReducer from './reducer-login';

const allReducers=combineReducers({
    users:userReducer,
    state:stateReducer,
    city:cityReducer,
    obj:fieldReducer,
    page:pageReducer,
    isEdit:editReducer,
    loginFields:loginFieldReducer,
    loginRes:loginReducer
})
export default allReducers;
