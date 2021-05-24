const data = {
    opponent:[],
    player:[]
}

const FrontRowReducer = (state = data,action) =>{
    switch(action.type){
        case 'opponent' :
            return {
                ...state,
                opponent:action.FrontRow
            }
        case 'player' :
            return {
                ...state,
                player:action.FrontRow
            }
        default:
            return state
    } 
}

export default FrontRowReducer