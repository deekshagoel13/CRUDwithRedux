export default (state=[],action)=>{
    switch (action.type){
        case "FETCH_CITY":
            return action.city;
        default:
            return state;
    }
}