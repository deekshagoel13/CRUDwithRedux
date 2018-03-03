export default function(state=[],action){
    switch (action.type){
        case "FETCH_USER":
            return action.users;

        case "ADD_USER":
            return [...state,action.user];

        case "EDIT_USER":
            let arr=[...state];
            var ind=arr.findIndex((dt)=>dt._id===action.user._id);
            arr.splice(ind,1,action.user);
            return arr;

        case "DELETE_USER":
            return [...state].filter((dt)=>dt._id!==action.user._id);

        case "SORT_USER":
            return action.users;

        case "SEARCH_USER":
            return action.users;

        default:
            return state;
    }
}