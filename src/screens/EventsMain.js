import _ from 'lodash';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    ScrollView,
    View,
    Platform,
} from 'react-native';
import firebase from 'firebase';
import ItemDetail from '../components/ItemDetail';
import AddEventModal from '../components/AddEventModal';
import {
    Card,
    Confirm
} from '../components/common';

const Permissions = require('react-native-permissions');

class EventsMain extends Component {
    state = {
        eventName: '',
        update: false,
        showCreateModal: false,
        showDeleteModal: false,
        deleteKeyId: '',
        editKeyId: '',
        dbData: {},
        androidPhotoPermission: 'undetermined',
        androidStoragePermission: 'undetermined'
    };

    // read event
    // componentWillMount() {
    //     console.log('dbData: ', Object.keys(this.state.dbData).length);
    //     if (Object.keys(this.state.dbData).length === 0) {
    //         firebase.auth().onAuthStateChanged(user => {
    //             if (user) {
    //                 const { currentUser } = firebase.auth();
    //
    //                 firebase
    //                     .database()
    //                     .ref(`users/${currentUser.uid}/events/`)
    //                     .on('value', snapshot => {
    //                         this.setState({ dbData: snapshot.val() });
    //                     });
    //             } else {
    //                 console.log('no user signed in');
    //             }
    //         });
    //     }
    // }

    componentDidMount() {
        Actions.refresh({
            rightTitle: 'Add',
            onRight: () => this.setState({ showCreateModal: true })
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props === nextProps) {
            console.log('nothing changed!');
            return;
        }
        //console.log('dbData: ', Object.keys(this.state.dbData).length);
        // if (Object.keys(this.state.dbData).length === 0) {
        //
        // }
        console.log('passed props: ', this.props);
        this.setState({ update: this.props.update });
        console.log('state update: ', this.state.update);
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const { currentUser } = firebase.auth();

                firebase
                    .database()
                    .ref(`users/${currentUser.uid}/events/`)
                    .on('value', snapshot => {
                        this.setState({ dbData: snapshot.val() });
                    });
            } else {
                console.log('no user signed in');
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
    }

    onDeleteAccept() {
        console.log('delete data');
        const { currentUser } = firebase.auth();

        firebase.database().ref(`users/${currentUser.uid}/events/${this.state.deleteKeyId}`)
            .remove()
            .then(() => this.setState({ showDeleteModal: false, deleteKeyId: '' }));
    }

    onCreateDecline() {
        this.setState({ showCreateModal: false });
        //Actions.events();
    }

    // Create event
    onCreateAccept(eventText) {
        //console.log('Passed props: ', this.state.eventName, 'EventText: ', eventText);

        if (eventText) {
            const { currentUser } = firebase.auth();

            firebase.database().ref(`users/${currentUser.uid}/events/`)
                .push({ name: eventText })
                .then(() => this.setState({ showCreateModal: false, eventName: '' }));
        }
    }

    onDeleteDecline() {
        this.setState({ showDeleteModal: false });
    }

    // delete event
    handleDeletePress(keyId) {
        console.log('On delete press');
        this.setState({
            showDeleteModal: !this.state.showDeleteModal,
            deleteKeyId: keyId
        });
    }

    // handleUpdateCancelPress() {
    //     alert('Cancel update!!!!');
    // }


    handleUpdateAcceptPress() {
        console.log('update data');
        const { currentUser } = firebase.auth();

        firebase.database().ref(`/users/${currentUser.uid}/events/${this.state.editKeyId}/`)
            .set({ name: this.state.eventName })
            .then(() => this.setState({ eventName: '' }));
    }

    // edit event
    handleEditPress(editKeyId, eventName) {
        console.log('On edit press');
        this.setState({
            eventName,
            editKeyId
        });
    }

    handleItemPress(index) {
        console.log('I got touched', index);
        return (
            Actions.gifts({ eventId: index })
        );
    }

    renderItems() {
        if (this.state.dbData) {
            return _.map(this.state.dbData, (event, index) => {
                //console.log(event, index);
                return (
                    <ItemDetail
                        key={index}
                        type='events'
                        title={event.name}/*item.state we are sending to itemDetail*/
                        _id={index}
                        //image="http://placehold.it/30"
                        onEditPress={() => this.handleEditPress(index, event.name)}
                        onDeletePress={() => this.handleDeletePress(index)}
                        onItemPress={() => this.handleItemPress(index)}
                    />
                );
            });
        }
    }

    render() {
        if (Platform.OS === 'android' && this.state.androidPhotoPermission !== 'authorized') {
            Permissions.requestPermission('camera')
              .then(response => {
                this.setState({ androidPhotoPermission: response });
              });
        }

        if (Platform.OS === 'android' && this.state.androidStoragePermission !== 'authorized') {
            Permissions.requestPermission('photo')
              .then(response => {
                this.setState({ androidStoragePermission: response });
              });
        }

        return (
            <View style={styles.screenStyle}>
                <Card>
                    <AddEventModal
                        visible={this.state.showCreateModal}
                        onAccept={this.onCreateAccept.bind(this)}
                        onDecline={this.onCreateDecline.bind(this)}
                    />
                </Card>
                <ScrollView>
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

const styles = {
    screenStyle: {
        paddingTop: 50,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#DCDDDE'
    }
};

export default EventsMain;
