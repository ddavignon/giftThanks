import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import SendItemForm from '../components/SendItemForm';

class SendItemMain extends Component {
    render() {
        return (
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
