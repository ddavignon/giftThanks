import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    TextInput,
    PixelRatio,
    Switch
} from 'react-native';
import ContactsWrapper from 'react-native-contacts-wrapper';
import Mailer from 'react-native-mail';
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
        eventId: '',
        addPhotoSwitch: false
    }

    componentDidMount() {
        console.log('event name: ', this.props.eventName);
        console.log('event item: ', this.props.eventItem);
        const { URL, name } = this.props.eventItem;
        this.setState({
            avatarSource: { uri: URL },
            isFromText: name,
            emailBodyText: `${name},\n\n`
        });
    }

    onGetEmailButtonPressed() {
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

    // onSendButtonPressed() {
    //     const emailSignature = '\n\n\nThanks for using Gift Thanks!';
    //     const { eventId } = this.props;
    //     Communications.email(
    //         [this.state.emailContactText],
    //         null, null, 'thank you !',
    //         `  ${this.state.emailBodyText} ${emailSignature}`
    //     );
    //     Actions.gifts({ eventId, type: 'back' });
    // }

    onSendButtonPressed() {
        console.log('photo switch: ', this.state.addPhotoSwitch);
        console.log('photo uri: ', this.props.eventItem.URL);
        const emailSignature = '\n\n\nThanks for using Gift Thanks!';
        const { eventId } = this.props;
        if (this.state.addPhotoSwitch) {
            Mailer.mail({
                subject: `Thanks from ${this.props.eventName} !`,
                recipients: [this.state.emailContactText],
                body: `  ${this.state.emailBodyText} ${emailSignature}`,
                isHTML: true,
                attachment: {
                    path: this.props.eventItem.URL,  // The absolute path of the file from which to read data.
                    type: 'png',   // Mime Type: jpg, png, doc, ppt, html, pdf
                    name: 'thanks_image',   // Optional: Custom filename for attachment
                }
            }, (error, event) => {
                if (error) {
                  alert('Error', 'Could not send mail. Please send a mail to support@example.com');
                }
            });
        } else {
            Mailer.mail({
                subject: `Thanks from ${this.props.eventName} !`,
                recipients: [this.state.emailContactText],
                ccRecipients: [''],
                bccRecipients: [''],
                body: `  ${this.state.emailBodyText} ${emailSignature}`,
                isHTML: true,
            }, (error, event) => {
                if (error) {
                  alert('Error', 'Could not send mail.');
                }
            });
        }
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
                <CardSection>
                <Switch
                    onValueChange={(value) => this.setState({ addPhotoSwitch: value })}
                    style={{ marginBottom: 10, marginTop: 10 }}
                    value={this.state.addPhotoSwitch}
                />
                <Text style={{ fontSize: 18, marginTop: 12, marginLeft: 20 }}> Add photo to email</Text>
                </CardSection>
                <View>
                    <TextInput
                        style={textArea}
                        multiline={true}
                        placeholder={'Mom@mail.com'}
                        editable={true}
                        maxLength={200}
                        numberOfLines={10}
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
                        <Button onPress={this.onGetEmailButtonPressed.bind(this)}>
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
    height: 140,
    fontSize: 18
}

};

export default SendItemForm;
