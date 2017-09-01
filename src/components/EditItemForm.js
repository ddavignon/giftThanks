import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    PixelRatio,
    Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { CardSection, Button, Input } from './common';

// const Permissions = require('react-native-permissions');

class EditItemForm extends Component {

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

    componentDidMount() {
        console.log('event item: ', this.props.eventItem);
        const { URL, name } = this.props.eventItem;
        this.setState({
            avatarSource: { uri: URL },
            isFromText: name
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
                //const responsePath = '';
                if (Platform.OS === 'android') {
                    this.setState({ responsePath: response.path });
                }
                const iosResponsePath = response.uri.replace('file://', '');
                this.setState({ responsePath: iosResponsePath });
                //console.log('response', response);
                console.log('Rpth', this.state.responsePath);
                this.setState({
                    avatarSource
                });
            }
        });
    }

    handleSendItemForm() {
        const { responsePath, isFromText } = this.state;
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
                        .set({ name: isFromText, URL: itemURL })
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
                .set({ name: isFromText, URL: this.props.eventItem.URL })
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

    render() {
        const { container, clothingItem, clothingItemContainer, paragraph } = styles;

        return (
            <View style={{ flex: 1, paddingTop: 70, }}>
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
                </CardSection>
                <CardSection>
                    <Input
                        placeholder="Bob"
                        label="From"
                        value={this.state.isFromText}
                        onChangeText={isFromText => this.setState({ isFromText })}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={this.handleSendItemForm.bind(this)}>
                        Update Item
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
    // borderRadius: 5,
    width: 300,
    height: 300
  },
  paragraph: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 25
  },
};

export default EditItemForm;
