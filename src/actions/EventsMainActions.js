import { 
    FETCH_EVENTS
} from './types';

export const isFromTextChanged2 = (text) => {
    return {
        type: FETCH_EVENTS,
        payload: text
    };
};
