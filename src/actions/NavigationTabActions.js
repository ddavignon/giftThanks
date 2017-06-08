import {
    TAB_INDEX,
    EVENT_KEY_INDEX
} from './types';

export const navTabChange = (index) => {
    return {
        type: TAB_INDEX,
        payload: index
    };
};

export const eventKeyIndex = (key) => {
    return {
        type: EVENT_KEY_INDEX,
        payload: key
    };
};
