export default (state=[],action)=>{
    switch(action.type){
        case "PAGING":
            return action.payload
        default:
            return state;
    }
}