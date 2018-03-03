export default (state=[],action)=>{
    switch(action.type){
        case "SET_LOGINFIELDS":
            return action.payload;
        default:
            return state;
    }
}