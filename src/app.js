import React, { Component } from 'React';
import { Image, View, Text, Button, PixelRatio } from 'react-native';
import ImagePicker from 'react-native-image-picker';

class App extends Component {
    
    state = {
        avatarSource: null
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
                let source = { uri: response.uri };
            
                // You can also display the image using data: 
                // let source = { uri: 'data:image/jpeg;base64,' + response.data }; 
            
                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    render () {
        const { container, clothingItem, clothingItemContainer } = styles;

        return (
            <View style={{ flex: 1 }}>
                <Text>
                    Hello there!
                </Text>
                <Button
                    title="Add item"
                    color="#841584"
                    onPress={this.handleAddImageButton.bind(this)}
                />
                <View style={[container, clothingItem, clothingItemContainer]}>
                    { this.state.avatarSource === null
                        ? <Text>Select a Photo</Text>
                        : <Image style={styles.clothingItem} source={this.state.avatarSource} />
                    }
                </View>
            </View>
        );
    }
}

const styles = ({
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
});

export default App;
