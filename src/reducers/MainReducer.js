import { EVENT_NAME, EVENT_COMPLETE } from '../actions/types';

  const INITIAL_STATE = {
      eventName: ''
 };

 export default(state = INITIAL_STATE, action) => {
     switch (action.type) {
         case EVENT_NAME:
             return {
                  ...state,
                  eventName: action.payload
              };
         case EVENT_COMPLETE:
             return INITIAL_STATE;
          default:
              return state;
      }
 };
