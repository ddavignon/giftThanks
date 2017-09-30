import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TextInput,
    Switch
} from 'react-native';
import ContactsWrapper from 'react-native-contacts-wrapper';
import Mailer from 'react-native-mail';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import { SquareCardSection, Button, Input } from './common';


class SendItemForm extends Component {

    state = {
        isFromText: '',
        itemURL: '',
        avatarSource: null,
        emailContactText: '',
        emailBodyText: '',
        emailTextToSend: '',
        emailSubjectText: '',
        emailFooterBase64: '',
        eventId: '',
        addPhotoSwitch: false,
        emailImagePath: ''
    }


    componentDidMount() {
        console.log('sendItemForm event name: ', this.props.eventName);
        console.log('sendItemForm event item: ', this.props.eventItem);
        console.log('sendItemForm eventItem URL: ', this.props.eventItem.URL);
        const { URL, name } = this.props.eventItem;
        this.setState({
            avatarSource: { uri: URL },
            isFromText: name,
            emailBodyText: `${name},\n`
        });
        this.handleGetImage();
        this.convertImageBase64();
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

    onSendButtonPressed() {
        // console.log('email image path: ', tmpImagePath);
        // console.log('photo uri: ', this.props.eventItem.URL);
        const mailBody = this.state.emailBodyText.replace(`${this.state.isFromText},`, ' ');
        const emailSignature = `<p><img src="data:image/png;base64,${this.state.emailFooterBase64}" style="border: none; width: 100%;" alt="Thanks for using giftThanks!" /></p>`;
        const { name } = this.props.eventItem;
        const { eventId } = this.props;
        if (this.state.addPhotoSwitch) {
            Mailer.mail({
                subject: `Thanks from ${this.props.eventName} !`,
                recipients: [this.state.emailContactText],
                body: `  <p>${name},</p><p>${mailBody}</p> ${emailSignature}`,
                isHTML: false,
                attachment: {
                    path: this.state.emailImagePath,  // The absolute path of the file.
                    type: 'jpg',   // Mime Type: jpg, png, doc, ppt, html, pdf
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
                body: `  <p>${name},</p><p>${mailBody}</p> ${emailSignature}`,
                isHTML: false,
            }, (error, event) => {
                if (error) {
                  alert('Error', 'Could not send mail.');
                }
            });
        }
        this.handleSetSent();
        //Actions.gifts({ eventId, type: 'replace' });
    }

    convertImageBase64() {
      RNFetchBlob.fetch('GET', 'https://firebasestorage.googleapis.com/v0/b/giftthanks-b57ab.appspot.com/o/emailAssets%2FemailFooter.png?alt=media&token=9104d04c-cf59-4a9f-b0bf-e40eb3a1c04c', {
      })
      .then((res) => {
          //console.log('Convert image base64 res: ', res);
          this.setState({ emailFooterBase64: res.base64() });
          console.log('Image base64 string: ', this.state.emailFooterBase64);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    handleGetImage() {
        RNFetchBlob.config({
            fileCache: true,
        })
        .fetch('GET', this.props.eventItem.URL, {
        })
        .then((res) => {
            // console.log('The file saved to ', res.path());
            //console.log('Fetch-Blob response obj: ', res.base64());
            this.setState({ emailImagePath: res.path() });
        });
    }

    handleSetSent() {
      const { currentUser } = firebase.auth();
      const { eventId, sendKeyId } = this.props;
      const path = `users/${currentUser.uid}/events/${eventId}/items/${sendKeyId}`;
      console.log('sendItemForm image props: ', this.props.image);
      console.log('sendItemForm path: ', path);
      firebase.database().ref(path)
          .set({ name: this.state.isFromText, URL: this.props.eventItem.URL, sent: true })
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

    validateEmail(email) {
      const emailRe = /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm;
      return emailRe.test(email);
    }

    render() {
        const { imageItem, imageContainer, textArea, textStyle } = styles;

        return (
            <View style={{ flex: 1, paddingTop: 70 }}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <View style={[imageItem, imageContainer]}>
                        { this.state.avatarSource === null
                            ? <Text>Select a Photo</Text>
                            : <Image
                                style={styles.imageItem}
                                source={this.state.avatarSource}
                            />
                        }
                    </View>
                  </View>
                <View style={{ marginHorizontal: 10 }}>
                <View style={{ marginTop: 14 }}>
                  <SquareCardSection>
                      <Input
                          placeholder="Mom@mail.com"
                          label="Email"
                          value={this.state.emailContactText}
                          onChangeText={emailContactText => this.setState({ emailContactText })}
                      />

                  </SquareCardSection>
                </View>
                <SquareCardSection>
                  <Switch
                      onValueChange={(value) => this.setState({ addPhotoSwitch: value })}
                      style={{ marginLeft: 10, marginBottom: 10, marginTop: 10 }}
                      value={this.state.addPhotoSwitch}
                  />
                  <Text style={textStyle}> Add photo to email</Text>
                </SquareCardSection>
                  <View style={{ backgroundColor: '#fff' }}>
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
                <SquareCardSection>
                    {
                        this.validateEmail(this.state.emailContactText) ?
                        <Button onPress={this.onSendButtonPressed.bind(this)}>
                            Send Item
                        </Button> :
                        <Button onPress={this.onGetEmailButtonPressed.bind(this)}>
                            Get email from contacts
                        </Button>
                    }
                </SquareCardSection>
              </View>
            </View>
        );
    }
}

const styles = {
      textStyle: {
        fontSize: 18,
        marginTop: 12,
        marginLeft: 20
      },
      imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      imageItem: {
        width: 150,
        height: 150
    },
    textArea: {
        marginLeft: 10,
        height: 140,
        fontSize: 18
    }
};

export default SendItemForm;
