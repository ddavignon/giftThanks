import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import { Header } from './components/common';
import AddItemForm from './components/AddItemForm';
import GetItemsList from './components/GetItemsList';
import ItemList from './components/ItemList';


class App extends Component {

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBHYt10D_p1KjNV4rlZRK74DYDjgnYFiZ8',
            authDomain: 'auth-95b55.firebaseapp.com',
            databaseURL: 'https://auth-95b55.firebaseio.com',
            storageBucket: 'auth-95b55.appspot.com',
            messagingSenderId: '602379545711'
        });

        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                firebase.auth().signInAnonymously();
            } else {
                console.log('user', user);
            }
        });
    }

    render() {
        return (
            <View>

                <Header headerText="My Gifts" />
                <ScrollView>
                    <ItemList />
                </ScrollView>
            </View>
        );
    }
}

export default App;
