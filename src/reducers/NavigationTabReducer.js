import {
    TAB_INDEX,
    EVENT_KEY_INDEX
} from '../actions/types';


const INITIAL_STATE = {
    pageIndex: 1,
    eventPathKey: ''
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAB_INDEX:
            return {
                ...state,
                pageIndex: action.payload
            };
        case EVENT_KEY_INDEX:
            return {
                ...state,
                eventPathKey: action.payload
            };
        default:
            return state;     
    }
};
