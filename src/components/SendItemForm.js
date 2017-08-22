import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    PixelRatio
} from 'react-native';
import ContactsWrapper from 'react-native-contacts-wrapper';
import Communications from 'react-native-communications';
import { CardSection, Button, Input } from './common';

class SendItemForm extends Component {

    state = {
        isFromText: '',
        avatarSource: null,
        emailText: ''
    }

    componentDidMount() {
        console.log('event item: ', this.props.eventItem);
        const { URL, name } = this.props.eventItem;
        this.setState({
            avatarSource: { uri: URL },
            isFromText: name
        });
    }

    onButtonPressed() {
        ContactsWrapper.getContact()
        .then((contact) => {
            // Replace this code
            console.log(contact);
            this.setState({ emailText: contact.email });
        })
        .catch((error) => {
            console.log("ERROR CODE: ", error.code);
            console.log("ERROR MESSAGE: ", error.message);
        });
    }

    onSendButtonPressed() {
        Communications.email([this.state.emailText], null, null, 'thank you !', 'Thanks for using Gift Thanks!');
    }

    validateEmail(email) {
      const emailRe = /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm;
      return emailRe.test(email);
    }

    render() {
        const { container, clothingItem, clothingItemContainer } = styles;

        return (
            <View style={{ flex: 1, paddingTop: 70, }}>
                <CardSection>
                    <View style={[container, clothingItem, clothingItemContainer]}>
                        { this.state.avatarSource === null
                            ? <Text>Select a Photo</Text>
                            : <Image
                                style={styles.clothingItem}
                                source={this.state.avatarSource}
                            />
                        }
                        <Input
                            placeholder="Bob"
                            label="From"
                            value={this.state.isFromText}
                            onChangeText={isFromText => this.setState({ isFromText })}
                        />
                    </View>
                </CardSection>
                <CardSection>
                    <Input
                        placeholder="Mom@mail.com"
                        label="Email"
                        value={this.state.emailText}
                        onChangeText={emailText => this.setState({ emailText })}
                    />
                </CardSection>
                <CardSection>
                    {
                        this.validateEmail(this.state.emailText) ?
                        <Button onPress={this.onSendButtonPressed.bind(this)}>
                            Send Item
                        </Button> :
                        <Button onPress={this.onButtonPressed.bind(this)}>
                            Get email from contacts
                        </Button>
                    }

                </CardSection>
            </View>
        );
    }
}

const styles = {
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  clothingItemContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  clothingItem: {
    borderRadius: 5,
    width: 75,
    height: 75
  }
};

export default SendItemForm;
