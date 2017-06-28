import { combineReducers } from 'redux';
import EventsMainReducer from './EventsMain';

export default combineReducers({
    eventsMain: EventsMainReducer 
});
