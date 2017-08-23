import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    TextInput,
    PixelRatio
} from 'react-native';
import ContactsWrapper from 'react-native-contacts-wrapper';
import Communications from 'react-native-communications';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, Input } from './common';

class SendItemForm extends Component {

    state = {
        isFromText: '',
        avatarSource: null,
        emailContactText: '',
        emailBodyText: '',
        emailSubjectText: '',
        eventId: ''
    }

    componentDidMount() {
        console.log('event item: ', this.props.eventItem);
        const { URL, name } = this.props.eventItem;
        this.setState({
            avatarSource: { uri: URL },
            isFromText: name,
            emailBodyText: `${name},\n\n`
        });
    }

    onButtonPressed() {
        ContactsWrapper.getContact()
        .then((contact) => {
            // Replace this code
            console.log(contact);
            this.setState({ emailContactText: contact.email });
        })
        .catch((error) => {
            console.log("ERROR CODE: ", error.code);
            console.log("ERROR MESSAGE: ", error.message);
        });
    }

    onSendButtonPressed() {
        const emailSignature = '\n\n\nThanks for using Gift Thanks!';
        const { eventId } = this.props;
        Communications.email(
            [this.state.emailContactText],
            null, null, 'thank you !',
            `  ${this.state.emailBodyText} ${emailSignature}`
        );
        Actions.gifts({ eventId, type: 'back' });
    }

    validateEmail(email) {
      const emailRe = /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm;
      return emailRe.test(email);
    }

    render() {
        const { container, clothingItem, clothingItemContainer, textArea } = styles;

        return (
            <View style={{ flex: 1, paddingTop: 70, }}>
                <CardSection>
                    <View style={[clothingItem, clothingItemContainer]}>
                        { this.state.avatarSource === null
                            ? <Text>Select a Photo</Text>
                            : <Image
                                style={styles.clothingItem}
                                source={this.state.avatarSource}
                            />
                        }
                    </View>
                </CardSection>
                <CardSection>
                    <Input
                        placeholder="Mom@mail.com"
                        label="Email"
                        value={this.state.emailContactText}
                        onChangeText={emailContactText => this.setState({ emailContactText })}
                    />
                </CardSection>
                <View>
                    <TextInput
                        style={textArea}
                        multiline={true}
                        placeholder={'Mom@mail.com'}
                        editable={true}
                        maxLength={200}
                        numberOfLines={6}
                        onChangeText={(emailBodyText) => this.setState({ emailBodyText })}
                        value={this.state.emailBodyText}
                    />
                </View>
                <CardSection>
                    {
                        this.validateEmail(this.state.emailContactText) ?
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
    flex: 1,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  clothingItem: {
    borderRadius: 5,
    width: 80,
    height: 80
},
textArea: {
    paddingLeft: 5,
    height: 100,
    fontSize: 18
}

};

export default SendItemForm;
