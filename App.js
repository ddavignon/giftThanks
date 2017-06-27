import React from 'react';
import Router from './src/router';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';


export default class App extends React.Component {
  componentWillMount() {
      firebase.initializeApp({
          apiKey: 'AIzaSyAE1FJ0eI2DRJdOe5RvJv4m4l2sWOq0iLI',
          authDomain: 'giftthanks-b57ab.firebaseapp.com',
          databaseURL: 'https://giftthanks-b57ab.firebaseio.com',
          projectId: 'giftthanks-b57ab',
          storageBucket: 'giftthanks-b57ab.appspot.com',
          messagingSenderId: '1097148081266'
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
    return <Router />;
  }
}