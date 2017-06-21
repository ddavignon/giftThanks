import { combineReducers } from 'redux';
import AddItemReducer from './AddItemReducer';
import EventsMainReducer from './EventsMainReducer';


export default combineReducers({
    addItem: AddItemReducer,
    eventsMain: EventsMainReducer
});
