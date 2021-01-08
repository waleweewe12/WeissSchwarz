import FrontRowReducer from './FrontRowReducer'
import {combineReducers} from 'redux'

const AllReducer = combineReducers({
    FrontRow:FrontRowReducer
})

export default AllReducer