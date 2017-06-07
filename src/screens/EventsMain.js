import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import firebase from 'firebase';
import ItemDetail from '../components/ItemDetail';
import {
    CardSection,
    Card,
    Button,
    Input
} from '../components/common';


class EventsMain extends Component {
    state = {
        eventName: '',
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

    renderItems() {
        console.log('this render items', this.state.dbData);
        if (this.state.dbData) {
            return Object.values(this.state.dbData).map((item, index) => {
                console.log(item.events, index);
                return (
                    <ItemDetail
                        key={index}
                        title="hold"/*item.state we are sending to itemDetail*/
                        image="#"
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
                </CardSection>
                <Card>
                    <Button onPress={this.handleButtonPress.bind(this)}>
                        Add Event
                    </Button>
                </Card>
                {/*<ItemList screen="EventsMain" />*/}
                <ScrollView>
                    <View style={{ marginBottom: 65 }} >
                        {this.renderItems()}
                    </View>
                </ScrollView>
            </ScrollView>
        );
    }
}

export default EventsMain;
