import { combineReducers } from 'redux';
import AddItemReducer from './AddItemReducer';
import NavigationTabReducer from './NavigationTabReducer';
import EventsMainReducer from './EventsMainReducer';


export default combineReducers({
    addItem: AddItemReducer,
    eventsMain: EventsMainReducer,
    navIndex: NavigationTabReducer
});
