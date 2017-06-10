import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import firebase from 'firebase';
import ItemList from '../components/ItemList';
import {
    CardSection,
    Card,
    Button,
    Input
} from '../components/common';


class EventsMain extends Component {
    state = {
        eventName: ''
    }

    handleButtonPress() {
        if (this.state.eventName) {
            const { currentUser } = firebase.auth();

        firebase.database().ref(`users/${currentUser.uid}/events/`)
            .push({ name: this.state.eventName })
            .then(() => this.setState({ eventName: '' }));
        }
    }

    render() {
        return (
            <ScrollView>
                <CardSection>
                    <Input
                        placeholder="Birthday!"
                        label="Name"
                        value={this.state.eventName}
                        onChangeText={eventName => this.setState({ eventName })}
                    />
                </CardSection>
                <Card>
                    <Button onPress={this.handleButtonPress.bind(this)}>
                        Add Event
                    </Button>
                </Card>
                <ItemList screen="EventsMain" />
            </ScrollView>
        );
    }
}

export default EventsMain;
