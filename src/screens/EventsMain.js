import _ from 'lodash';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ScrollView, View } from 'react-native';
import firebase from 'firebase';
import ItemDetail from '../components/ItemDetail';
import AddEventModal from '../components/AddEventModal';
import {
    Button,
    Card,
    CardSection,
    Confirm,
    Input
} from '../components/common';


class EventsMain extends Component {
    state = {
        eventName: '',
        visible: false,
        showDeleteModal: false,
        deleteKeyId: '',
        editKeyId: '',
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


    componentDidMount() {
        Actions.refresh({
            rightTitle: 'Add',
            onRight: () => this.setState({ visible: true })
        });
    }

    // Create event
    onCreateAccept(eventText) {

        this.setState({ eventName: eventText });
        console.log('Passed props: ', this.state.eventName);

        if (this.state.eventName) {
            const { currentUser } = firebase.auth();

            firebase.database().ref(`users/${currentUser.uid}/events/`)
                .push({ name: this.state.eventName })
                .then(() => this.setState({ eventName: '', visible: false }));

        }
    }

    onCreateDecline() {
        this.setState({ visible: false });
        //Actions.events();
    }

    // edit event
    handleEditPress(editKeyId, eventName) {
        console.log('On delete press');
        this.setState({
            eventName,
            editKeyId
        });

    }

    handleUpdateAcceptPress() {
        console.log('update data');
        const { currentUser } = firebase.auth();

        firebase.database().ref(`/users/${currentUser.uid}/events/${this.state.editKeyId}/`)
            .set({ name: this.state.eventName })
            .then(() => this.setState({ eventName: '' }));
    }

    handleUpdateCancelPress() {
        alert('Cancel update!!!!');
    }

    // delete event
    handleDeletePress(key_id) {
        console.log('On delete press');
        this.setState({
            showDeleteModal: !this.state.showDeleteModal,
            deleteKeyId: key_id
        });
    }

    onDeleteAccept() {
        console.log('delete data');
        const { currentUser } = firebase.auth();

        firebase.database().ref(`users/${currentUser.uid}/events/${this.state.deleteKeyId}`)
            .remove()
            .then(() => this.setState({ showDeleteModal: false, deleteKeyId: '' }));
    }

    onDeleteDecline() {
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
                        onEditPress={() => this.handleEditPress(index, event.name)}
                        onDeletePress={() => this.handleDeletePress(index)}
                    />
                );
            });
        }
    }

    render() {
        return (
            <View>
                <Card>
                    <AddEventModal
                        visible={this.state.visible}
                        onAccept={this.onCreateAccept.bind(this)}
                        onDecline={this.onCreateDecline.bind(this)}
                    />
                </Card>
                <Card>
                    <CardSection>
                        <Input
                            label="Name"
                            value={this.state.eventName}
                            onChangeText={eventName => this.setState({ eventName })}
                        />
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.handleUpdateAcceptPress.bind(this)}>
                            Update
                        </Button>
                        <Button onPress={this.handleUpdateCancelPress.bind(this)}>
                            Cancel
                        </Button>
                    </CardSection>
                </Card>
                <ScrollView>
                    {/*<ItemList screen="EventsMain" />*/}
                    <View style={{ marginBottom: 65 }} >
                        {this.renderItems()}
                    </View>
                </ScrollView>
                <Confirm
                    visible={this.state.showDeleteModal}
                    onAccept={this.onDeleteAccept.bind(this)}
                    onDecline={this.onDeleteDecline.bind(this)}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </View>
        );
    }
}

export default EventsMain;
