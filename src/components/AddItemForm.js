import React, { Component } from 'React';
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    PixelRatio
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import { Card, CardSection, Button, Input } from './common';

const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob;

class AddItemForm extends Component {
    
    state = {
        isFrom: '',
        description: '',
        responsePath: '',
        avatarSource: null,
    }

    handleAddImageButton() {
                // More info on all the options is below in the README...just some common use cases shown here 
        const options = {
            title: 'Select Avatar',
            customButtons: [
                {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
            
            /**
             * The first arg is the options object for customization (it can also be null or omitted for default options),
             * The second arg is the callback which sends object: response (more info below in README)
             */
        ImagePicker.showImagePicker(options, (response) => {
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
                const source = { uri: response.uri };
                const path = response.origURL;  

                this.setState({
                    avatarSource: source,
                    responsePath: path
                });
            }
        });
    }

    sendItemForm() {
        const { isFrom, description, responsePath } = this.state;

        
        const testImageName = `image-from-react-native-${new Date()}.jpg`;

        Blob.build(RNFetchBlob.wrap(responsePath), { type: 'image/jpeg' })
            .then((blob) => firebase.storage()
                    .ref('images')
                    .child(testImageName)
                    .put(blob, { contentType: 'image/png' })
            )
            .then((snapshot) => {
                // console.log(snapshot.downloadURL);
                let itemURL = snapshot.downloadURL;
                firebase.database().ref(`/items/`)
                    .push({ isFrom, description, itemURL })
                    .then(() => this.setState({ isFrom: '', description: '' }));

            });
    }

    render () {
        const { container, clothingItem, clothingItemContainer } = styles;

        return (
            <View>
                <CardSection>
                    <View style={{ flex: 1}} >
                        <TouchableOpacity style={container} onPress={this.handleAddImageButton.bind(this)}>
                            <View style={[container, clothingItem, clothingItemContainer]}>
                                { this.state.avatarSource === null
                                    ? <Text>Select a Photo</Text>
                                    : <Image style={styles.clothingItem} source={this.state.avatarSource} />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </CardSection>
                <CardSection>
                    <Input
                        placeholder="Bob"
                        label="From"
                        value={this.state.description}
                        onChangeText={description => this.setState({ description })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        placeholder="Game"
                        label="Description"
                        value={this.state.isFrom}
                        onChangeText={isFrom => this.setState({ isFrom })}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={this.sendItemForm.bind(this)}>
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