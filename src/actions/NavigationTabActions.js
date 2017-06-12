import { Actions } from 'react-native-router-flux';
import {
    TAB_INDEX
} from './types';

export const navTabChange = (index) => {
    switch (index) {
        case 0:
            return;
        case 1:
            return (dispatch) => {
                dispatch({ type: TAB_INDEX, payload: index });
                Actions.events();
            }
        case 2:
            return;
        case 3:
            return (dispatch) => {
                dispatch({ type: TAB_INDEX, payload: index });
                Actions.gifts();
            }
        default:
            return {
                type: TAB_INDEX,
                payload: index
            };
    }
};
