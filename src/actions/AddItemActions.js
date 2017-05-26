import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import {
    SEND_ITEM_FORM,
    FROM_TEXT_CHANGED,
    ITEM_RESULTS,
    FETCH_ITEM_SUCCESS
} from './types';

const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob;

export const isFromTextChanged = (text) => {
    return {
        type: FROM_TEXT_CHANGED,
        payload: text
    };
};

export const fetchEventItems = () => {
    // const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref('items').on('value', snapshot => {
            dispatch({ type: FETCH_ITEM_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const itemResults = ({ response }) => {
    return (dispatch) => {
        console.log('Response = ', response);
        
        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            const avatarSource = { uri: response.uri };
            const responsePath = response.origURL;  

            dispatch({
                type: ITEM_RESULTS,
                payload: { avatarSource, responsePath }
            });
        }
    };
};

export const sendItemForm = ({ isFrom, description, responsePath }) => {

    const testImageName = `image-from-react-native-${new Date()}.jpg`;

    return (dispatch) => {
        Blob.build(RNFetchBlob.wrap(responsePath), { type: 'image/jpeg' })
            .then((blob) => firebase.storage()
                    .ref('images')
                    .child(testImageName)
                    .put(blob, { contentType: 'image/png' })
            )
            .then((snapshot) => {
                // console.log(snapshot.downloadURL);
                const itemURL = snapshot.downloadURL;
                firebase.database().ref(`/items/`)
                    .push({ isFrom, itemURL })
                    .then(() => dispatch({ type: SEND_ITEM_FORM }));
            });
    };
};

