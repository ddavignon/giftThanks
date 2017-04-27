import React, { Component } from 'React';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import AddItemForm from './components/AddItemForm';
import ImagePicker from 'react-native-image-picker';

class App extends Component {

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyBHYt10D_p1KjNV4rlZRK74DYDjgnYFiZ8",
            authDomain: "auth-95b55.firebaseapp.com",
            databaseURL: "https://auth-95b55.firebaseio.com",
            storageBucket: "auth-95b55.appspot.com",
            messagingSenderId: "602379545711"
        });

        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                firebase.auth().signInAnonymously();
            } else {
                console.log('user', user);
            }
        });
    }

    render () {
        return (
            <View>
                <Header headerText="My Gifts" />
                <AddItemForm />
            </View>
        );
    }
}

export default App;
