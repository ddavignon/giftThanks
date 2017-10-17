import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SendItemForm from '../components/SendItemForm';

class SendItemMain extends Component {
    render() {
        return (
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
          >
          <Image
            source={require('../../assets/images/plain.png')}
            style={styles.imageContainer}
          >
            <ScrollView>
                <SendItemForm
                    eventItem={this.props.event}
                    eventId={this.props.eventId}
                    sendKeyId={this.props.sendKeyId}
                    eventName={this.props.eventName}
                />
            </ScrollView>
          </Image>
          </KeyboardAwareScrollView>
        );
    }
}

const styles = {
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: null,
    height: null,
    backgroundColor: 'transparent',
    paddingBottom: 30
  }
};

export default SendItemMain;
