import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    PixelRatio,
    CameraRoll,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import ImageResizer from 'react-native-image-resizer';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Card, SquareCardSection, Button, Input, Spinner } from './common';

// const Permissions = require('react-native-permissions');

class AddItemForm extends Component {

    state = {
        isFromText: '',
        description: '',
        hasBeenSent: false,
        responsePath: '',
        avatarSource: null,
        dbData: '',
        androidPhotoPermission: 'undetermined',
        androidStoragePermission: 'undetermined',
        cameraPermission: 'undetermined',
        photoPermission: 'undetermined',
        sendPhoto: false
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
            console.log('Image Picker Response: ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const avatarSource = { uri: response.uri };

                this.setState({
                    avatarSource,
                    responsePath: response.uri
                });
            }
        });
    }

    handleSendItemForm() {
        this.setState({ sendPhoto: true });
        const { responsePath, isFromText, hasBeenSent } = this.state;
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
                            .push({ name: isFromText, URL: itemURL, sent: hasBeenSent })
                            .then(() => {
                                CameraRoll.saveToCameraRoll(this.state.responsePath)
                                  .then(console.log('Success, Photo added to camera roll!', snapshot.downloadURL))
                                  .catch(err => console.log('err:', err));
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
        const { container, imageItem, imageItemContainer } = styles;

        return (
            <View style={{ flex: 1, paddingTop: 75 }}>

                    <View style={{ flex: 1 }} >
                        <TouchableOpacity
                            style={container}
                            onPress={this.handleAddImageButton.bind(this)}
                        >
                            <View style={[container, imageItem, imageItemContainer]}>
                                { this.state.avatarSource === null
                                    ? <Text style={{ fontSize: 18 }}>Select a Photo</Text>
                                    : <Image
                                        style={styles.imageItem}
                                        source={this.state.avatarSource}
                                    />
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
                  {this.state.sendPhoto
                      ?
                      <Card>
                          <SquareCardSection>
                                  <Spinner size="large" />
                          </SquareCardSection>
                      </Card>
                      :
                      <SquareCardSection>
                          <Button onPress={this.handleSendItemForm.bind(this)}>
                              Add Item
                          </Button>
                      </SquareCardSection>
                  }
                </View>
            </View>
        );
    }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF'
    backgroundColor: 'transparent'
  },
  imageItemContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 2 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageItem: {
    // borderRadius: 5,
    width: 300,
    height: 300
  }
};

export default AddItemForm;
