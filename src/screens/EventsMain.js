import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ScrollView, View } from 'react-native';
import firebase from 'firebase';
import ItemList from '../components/ItemList';
import AddEventModal from '../components/AddEventModal';
import {
    Card,
    Button,
} from '../components/common';


class EventsMain extends Component {
    state = {
        eventName: '',
        visible: false
    }

    componentDidMount() {
        Actions.refresh({
            rightTitle: 'Add',
            onRight: () => { this.onAddPress(); }
        });
    }

    onAddPress() {
        this.setState({ visible: true });
    }

    onAccept(eventName) {
        console.log(this.state.eventName);
        if (eventName) {
            const { currentUser } = firebase.auth();

            firebase.database().ref(`users/${currentUser.uid}/events/`)
                .push({ name: eventName })
                .then(() => this.setState({ eventName: '', visible: false }));

        }
    }

    onDecline() {
        this.setState({ visible: false });
        Actions.events();
    }

    onInputChange(text) {
        this.setState({ text });
    }
    renderModal() {
        if (!this.state.visible) {
            return;
        }
        return (
                    <AddEventModal
                        visible={this.state.visible}
                        onAccept={this.onAccept.bind(this)}
                        onDecline={this.onDecline.bind(this)}
                        eventName={this.onInputChange.bind(this)}
                    />

        );
    }

    render() {
        return (
            <View>
                <Card>
                    {this.renderModal()}
                </Card>
                <ScrollView>
                    <ItemList screen="EventsMain" />
                </ScrollView>
            </View>
        );
    }
}

export default EventsMain;
