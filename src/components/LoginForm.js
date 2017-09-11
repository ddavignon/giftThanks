import React, { Component } from 'react';

import {
  Text,
  ScrollView,
  View,
  Picker,
  Alert,
  Image,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { connect } from 'react-redux';
// import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { Card, CardSection, Input, Button, Spinner } from './common';


class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    googleUser: {}
  }

  componentDidMount() {
    GoogleSignin.configure({
      iosClientId: '1097148081266-ls3e9l7eqtf10456as58l4gid60pl8cs.apps.googleusercontent.com',
      //iosClientId: '893015399163-b6to88eeam06v48p4n8d7rdek64eq228.apps.googleusercontent.com'
    });
  }

  onSignInPress() {
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => Actions.tabbar({ type: 'replace' }))
    .catch(err => alert(err));
  }

  onSignUpPress() {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => Actions.tabbar({ type: 'replace' }))
    .catch(err => alert(err));
  }

  async saveToken(token) {
    try {
      console.log('saveToken data: ', token);
      console.log('AsyncStorage: ', AsyncStorage);
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log('Error saving firebasetoken to storage.', error);
    }
  }
  _signIn() {
    GoogleSignin.signIn()
    .then(this.onGoogleLoginSuccess)
    .catch(error => {})
    .done();
  }

  onGoogleLoginSuccess(user) {
    const token = user.idToken;
    const provider = firebase.auth.GoogleAuthProvider;
    const credential = provider.credential(token);
    firebase.auth().signInWithCredential(credential)
    .then((data) => {
      Actions.tabbar({ type: 'replace' });
      // this.saveToken(data.refreshToken);
    })
    .catch((error) => console.log('ERROR', error));

  }

  render() {
    return (
      <ScrollView style={styles.mainScrollView} >
        <View style={{ paddingTop: 45, backgroundColor: '#D17F36' }}>
          <Card>
            <Image
              source={require('../../assets/images/gifThanks_login.png')}
              style={styles.imageContainer}
            />

            <Input
              label="Email"
              placeholder="email@email.com"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              style={styles.inputStyle}
            />
            <Input
              label="Password"
              placeholder="password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              style={styles.inputStyle}
            />
            <View>
              <Button onPress={this.onSignInPress.bind(this)}>
                Sign In
              </Button>
              <Button onPress={this.onSignUpPress.bind(this)}>
                Sign Up
              </Button>
            </View>

            <GoogleSigninButton
              style={styles.googleButtonStyle}
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Dark}
              onPress={this._signIn.bind(this)}
            />
          </Card>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  inputStyle: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.2)',
    paddingTop: 20,
    paddingBottom: 20,
  },

  blankTextStyle: {
    fontSize: 180,
    alignSelf: 'center',
    paddingTop: 15,

  },
  imageTextStyle: {
    color: 'black',
  },
  mainScrollView: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  imageContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  googleButtonStyle: {
    // flex: 1,
    // alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 80,
    height: 48,
    width: 180,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
};

// const mapStateToProps = ({ auth }) => {
//     const { email, password, phone_number, carrier, error, loading, token } = auth;
//     return { email, password, phone_number, carrier, error, loading, token };
// };

export default connect(null, null)(LoginForm);
