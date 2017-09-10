import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import Router from './router';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAE1FJ0eI2DRJdOe5RvJv4m4l2sWOq0iLI',
            authDomain: 'giftthanks-b57ab.firebaseapp.com',
            databaseURL: 'https://giftthanks-b57ab.firebaseio.com',
            projectId: 'giftthanks-b57ab',
            storageBucket: 'giftthanks-b57ab.appspot.com',
            messagingSenderId: '1097148081266'
        });
        // this.getToken();
        // firebase.auth().onAuthStateChanged(user => {
        //     if (!user) {
        //         // firebase.auth().signInAnonymously();
        //         Actions.auth({ type: 'replace' });
        //     } else {
        //         console.log('user', user);
        //     }
        // });
    }

    // async getToken() {
    //   try {
    //     await AsyncStorage.getItem('token', (err, result) => {
    //       console.log('async result: ', result);
    //       if (result) {
    //         Actions.tabbar({ type: 'replace' });
    //       } else {
    //         Actions.auth({ type: 'reset' });
    //       }
    //     });
    //   } catch (error) {
    //     console.log('error retreiving token!');
    //   }
    // }

    render() {
      //const token = AsynchStorage.getItem('token') ? AsynchStorage.getItem('token') : null;
      // console.log('retreived token: ', AsynchStorage.getAllKeys());

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
