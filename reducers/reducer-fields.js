export default (state=[],action)=>{
    switch (action.type){
        case "SET_FIELDS":
            console.log(action.payload);
            return action.payload.obj;
        default:
            return state;
    }
}