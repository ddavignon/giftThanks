import _ from 'lodash';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ScrollView, View, Text } from 'react-native';
import firebase from 'firebase';
import ItemDetail from '../components/ItemDetail';
import ItemList from '../components/ItemList';
import AddEventModal from '../components/AddEventModal';
import {
    Button,
    Card,
    CardSection,
    Confirm,
    Input
} from '../components/common';


class EventItems extends Component {
    state = {
        dbData: {},
        showDeleteModal: false,
        deleteKeyId: ''
    };

    componentWillMount() {
        console.log(this.props.eventId);
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('get data');
                const { currentUser } = firebase.auth();

                firebase.database().ref(`users/${currentUser.uid}/events/${this.props.eventId}/items/`).on('value', snapshot => {
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
        onRight: () => Actions.addItemScene({ eventId: this.props.eventId })
    });
}

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

    firebase.database().ref(`users/${currentUser.uid}/events/${this.props.eventId}/items/${this.state.deleteKeyId}`)
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
                    _id={index}
                    image={event.URL}
                    onEditPress={() => {}}
                    onDeletePress={() => this.handleDeletePress(index)}
                    onItemPress={() => {}}
                />
            );
        });
    }
}

    render() {
        return (
            <View>
                {this.renderItems()}
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

export default EventItems;
