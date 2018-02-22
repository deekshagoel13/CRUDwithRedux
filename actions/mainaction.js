export const selectUser=(user)=>{
    console.log('You clicked : ',user.firstName);
    return{
        type:'SELECT_USER',
        payload:user
    }
}

export const fetchUserAction=(users)=>{
    return{
        type:'FETCH_USER',
        users
    }
};

export const fetchStateAction=(states)=>{
    return{
        type:'FETCH_STATE',
        states
    }
};

export const fetchCityAction=(city)=>{
    return{
        type:'FETCH_CITY',
        city
    }
}

export const addUserAction=(user)=>{
    return{
        type:'ADD_USER',
        user
    }
}

export const editUserAction=(user)=>{
    return{
        type:'EDIT_USER',
        user
    }
}

export const deleteUserAction=(user)=>{
    return{
        type:'DELETE_USER',
        user
    }
}

export const pageAction=(p=1,l=2)=>{
    return ((dispatch) =>{
        dispatch({type:'PAGING',payload:{"pagenum":p,"limit":l}});
    })
}

export const fetchUser=()=>{
    return (dispatch=>{
        return fetch('http://localhost:3000/person')
            .then((res)=>{
                return res.json();
            }).then((data)=>{

                dispatch(fetchUserAction(data))
            }).catch((err)=>{
                console.log("Error in fetching record.",err);
            })
    })
}

export const fetchState=()=>{
    return (dispatch=>{
        return fetch('http://localhost:3000/state')
            .then((res)=>{
                return res.json();
            }).then((data)=>{
                dispatch(fetchStateAction(data))
            }).catch((err)=>{
                console.log("Error in fetching record.",err);
            })
    })
}

export const fetchCity=(sid)=>{
     var url=`http://localhost:3000/city/${sid}`;
    return (dispatch=>{
    fetch(url).then((response)=>{
        return response.json()
    }).then((city)=>{
        console.log("city",city);
        dispatch(fetchCityAction(city))
    }).catch(()=>{
        console.log('Error in fetch.');
    })
})
}

export const addUser=(obj)=>{
    var url=`http://localhost:3000/p`;
    var data={
        method:'post',
        mode:'cors',
        body:JSON.stringify(obj),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return (dispatch=>{
        fetch(url,data).then((response)=>{
            return response.json()
        }).then((rec)=>{
            console.log(rec.record);
            dispatch(addUserAction(rec.record))
        }).catch(()=>{
            console.log('Error in Add.');
        })
    })
}

export const editUser=(obj,id)=>{
    console.log(id);
    var url=`http://localhost:3000/person/${id}`;
    var data={
        method:'put',
        mode:'cors',
        body:JSON.stringify(obj),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return (dispatch=>{
        fetch(url,data).then((response)=>{
            return response.json()
        }).then((rec)=>{
            dispatch(editUserAction(rec.record))
        }).catch((err)=>{
            console.log('Error in Edit.',err);
        })
    })
}

export const deleteUser=(id)=>{
    console.log(id);
    var url=`http://localhost:3000/person/${id}`;
    var data={
        method:'delete',
        mode:'cors',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return (dispatch=>{
        fetch(url,data).then((response)=>{
            return response.json()
        }).then((rec)=>{
            console.log("In delete user",rec);
            dispatch(deleteUserAction(rec))
        }).catch((err)=>{
            console.log('Error in Delete.',err);
        })
    })
}

export const setFields=(obj)=>{
    return ((dispatch,getState) =>{
        let user = getState().obj
        dispatch({type:'SET_FIELDS',payload:{...user,obj}})
    })
}
