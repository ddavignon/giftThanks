import { combineReducers } from 'redux';
import AddItemReducer from './AddItemReducer';
import NavigationTabReducer from './NavigationTabReducer';

export default combineReducers({
    addItem: AddItemReducer,
    navIndex: NavigationTabReducer
});
