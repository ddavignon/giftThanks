import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import EditItemForm from '../components/EditItemForm';

class EditItemMain extends Component {
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps>
                <EditItemForm eventItem={this.props.event} eventId={this.props.eventId} editKeyId={this.props.editKeyId} />
            </ScrollView>
        );
    }
}

export default EditItemMain;
