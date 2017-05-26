import {
    SEND_ITEM_FORM,
    FROM_TEXT_CHANGED,
    ITEM_RESULTS,
    FETCH_ITEM_SUCCESS
} from '../actions/types';


const INITIAL_STATE = {
    isFrom: '',
    description: '',
    responsePath: '',
    avatarSource: null,
    dbData: ''
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEND_ITEM_FORM:
            return {
                ...state,
                INITIAL_STATE
            };
        case FROM_TEXT_CHANGED:
            return {
                ...state,
                isFrom: action.payload
            };
        case FETCH_ITEM_SUCCESS:
            return {
                ...state,
                dbData: action.payload
            };
        case ITEM_RESULTS:
            return {
                ...state,
                responsePath: action.payload.responsePath,
                avatarSource: action.payload.avatarSource
            };
        default:
            return state;     
    }
};

