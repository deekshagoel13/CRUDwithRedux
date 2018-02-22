export default (state=[],action)=>{
    switch (action.type){
        case "FETCH_STATE":
            return action.states;
        default:
            return state;
    }
}