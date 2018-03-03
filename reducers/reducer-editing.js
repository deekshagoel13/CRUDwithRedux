export default (state=false,action)=>{
    switch(action.type){
        case "IS_EDITING":
            return action.payload;
        default:
            return state;
    }

}