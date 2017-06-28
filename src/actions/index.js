import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EVENTS_FETCH_SUCCESS
} from './types';

export const fetchEvents = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase
            .database()
            .ref(`users/${currentUser.uid}/events/`)
            .on('value', snapshot => {
                //this.setState({ dbData: snapshot.val() });
                dispatch({ type: EVENTS_FETCH_SUCCESS, payload: snapshot.val() })
            });
    }
}