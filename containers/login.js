import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loginAction,setLoginFields} from '../actions/mainaction';

class Login extends React.Component{

    authorize=(e)=>{
        e.preventDefault();
        console.log('authorize is called');
        console.log("loginfields : ",this.props.loginFields);
        this.props.loginAction(this.props.loginFields.unm,this.props.loginFields.pwd);
    }

    handleChange=(e)=>{
        const {name,value}=e.target;
        const {loginFields}=this.props;
        loginFields[name]=value;
        this.props.setLoginFields(this.props.loginFields.unm,this.props.loginFields.pwd);
    }
    componentWillReceiveProps(nextProps){
         console.log("in props");
         console.log(nextProps.loginRes);
         if(nextProps.loginRes==='success') {
             console.log('in if of login');
             sessionStorage.setItem('user',this.props.loginFields.unm);
             this.props.history.push('/list');
         }
    }


    render(){
        return(
            <div className={'container col-sm-4 bg-light jumbotron'}>
                <form>
                    <div className={'form-group'}>
                        <input type={'text'} placeholder={'User Name'} value={this.props.loginFields.unm} className={'form-control'} name={'unm'} onChange={this.handleChange}/>
                    </div>
                    <div className={'form-group'}>
                        <input type={'password'} placeholder={'Password'} value={this.props.loginFields.pwd}  className={'form-control'} name={'pwd'} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button className={'btn btn-info'} onClick={this.authorize}>Log In</button>
                    </div>
                </form>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return{
        loginRes:state.loginRes,
        loginFields:state.loginFields
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        loginAction,
        setLoginFields
    },dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(Login);