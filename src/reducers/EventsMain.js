import {
    EVENTS_FETCH_SUCCESS
} from './types';

const INITIAL_STATE = {
    dbData: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EVENTS_FETCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
