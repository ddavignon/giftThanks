import { combineReducers } from 'redux';
import AddItemReducer from './AddItemReducer';

export default combineReducers({
    addItem: AddItemReducer
});
