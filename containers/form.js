import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCity,addUser,editUser,setFields} from '../actions/mainaction';
let show=true;
class Form extends React.Component{


    // checkMail=()=>{
    //     if(!(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.mail))) {
    //         this.setState({
    //             error:'Enter a valid email address.',
    //             mail:''
    //         })
    //     }
    //     else{
    //         this.setState({
    //             error:''
    //         })
    //     }
    // }
    //
    // checkName=()=>{
    //     if(!(/^[A-Za-z]\w+$/.test(this.state.fnm)) || !(/^[A-Za-z]\w+$/.test(this.state.lnm))){
    //         this.setState({
    //             error:(!(/^[A-Za-z]\w+$/.test(this.state.fnm)))?'Enter Valid First Name.':'Enter Valid Last Name.',
    //             fnm:(!(/^[A-Za-z]\w+$/.test(this.state.fnm)))?'':this.state.fnm,
    //             lnm:(!(/^[A-Za-z]\w+$/.test(this.state.lnm)))?'':this.state.lnm
    //         })
    //     }
    //     else{
    //         this.setState({
    //             error:''
    //         })
    //
    //     }
    // }
    //

    clearControls=()=>{
        var obj1={
            "fnm":'',
            "lnm":'',
            "email":'',
            "state":'',
            "city":''
        };
        this.props.setFields(obj1);
    }

    handleSubmit=(e)=>{

        var obj={
            "firstName":this.props.obj.fnm,
            "lastName":this.props.obj.lnm,
            "email":this.props.obj.email,
            "state":this.props.obj.state,
            "city":this.props.obj.city
        }
        if(e.target.innerHTML==="Add")
            this.props.addUser(obj);
        else {
            console.log(this.props.obj.id);
            this.props.editUser(obj, this.props.obj.id);
            e.target.innerHTML='Add';
        }
        this.clearControls();
    }

    handlefnmChange=(e)=>{
        var obj={
            "id":this.props.obj.id,
            "fnm":e.target.value,
            "lnm":this.props.obj.lnm,
            "email":this.props.obj.email,
            "state":this.props.obj.state,
            "city":this.props.obj.city
        }
        this.props.setFields(obj);
    }

    handlelnmChange=(e)=>{
        var obj={
            "id":this.props.obj.id,
            "fnm":this.props.obj.fnm,
            "lnm":e.target.value,
            "email":this.props.obj.email,
            "state":this.props.obj.state,
            "city":this.props.obj.city
        }
        this.props.setFields(obj);
    }

    handlemailChange=(e)=>{
        var obj={
            "id":this.props.obj.id,
            "fnm":this.props.obj.fnm,
            "lnm":this.props.obj.lnm,
            "email":e.target.value,
            "state":this.props.obj.state,
            "city":this.props.obj.city
        }
        this.props.setFields(obj);
    }

    handlestateChange=(e)=>{
        this.props.fetchCity(e.target.selectedOptions[0].id)
        var obj={
            "id":this.props.obj.id,
            "fnm":this.props.obj.fnm,
            "lnm":this.props.obj.lnm,
            "email":this.props.obj.email,
            "state":e.target.selectedOptions[0].innerHTML,
            "city":''
        }
        this.props.setFields(obj);
    }

    handlecityChange=(e)=>{
        var obj={
            "id":this.props.obj.id,
            "fnm":this.props.obj.fnm,
            "lnm":this.props.obj.lnm,
            "email":this.props.obj.email,
            "state":this.props.obj.state,
            "city":e.target.selectedOptions[0].innerHTML
        }
        this.props.setFields(obj);
    }

    render(){
        return(
            <div>

                <div className={'modal-header'}>
                    <h3>Employee Details</h3>
                    <button className={'close'} data-dismiss={'modal'} onClick={this.clearControls}>&times;</button>
                </div>
                <div className="container modal-body">
                    <label className={'text-danger'}></label>
                    <form onLoad={this.clearControls}>
                        <div className="form-group">
                            <input className="form-control" onChange={this.handlefnmChange} type="text" placeholder="First Name" value={this.props.obj.fnm}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" onChange={this.handlelnmChange} type="text" placeholder="Last Name" value={this.props.obj.lnm}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" onChange={this.handlemailChange} type="text" placeholder="Email" value={this.props.obj.email}/>
                        </div>
                        <div className="form-group">
                            <select className="form-control"
                                    onChange={this.handlestateChange}
                                    value={this.props.obj.state}
                            >
                                <option id={0}>--Select State--</option>
                                {
                                    this.props.s.map((st)=>{
                                        return <option key={st._id} id={st._id}>{st.stateName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <select className="form-control"  value={this.props.obj.city} onChange={this.handlecityChange}>
                                <option id={0} key={0}>{(this.props.obj.city!=='')?this.props.obj.city:'--Select City--'}</option>
                                {
                                    this.props.c.map((city)=>{
                                        return <option key={city._id} id={city._id}>{city.cityName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className={'modal-footer'}>
                            {(show)?
                            <button data-dismiss="modal" className="btn btn-info" onClick={this.handleSubmit}>{'Add'}</button>
                            :<button data-dismiss="modal" className="btn btn-info" onClick={this.handleSubmit}>{'Edit'}</button>
                                }
                            <button className="btn btn-info" data-dismiss="modal" onClick={this.clearControls}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        s:state.state,
        c:state.city,
        obj:state.obj
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchCity:fetchCity,
        addUser:addUser,
        setFields:setFields,
        editUser:editUser
    },dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(Form);