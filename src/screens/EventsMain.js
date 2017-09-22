import _ from 'lodash';
import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import {
    ScrollView,
    View,
    Platform,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import ItemDetail from '../components/ItemDetail';
import AddEventModal from '../components/AddEventModal';
import { eventTextChanged, eventTextCompleted } from '../actions';
import {
    Card,
    Confirm
} from '../components/common';

const Permissions = require('react-native-permissions');

class EventsMain extends Component {
    state = {
        eventName: '',
        showCreateModal: false,
        showDeleteModal: false,
        deleteKeyId: '',
        editKeyId: '',
        dbData: {},
        androidPhotoPermission: 'undetermined',
        androidStoragePermission: 'undetermined'
    };

    // read event
    componentWillMount() {
        // if (this.props.eventName !== '') {
        //     //this.setState({ eventName: this.props.eventName });
        //     const { currentUser } = firebase.auth();
        //     firebase.database().ref(`users/${currentUser.uid}/events/`)
        //         .push({ name: this.props.eventName })
        //         //.then(() => this.setState({ eventName: this.props.eventName }))
        //         .then(() => this.props.eventTextChanged(''));
        //     console.log('creating event: ', this.props.eventName);
        // }
        // this.setState({ eventName: '' });
    //}
        // console.log('dbData: ', Object.keys(this.state.dbData).length);
        // if (Object.keys(this.state.dbData).length === 0) {
        //     firebase.auth().onAuthStateChanged(user => {
        //         if (user) {
        //             const { currentUser } = firebase.auth();
        //
        //             firebase
        //                 .database()
        //                 .ref(`users/${currentUser.uid}/events/`)
        //                 .on('value', snapshot => {
        //                     this.setState({ dbData: snapshot.val() });
        //                 });
        //         } else {
        //             console.log('no user signed in');
        //         }
        //     });
        // }
    }

    componentDidMount() {
        // Actions.refresh({
        //     rightTitle: 'Add',
        //     onRight: () => this.setState({ showCreateModal: true })
        // });
        console.log('eventsMain props: ', this.props);
        if (Object.keys(this.state.dbData).length >= 0) {
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
    }

    componentWillReceiveProps(nextProps) {
        //console.log('eventsMain props: ', this.props);
        if (this.props === nextProps) {
            console.log('nothing changed!');
            return;
        }
        //console.log('dbData: ', Object.keys(this.state.dbData).length);
        // if (Object.keys(this.state.dbData).length === 0) {
        //
        // }
        console.log('creating event next props triggered', nextProps);
        console.log('creating event next props event Name', nextProps.eventName);
        // if (this.props.eventName !== '') {
        if (nextProps.eventName !== '') {
            //this.setState({ eventName: this.props.eventName });
            const { currentUser } = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/events/`)
                .push({ name: nextProps.eventName })
                //.then(() => this.setState({ eventName: '' }))
                .then(() => this.props.eventTextCompleted());
            console.log('creating event: ', nextProps.eventName);
        }
        // firebase.auth().onAuthStateChanged(user => {
        //     if (user) {
        //         const { currentUser } = firebase.auth();
        //
        //         firebase
        //             .database()
        //             .ref(`users/${currentUser.uid}/events/`)
        //             .on('value', snapshot => {
        //                 this.setState({ dbData: snapshot.val() });
        //             });
        //     } else {
        //         console.log('no user signed in');
        //     }
        // });
        //this.setState({ eventName: '' });
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
        Actions.pop();
    }

    onDeleteDecline() {
        this.setState({ showDeleteModal: false });
        Actions.pop();
    }

    // delete event
    handleDeletePress(keyId) {
        console.log('On delete press');
        this.setState({
            showDeleteModal: !this.state.showDeleteModal,
            deleteKeyId: keyId
        });
    }

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

    handleItemPress(index, eventname) {
        console.log('I got touched', index);
        return (
            Actions.gifts({ eventName: eventname, eventId: index })
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
                        onEditPress={() => this.handleEditPress(index, event.name)}
                        onDeletePress={() => this.handleDeletePress(index)}
                        onItemPress={() => this.handleItemPress(index, event.name)}
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
          <Image
            source={require('../../assets/images/gifts.png')}
            style={styles.imageContainer}
          >
            <View style={styles.screenStyle}>

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
          </Image>
        );
    }
}

const styles = {
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      width: null,
      height: null,
      backgroundColor: 'rgba(0,0,0,0)',
      paddingBottom: 30
    },
    screenStyle: {
        paddingTop: 60,
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#DCDDDE'
        // backgroundColor: '#49D9E3'
    }
};

const mapStateToProps = ({ eventMain }) => {
     const {
         eventName
     } = eventMain;

     return {
         eventName
     };
 };

 export default connect(mapStateToProps, {
     eventTextChanged, eventTextCompleted
 })(EventsMain);
