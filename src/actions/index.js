import { EVENT_NAME, EVENT_COMPLETE } from './types';

export const eventTextChanged = text => {
    console.log('event name text from actions= ', text);
    return {
        type: EVENT_NAME,
        payload: text
    };
};

export const eventTextCompleted = () => {
    return {
        type: EVENT_COMPLETE
    };
 };
