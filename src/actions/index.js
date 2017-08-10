import { EVENT_NAME } from './types';

export const eventTextChanged = text => {
    return {
        type: EVENT_NAME,
        payload: text
    };
};
