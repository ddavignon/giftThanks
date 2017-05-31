import {
    TAB_INDEX
} from '../actions/types';


const INITIAL_STATE = {
    pageIndex: 1
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAB_INDEX:
            return {
                ...state,
                pageIndex: action.payload
            };
        default:
            return state;     
    }
};
