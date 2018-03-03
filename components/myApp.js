import React from 'react';
import UserList from '../containers/userList';
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
import Login from '../containers/login';


const Links=()=>{
    return(
        <ul>
            <li>
                <NavLink to={'/login'}>LogIn</NavLink>
            </li>
            <li>
                <NavLink to={'/list'}>User List</NavLink>
            </li>
        </ul>
    )
}
const App=()=>{
    return(
        <Router>
            <div className={'row'}>
            <div className={'col-md-2'}>
                <Links/>
            </div>
            <div className={'col-md-10'}>
                <Route exact path={'/login'} component={Login}/>
                <Route exact path={'/list'} component={UserList}/>
            </div>
            </div>
        </Router>
    )
}
export default App;