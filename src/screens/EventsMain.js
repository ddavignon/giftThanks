import _ from 'lodash';
import React, { Component } from 'react';
import {
    ScrollView,
    View
} from 'react-native';
import firebase from 'firebase';
import ItemDetail from '../components/ItemDetail';
import {
    CardSection,
    Card,
    Confirm,
    Button,
    Input
} from '../components/common';


class EventsMain extends Component {
    state = {
        eventName: '',
        showDeleteModal: false,
        deleteKeyId: '',
        dbData: {}
    };


    // read event
    componentWillMount() {

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('get data');
                const { currentUser } = firebase.auth();

                firebase.database().ref(`users/${currentUser.uid}/events/`).on('value', snapshot => {
                    console.log('Event snapshot', snapshot);
                    this.setState({ dbData: snapshot.val() });
                });
            } else {
                console.log('no user signed in');
            }
        }.bind(this));
    }


    // create event
    handleButtonPress() {
        if (this.state.eventName) {
            const { currentUser } = firebase.auth();

            firebase.database().ref(`/users/${currentUser.uid}/events`)
                .push({ name: this.state.eventName })
                .then(() => this.setState({ eventName: '' }));
        }
    }

    // edit event
    handleEditPress(key_id) {
        console.log('update data');
        const { currentUser } = firebase.auth();

        firebase.database().ref(`/users/${currentUser.uid}/events/${key_id}/`)
            .set({ name: this.state.eventName })
            .then(() => this.setState({ eventName: '' }));
    }

    // delete event
    handleDeletePress(key_id) {
        console.log('On delete press');
        this.setState({
            showDeleteModal: !this.state.showDeleteModal,
            deleteKeyId: key_id
        });
    }

    // delete event
    onAccept() {
        console.log('delete data');
        const { currentUser } = firebase.auth();

        firebase.database().ref(`users/${currentUser.uid}/events/${this.state.deleteKeyId}`)
            .remove()
            .then(() => this.setState({ showDeleteModal: false, deleteKeyId: '' }));
    }

    onDecline() {
        this.setState({ showDeleteModal: false });
    }


    renderItems() {
        console.log('this render items', this.state.dbData);
        if (this.state.dbData) {
            // return Object.values(this.state.dbData).map((item, index) => {
            return _.map(this.state.dbData, (event, index) => {
                console.log(event, index);
                return (
                    <ItemDetail
                        key={index}
                        title={event.name}/*item.state we are sending to itemDetail*/
                        _id = {index}
                        image="http://placehold.it/30"
                        onEditPress={() => this.handleEditPress(index)}
                        onDeletePress={() => this.handleDeletePress(index)}
                    />
                );
            });
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
                    <Button onPress={this.handleButtonPress.bind(this)}>
                        Add Event
                    </Button>
                </CardSection>
                {/*<ItemList screen="EventsMain" />*/}
                <ScrollView>
                    <View style={{ marginBottom: 65 }} >
                        {this.renderItems()}
                    </View>
                </ScrollView>
                <Confirm
                    visible={this.state.showDeleteModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </ScrollView>
        );
    }
}

export default EventsMain;
