import _ from 'lodash';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ScrollView, View } from 'react-native';
import firebase from 'firebase';
import ItemDetail from '../components/ItemDetail';
import { Confirm } from '../components/common';


class EventItems extends Component {

    state = {
        dbData: {},
        showDeleteModal: false,
        deleteKeyId: '',
        editKeyId: '',
        url: ''
    };


    componentDidMount() {
        Actions.refresh({
            rightTitle: 'Add',
            onRight: () => Actions.addItemScene({ eventId: this.props.eventId })
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props === nextProps) {
            console.log('nothing changed!');
            return;
        }
        console.log(this.props.eventId);
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('get data');
                const { currentUser } = firebase.auth();

                firebase
                    .database()
                    .ref(`users/${currentUser.uid}/events/${this.props.eventId}/items/`)
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

        firebase
            .database()
            .ref(`users/${currentUser.uid}/events/${this.props.eventId}/items/${this.state.deleteKeyId}`)
            .remove()
            .then(() => {
                this.setState({ showDeleteModal: false, deleteKeyId: '' });
                const deletePhotoRef = firebase.storage().refFromURL(this.state.url);
                deletePhotoRef.delete().then(() => {
                    Actions.gifts({ eventId: this.props.eventId });
                });
        });
    }

    onDeleteDecline() {
        this.setState({ showDeleteModal: false });
    }

    handleDeletePress(keyId, url) {
        console.log('On delete press');
        this.setState({
            showDeleteModal: !this.state.showDeleteModal,
            deleteKeyId: keyId,
            url
        });
    }

    handleEditPress(event, index) {
        console.log('On edit press');
        Actions.editItemScene({ event, eventId: this.props.eventId, editKeyId: index });
    }


    handleItemPress(event, index) {
        console.log('I got touched', index);
        Actions.sendItemScene({ event, eventId: this.props.eventId, sendKeyId: index });
    }


    renderItems() {
        if (this.state.dbData) {
            return _.map(this.state.dbData, (event, index) => {
                console.log('item name: ', event.name, index);
                return (
                    <ItemDetail
                        key={index}
                        type='items'
                        title={event.name}/*item.state we are sending to itemDetail*/
                        _id={index}
                        image={event.URL}
                        onEditPress={() => this.handleEditPress(event, index)}
                        onDeletePress={() => this.handleDeletePress(index, event.URL)}
                        onItemPress={() => this.handleItemPress(event, index)}
                    />
                );
            });
        }
    }

    render() {
        return (
            <View style={styles.screenStyle}>
            <ScrollView>
                <View style={{ marginBottom: 65 }}>
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
        paddingTop: 60,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#D7FAEE'
    }
};
export default EventItems;
