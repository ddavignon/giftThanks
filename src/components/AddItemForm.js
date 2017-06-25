import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    PixelRatio,
    Platform,
    PermissionsAndroid
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { CardSection, Button, Input } from './common';

// const Permissions = require('react-native-permissions');

class AddItemForm extends Component {

    state = {
        isFromText: '',
        description: '',
        responsePath: '',
        avatarSource: null,
        dbData: '',
        androidPhotoPermission: 'undetermined',
        androidStoragePermission: 'undetermined',
        cameraPermission: 'undetermined',
        photoPermission: 'undetermined'
    }

    componentWillMount() {
        console.log('camera permission: ', this.state.androidPhotoPermission);
        console.log('storage permission: ', this.state.androidStoragePermission);
        //
        // if (Platform.OS === 'android' && this.state.androidPhotoPermission !== 'authorized') {
        //     this.requestPhotoPermission();
        // }
        //
        // if (Platform.OS === 'android' && this.state.androidStoragePermission !== 'authorized') {
        //     this.requestStoragePermission();
        // }
    }

    componentDidMount() {
        console.log('id: ', this.props.eventId);
    //     Permissions.checkMultiplePermissions(['camera', 'photo'])
    //   .then(response => {
    //     //response is an object mapping type to permission
    //     this.setState({
    //       cameraPermission: response.camera,
    //       photoPermission: response.photo,
    //   });
    //   });
    }

    handleAddImageButton() {
        const options = {
            title: 'Select Item',
            // customButtons: [
            //     {name: 'fb', title: 'Choose Photo from Facebook'},
            // ],
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
                const responsePath = Platform.OS === 'android' ? response.path : response.origURL;

                console.log('response', response);
                console.log('Rpth', responsePath);
                this.setState({
                    avatarSource,
                    responsePath
                });
            }
        });
    }

    handleSendItemForm() {
        const { description, responsePath, isFromText } = this.state;
        const { eventId } = this.props;

        const testImageName = `image-from-react-native-${new Date()}.jpg`;
        const { currentUser } = firebase.auth();
        const path = `users/${currentUser.uid}/events/${eventId}/items/`;
        
        console.log(responsePath);

        const Blob = RNFetchBlob.polyfill.Blob;

        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        console.log('add item pressed');

        Blob.build(RNFetchBlob.wrap(responsePath), { type: 'image/jpeg' })
            .then((blob) => firebase.storage()
                    .ref(path)
                    .child(testImageName)
                    .put(blob, { contentType: 'image/png' })
            )
            .catch(console.log('Build blog failed!'))
            .then((snapshot) => {
                console.log('snap', snapshot.downloadURL);
                const itemURL = snapshot.downloadURL;
                firebase.database().ref(path)
                    .push({ name: isFromText, URL: itemURL })
                    .then(() => {
                        this.setState({
                            isFromText: '',
                            description: '',
                            responsePath: '',
                            avatarSource: null,
                            dbData: ''
                        });
                        Actions.gifts({ eventId, type: 'reset' });
                    });
            });
    }

    // async requestPhotoPermission() {
    //     try {
    //          const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.CAMERA, {
    //             'title': 'gifThanks needs photo permission',
    //             'message': 'gifThanks needs access to your camera so you can send thanks.'
    //             }
    //          );
    //          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //              this.setState({ androidPhotoPermission: 'authorized' });
    //          } else {
    //              console.log('Photo permission denied');
    //          }
    //     } catch (err) {
    //          console.warn(err);
    //     }
    //  }
    //
    //  async requestStoragePermission() {
    //      try {
    //           const granted = await PermissionsAndroid.request(
    //              PermissionsAndroid.PERMISSIONS.EXTERNAL_STORAGE, {
    //              title: 'gifThanks needs storage permission',
    //              message: 'gifThanks needs access to your photos so you can send thanks.'
    //              }
    //          );
    //           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //               this.setState({ androidStoragePermission: 'authorized' });
    //           } else {
    //               console.log('External Storage permission denied');
    //           }
    //      } catch (err) {
    //           console.warn(err);
    //      }
    //   }

    render() {
        const { container, clothingItem, clothingItemContainer } = styles;

        // if (Platform.OS === 'android' && this.state.androidPhotoPermission !== 'authorized') {
        //     this.requestPhotoPermission();
        // }
        //
        // if (Platform.OS === 'android' && this.state.androidStoragePermission !== 'authorized') {
        //     this.requestStoragePermission();
        // }

        return (
            <View>
                <CardSection>
                    <View style={{ flex: 1 }} >
                        <TouchableOpacity
                            style={container}
                            onPress={this.handleAddImageButton.bind(this)}
                        >
                            <View style={[container, clothingItem, clothingItemContainer]}>
                                { this.state.avatarSource === null
                                    ? <Text>Select a Photo</Text>
                                    : <Image
                                        style={styles.clothingItem}
                                        source={this.state.avatarSource}
                                    />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </CardSection>
                <CardSection>
                    <Input
                        placeholder="Bob"
                        label="From"
                        value={this.state.isFromText}
                        onChangeText={isFromText => this.setState({ isFromText })}
                    />
                </CardSection>
                {/*<CardSection>
                    <Input
                        placeholder="Game"
                        label="Description"
                        value={this.state.description}
                        onChangeText={description => this.setState({ description })}
                    />
                </CardSection>*/}
                <CardSection>
                    <Button onPress={this.handleSendItemForm.bind(this)}>
                        Add Item
                    </Button>
                </CardSection>
            </View>
        );
    }
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  clothingItemContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  clothingItem: {
    borderRadius: 5,
    width: 275,
    height: 275
  }
};

export default AddItemForm;
