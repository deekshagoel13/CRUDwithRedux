import React from 'react';
import '../App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser,setFields,deleteUser,pageAction} from '../actions/mainaction';
import Modal from '../components/modal';

class UserList extends React.Component{

    populateData=(e)=>{
        console.log(e.target.id);
        var edit;
        var {users}=this.props;
        users.map((user)=>{
            if(user._id===e.target.id){
                edit=user;
            }
        })
        var obj={
            "id":edit._id,
            "fnm":edit.firstName,
            "lnm":edit.lastName,
            "email":edit.email,
            "state":edit.state,
            "city":edit.city,
            "edit":true
        }
        this.props.setFields(obj);
    }

    deleteData=(id)=>{
        if(window.confirm('Are you sure you want to delete this record?')) {
            this.props.deleteUser(id);
        }
    }
    createListItem=()=>{
        let {pagenum,limit}=this.props.page;
        let {users}=this.props;
        var end=pagenum*limit;
        var start=end-limit;
        var curr=users.slice(start,end);
        var pages=[];
        for(var i=1;i<=Math.ceil(users.length/limit);i++){
            pages.push(i);
        }

        var createPageNumbers=pages.map((p)=>{
            return(
                <a href={'#'} className={'disp'} key={p} onClick={()=>{this.props.pageAction(p,limit)}}>{p}</a>
            )

        })
        return(
            <div className={'container'}>
                <div className={'form-group col-sm-2 offset-5'}>
                    Records Per Page:
                    <select className={'form-control'} onChange={(e)=>{this.props.pageAction(1,e.target.selectedOptions[0].innerHTML)}}>
                        <option>1</option>
                        <option selected={'selected'}>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
            <table className={'table table-hover table-bordered'}>
                <tbody>
                <tr align={'center'}><td colSpan={7}>
                    <button className={'btn btn-info'} data-target={'#myModal'} data-toggle={'modal'}>Add New</button>
                    <Modal/>
                </td></tr>
                    <tr align={'center'}>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>email</th>
                        <th>state</th>
                        <th>city</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                {
                    curr.map((user) => {
                        return (
                            <tr
                                key={user._id}
                                align={'center'}
                            >
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.state}</td>
                                <td>{user.city}</td>
                                <td><button className={'btn btn-info'} id={user._id} data-target={'#myModal'} data-toggle={'modal'} onClick={this.populateData}>Edit</button></td>
                                <td><button className={'btn btn-info'}onClick={()=>{this.deleteData(user._id)}}>Delete</button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
                <div align={'center'} className={'disp'}>
                    {createPageNumbers}
                </div>
            </div>
        )
    }

    render(){
        return(
            <ul>
                {this.createListItem()}
            </ul>
        )
    }
}

function mapStateToProps(state){
    return{
        users:state.users,
        page:state.page
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectUser:selectUser,
        setFields:setFields,
        deleteUser:deleteUser,
        pageAction:pageAction
    },dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(UserList);