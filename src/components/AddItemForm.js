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
import ImageResizer from 'react-native-image-resizer';
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
    }

    componentDidMount() {
        console.log('id: ', this.props.eventId);
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
            //console.log('Response = ', response.uri);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const avatarSource = { uri: response.uri };
                // //const responsePath = '';
                // if (Platform.OS === 'android') {
                //     this.setState({ responsePath: response.path });
                // } else {
                //     const iosResponsePath = response.uri.replace('file://', '');
                //     this.setState({ responsePath: iosResponsePath });
                // }
                console.log('response', response);
                console.log('Rpth', this.state.responsePath);
                this.setState({
                    avatarSource,
                    responsePath: response.uri
                });
            }
        });
    }

    handleSendItemForm() {
        const { responsePath, isFromText } = this.state;
        const { eventId } = this.props;

        const testImageName = `image-from-react-native-${new Date()}.jpg`;
        const { currentUser } = firebase.auth();
        const path = `users/${currentUser.uid}/events/${eventId}/items/`;

        console.log('respnse path', responsePath);

        const Blob = RNFetchBlob.polyfill.Blob;

        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        console.log('add item pressed');

        ImageResizer.createResizedImage(responsePath, 600, 600, 'JPEG', 80)
            .then((resizedImageUri) => {
                Blob.build(RNFetchBlob.wrap(resizedImageUri), { type: 'image/jpeg' })
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
                                Actions.gifts({ eventId, type: 'back' });
                            });
                    });
            }).catch((err) => {
                console.log('error for resize', err);
                return alert('Unable to resize the photo Check the console for full the error message');
            });
    }

    render() {
        const { container, clothingItem, clothingItemContainer } = styles;

        return (
            <View style={{ flex: 1, paddingTop: 70 }}>
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
    flex: 1,
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
    // borderRadius: 5,
    width: 300,
    height: 300
  }
};

export default AddItemForm;
