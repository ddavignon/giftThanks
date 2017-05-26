import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    PixelRatio
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {
    sendItemForm,
    isFromTextChanged,
    itemResults
} from '../actions';
import { CardSection, Button, Input } from './common';


class AddItemForm extends Component {

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
            this.props.itemResults({ response });
        });
    }

    sendItemForm() {
        const { isFrom, description, responsePath } = this.props;

        this.sendItemForm({ isFrom, description, responsePath });
    }

    render() {
        const { container, clothingItem, clothingItemContainer } = styles;

        return (
            <View>
                <CardSection>
                    <View style={{ flex: 1 }} >
                        <TouchableOpacity
                            style={container}
                            onPress={this.handleAddImageButton.bind(this)}
                        >
                            <View style={[container, clothingItem, clothingItemContainer]}>
                                { this.props.avatarSource === null
                                    ? <Text>Select a Photo</Text>
                                    : <Image 
                                        style={styles.clothingItem} 
                                        source={this.props.avatarSource} 
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
                        value={this.props.isFrom}
                        onChangeText={text => this.props.isFromTextChanged(text)}
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

const mapStateToProps = ({ addItem }) => {
    const {
        isFrom,
        description,
        responsePath,
        avatarSource,
    } = addItem;

    return {
        isFrom,
        description,
        responsePath,
        avatarSource
    };
};

export default connect(mapStateToProps, {
    isFromTextChanged, sendItemForm, itemResults
})(AddItemForm);
