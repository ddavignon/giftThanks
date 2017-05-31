import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './router';


const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));


class App extends Component {

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBHYt10D_p1KjNV4rlZRK74DYDjgnYFiZ8',
            authDomain: 'auth-95b55.firebaseapp.com',
            databaseURL: 'https://auth-95b55.firebaseio.com',
            storageBucket: 'auth-95b55.appspot.com',
            messagingSenderId: '602379545711'
        });

        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            } else {
                console.log('user', user);
            }
        });
    }

    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
