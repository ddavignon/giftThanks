import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import AddItemForm from '../components/AddItemForm';

class AddItemMain extends Component {
    render() {
        return (
            <ScrollView>
                <AddItemForm eventId={this.props.eventId} />
            </ScrollView>
        );
    }
}

export default AddItemMain;
