import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import SendItemForm from '../components/SendItemForm';

class SendItemMain extends Component {
    render() {
        return (
            <ScrollView>
                <SendItemForm
                    eventItem={this.props.event}
                    eventId={this.props.eventId}
                    sendKeyId={this.props.sendKeyId}
                />
            </ScrollView>
        );
    }
}

export default SendItemMain;
