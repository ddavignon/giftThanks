import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    PixelRatio,
    Platform,
    CameraRoll
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { SquareCardSection, Button, Input } from './common';

// const Permissions = require('react-native-permissions');

class EditItemForm extends Component {

    state = {
        isFromText: '',
        description: '',
        hasBeenSent: '',
        responsePath: '',
        avatarSource: null,
        dbData: '',
        androidPhotoPermission: 'undetermined',
        androidStoragePermission: 'undetermined',
        cameraPermission: 'undetermined',
        photoPermission: 'undetermined'
    }

    componentDidMount() {
        console.log('editItemForm props: ', this.props);
        const { URL, name, sent } = this.props.eventItem;
        this.setState({
            avatarSource: { uri: URL },
            isFromText: name,
            hasBeenSent: sent
        });
    }

    handleAddImageButton() {
        const options = {
            title: 'Select Item',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };


        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const avatarSource = { uri: response.uri };
                // const responsePath = '';
                // if (Platform.OS === 'android') {
                //     this.setState({ responsePath: response.path });
                // }
                // const iosResponsePath = response.uri.replace('file://', '');
                // this.setState({ responsePath: iosResponsePath });
                // //console.log('response', response);
                // console.log('Rpth', this.state.responsePath);
                this.setState({
                    avatarSource,
                    responsePath: response.uri
                });
            }
        });
    }
    handleSendItemForm() {
        const { responsePath, isFromText, hasBeenSent } = this.state;
        const { eventId, editKeyId } = this.props;
        //console.log('event id: ', this.props.eventItem);
        const testImageName = `image-from-react-native-${new Date()}.jpg`;
        const { currentUser } = firebase.auth();
        const path = `users/${currentUser.uid}/events/${eventId}/items/${editKeyId}`;
        const storagePath = `users/${currentUser.uid}/events/${eventId}/items/`;

        //console.log(responsePath);

        const Blob = RNFetchBlob.polyfill.Blob;

        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        console.log('edit item pressed');
        if (responsePath) {
            Blob.build(RNFetchBlob.wrap(responsePath), { type: 'image/jpeg' })
                .then((blob) => firebase.storage()
                        .ref(storagePath)
                        .child(testImageName)
                        .put(blob, { contentType: 'image/png' })
                )
                .catch(console.log('Build blob failed!'))
                .then((snapshot) => {
                    console.log('snap', snapshot.downloadURL);
                    const itemURL = snapshot.downloadURL;
                    firebase.database().ref(path)
                        .set({ name: isFromText, URL: itemURL, sent: hasBeenSent })
                        .then(() => {
                            this.setState({
                                isFromText: '',
                                description: '',
                                responsePath: '',
                                avatarSource: null,
                                dbData: ''
                            });
                            const deletePhotoRef = firebase.storage()
                                .refFromURL(this.props.eventItem.URL);
                            deletePhotoRef.delete().then(() => {
                                Actions.gifts({ eventId, type: 'back' });
                            });
                        });
                });
        } else {
            console.log('same URL');
            firebase.database().ref(path)
                .set({ name: isFromText, URL: this.props.eventItem.URL, sent: hasBeenSent })
                .then(() => {
                    this.setState({
                        isFromText: '',
                        description: '',
                        responsePath: '',
                        avatarSource: null,
                        dbData: ''
                    });
                    Actions.gifts({ eventId, type: 'back' });
                });
        }
    }
    // handleSendItemForm() {
    //     const { responsePath, isFromText, hasBeenSent } = this.state;
    //     const { eventId, editKeyId } = this.props;
    //     //console.log('event id: ', this.props.eventItem);
    //     const testImageName = `image-from-react-native-${new Date()}.jpg`;
    //     const { currentUser } = firebase.auth();
    //     const path = `users/${currentUser.uid}/events/${eventId}/items/${editKeyId}`;
    //     const storagePath = `users/${currentUser.uid}/events/${eventId}/items/`;
    //
    //     //console.log(responsePath);
    //
    //     const Blob = RNFetchBlob.polyfill.Blob;
    //
    //     window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    //     window.Blob = Blob;
    //     console.log('edit item pressed');
    //     if (responsePath) {
    //       ImageResizer.createResizedImage(responsePath, 600, 600, 'JPEG', 80)
    //           .then((resizedImageUri) => {
    //               Blob.build(RNFetchBlob.wrap(resizedImageUri), { type: 'image/jpeg' })
    //                   .then((blob) => firebase.storage()
    //                           .ref(path)
    //                           .child(testImageName)
    //                           .put(blob, { contentType: 'image/png' })
    //                   )
    //                   .catch(console.log('Build blog failed!'))
    //                   .then((snapshot) => {
    //                       console.log('snap', snapshot.downloadURL);
    //                       const itemURL = snapshot.downloadURL;
    //                       firebase.database().ref(path)
    //                           .push({ name: isFromText, URL: itemURL, sent: hasBeenSent })
    //                           .then(() => {
    //                               CameraRoll.saveToCameraRoll(this.state.responsePath)
    //                                 .then(console.log('Success', 'Photo added to camera roll!'))
    //                                 .catch(err => console.log('err:', err));
    //                               this.setState({
    //                                   isFromText: '',
    //                                   description: '',
    //                                   responsePath: '',
    //                                   avatarSource: null,
    //                                   dbData: ''
    //                               });
    //                               Actions.gifts({ eventId, type: 'back' });
    //                           });
    //                   });
    //           }).catch((err) => {
    //               console.log('error for resize', err);
    //               return alert('Unable to resize the photo Check the console for full the error message');
    //           });
    //     } else {
    //         console.log('same URL');
    //         firebase.database().ref(path)
    //             .set({ name: isFromText, URL: this.props.eventItem.URL, sent: hasBeenSent })
    //             .then(() => {
    //                 this.setState({
    //                     isFromText: '',
    //                     description: '',
    //                     responsePath: '',
    //                     avatarSource: null,
    //                     dbData: ''
    //                 });
    //                 Actions.gifts({ eventId, type: 'back' });
    //             });
    //     }
    // }

    render() {
        const { container, imageItem, imageItemContainer, paragraph } = styles;

        return (
            <View style={{ flex: 1, paddingTop: 75, }}>
                    <View style={{ flex: 1 }} >
                        <TouchableOpacity
                            style={container}
                            onPress={this.handleAddImageButton.bind(this)}
                        >
                            <View style={[container, imageItem, imageItemContainer]}>
                                { this.state.avatarSource === null
                                    ? <Text>Select a Photo</Text>
                                    : <Image
                                        style={styles.imageItem}
                                        source={this.state.avatarSource}
                                    >
                                    <Text
                                        style={paragraph}
                                    >
                                        Tap to update image
                                    </Text>
                                    </Image>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>

                <View style={{ marginHorizontal: 10 }}>
                  <View style={{ marginTop: 14 }}>
                    <SquareCardSection>
                        <Input
                            placeholder="Bob"
                            label="From"
                            value={this.state.isFromText}
                            onChangeText={isFromText => this.setState({ isFromText })}
                        />
                    </SquareCardSection>
                  </View>
                  <SquareCardSection>
                      <Button onPress={this.handleSendItemForm.bind(this)}>
                          Update Item
                      </Button>
                  </SquareCardSection>
                </View>
            </View>
        );
    }
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageItemContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageItem: {
    // borderRadius: 5,
    width: 300,
    height: 300
  },
  paragraph: {
    paddingTop: 130,
    textAlign: 'center',
    color: '#D3D3D3',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 25
  },
};

export default EditItemForm;
