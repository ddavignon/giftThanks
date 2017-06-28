import { combineReducers } from 'redux';
import EventsMainReducer from './EventsMainReducer';

export default combineReducers({
    eventsMain: EventsMainReducer 
});
