import {
    TAB_INDEX
} from './types';

export const navTabChange = (index) => {
    return {
        type: TAB_INDEX,
        payload: index
    };
};
