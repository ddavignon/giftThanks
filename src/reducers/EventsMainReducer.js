import {
    FETCH_EVENTS
} from '../actions/types';


const INITIAL_STATE = {
    eventName: '',
    visible: false,
    showDeleteModal: false,
    deleteKeyId: '',
    editKeyId: '',
    dbData: {}
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_EVENTS:
            return {
                ...state,
                dbData: action.payload
            };
        default:
            return state;     
    }
};

