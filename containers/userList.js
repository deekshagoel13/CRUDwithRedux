import React from 'react';
import '../App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setFields,deleteUser,pageAction,isEditAction,sortUserAction,searchUserAction,fetchUser,logoutAction,setLoginFields} from '../actions/mainaction';
import Modal from '../components/modal';
class UserList extends React.Component{

    componentWillMount(){

        if(sessionStorage.getItem('user')!==null)
            this.props.fetchUser();
        else
            this.props.history.push('/login');
    }

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
            "edit":true,
            "file":edit.img
        }

       this.props.isEditAction(true);

        this.props.setFields(obj);
    }

    deleteData=(id)=>{
        if(window.confirm('Are you sure you want to delete this record?')) {
            this.props.deleteUser(id);
        }
    }

    sortdata=(e)=>{
        var arr=[...this.props.users];
         arr.sort((a,b)=>{
             var res;

             if(a[e.target.innerHTML].toUpperCase()===b[e.target.innerHTML].toUpperCase())
                 res=0;
             else if(a[e.target.innerHTML].toUpperCase()>b[e.target.innerHTML].toUpperCase())
                 res=1;
             else
                 res=-1;
             return res;
         });
         this.props.sortUserAction(arr);
    }

    searchdata=(e)=>{
        var key=e.target.value;
        console.log("KEY : ",key);
        var arr=[...this.props.users];
        var isFiltered=false;
        var newArr = [];
        if (key !== '') {
            isFiltered = true;

            for (var i = 0; i < arr.length; i++) {

                if (arr[i].firstName.indexOf(key) >= 0 || arr[i].lastName.indexOf(key) >= 0 || arr[i].state.indexOf(key) >= 0 || arr[i].city.indexOf(key) >= 0) {
                    newArr.push(arr[i]);
                }
            }
        }
        if(!newArr.length<1)
            this.props.searchUserAction(newArr);
    }

    handleLogout=(e)=>{
        sessionStorage.removeItem('user');
        this.props.history.push('/login');
        this.props.logoutAction();
        this.props.setLoginFields('','');
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
            <div className={'container-fluid jumbotron'}>

            <table className={'table table-hover table-bordered'}>
                <tbody>
                <tr align={'center'}><td colSpan={8}>
                    <button className={'btn btn-info'} data-target={'#myModal'} data-toggle={'modal'}>Add New</button>
                    <Modal/>
                </td></tr>
                    <tr align={'center'}>
                        <th onClick={this.sortdata}>firstName</th>
                        <th onClick={this.sortdata}>lastName</th>
                        <th>email</th>
                        <th onClick={this.sortdata}>state</th>
                        <th onClick={this.sortdata}>city</th>
                        <th>Profile</th>
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
                                <td><img src={"http://localhost:3000/uploads/"+user.img} height={100} width={100} /></td>
                                <td><button className={'btn btn-info'} id={user._id} data-target={'#myModal'} data-toggle={'modal'} onClick={this.populateData}>Edit</button></td>
                                <td><button className={'btn btn-info'} onClick={()=>{this.deleteData(user._id)}}>Delete</button></td>
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
            <div className={'container'}>
                <div className={'form-inline navbar navbar-expand-sm navbar-dark bg-dark float-right'}>
                    <input className={'form-control'} type={'text'} placeholder={'Search'} onChange={this.searchdata}/>
                    <button className={'btn btn-info'} onClick={this.searchdata}>Search</button>
                    <button className={'btn btn-info'} onClick={this.handleLogout}>Logout</button>
                </div>
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
                <div>
                    <ul>
                         {this.createListItem()}
                    </ul>
                </div>
            </div>
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
        setFields:setFields,
        deleteUser:deleteUser,
        pageAction:pageAction,
        isEditAction:isEditAction,
        sortUserAction,
        searchUserAction,
        fetchUser,
        logoutAction,setLoginFields
    },dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(UserList);