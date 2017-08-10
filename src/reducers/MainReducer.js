import { EVENT_NAME } from '../actions/types';

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
        default:
            return state;
    }
};

