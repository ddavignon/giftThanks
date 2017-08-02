import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import EditItemForm from '../components/EditItemForm';

class EditItemMain extends Component {
    render() {
        return (
            <ScrollView>
                <EditItemForm eventId={this.props.eventId} />
            </ScrollView>
        );
    }
}

export default EditItemMain;
