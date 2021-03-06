import React, { Component } from 'react';

import {
  Text,
  ScrollView,
  View,
  Picker,
  Alert,
  Image,
  AsyncStorage,
  Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import { SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { Card, SquareCardSection, Input, Button, Spinner } from './common';


class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    googleUser: {},
    showLogin: true,
    smallScreen: false
  }

  componentDidMount() {
    GoogleSignin.configure({
      iosClientId: '1097148081266-ls3e9l7eqtf10456as58l4gid60pl8cs.apps.googleusercontent.com',
    });
    const { height, width } = Dimensions.get('window');
    console.log('screenHeight:', height, 'screenWidth: ', width);
    if (width < 350) {
      this.setState({ smallScreen: true });
    }
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
      // console.log('saveToken data: ', token);
      // console.log('AsyncStorage: ', AsyncStorage);
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log('Error saving firebasetoken to storage.', error);
    }
  }
  _signIn() {
    this.setState({ showLogin: false });
    GoogleSignin.signIn()
    .then(this.onGoogleLoginSuccess)
    .catch(error => { this.setState({ showLogin: true }); })
    .done();
  }

  onGoogleLoginSuccess(user) {
    const token = user.idToken;
    const provider = firebase.auth.GoogleAuthProvider;
    const credential = provider.credential(token);
    firebase.auth().signInWithCredential(credential)
    .then((data) => {
      Actions.tabbar({ type: 'replace' });
      this.setState({ showLogin: true });
    })
    .catch((error) => {
      console.log('ERROR', error);
    });
  }

  _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log('Login success with permissions: ',
            result);
            AccessToken.getCurrentAccessToken()
            .then((accessTokenData) => {
              const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);
              firebase.auth().signInWithCredential(credential)
              .then((data) => {
                //success
                Actions.tabbar({ type: 'replace' });
                this.setState({ showLogin: true });
              }, (error) => {
                console.log('firebaselogin using FB error: ', error);
              });
            }, (error) => {
              console.log('FB accessToken error: ', error);
            });
        }
      })
      .catch((error) => {
        console.log('FB login fail with error: ', error);
      });
  }

  sizeLoginImage() {
    if (this.state.smallScreen) {
      return styles.smallImageContainer;
    }
    return styles.imageContainer;
  }

  renderScreen() {
    if (this.state.showLogin) {
      return (
        // <ScrollView style={styles.mainScrollView} >
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
        <View style={{ paddingTop: 45, backgroundColor: 'rgb(245,245,245)' }}>
            <Image
              source={require('../../assets/images/gifThanks_login.png')}
              style={this.sizeLoginImage()}
            />
          <View style={{ marginRight: 20, marginLeft: 20 }}>
            <View style={styles.inputMargin}>
              <Input
                label="Email"
                placeholder="email@email.com"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                style={styles.inputStyle}
              />
            </View>
            <View style={styles.inputMargin}>
              <Input
                label="Password"
                placeholder="password"
                onChangeText={password => this.setState({ password })}
                secureTextEntry
                value={this.state.password}
                style={styles.inputStyle}
              />
            </View>
            <View>
              <Button onPress={this.onSignInPress.bind(this)}>
                Sign In
              </Button>
              <Button onPress={this.onSignUpPress.bind(this)}>
                Sign Up
              </Button>
            </View>
          </View>
            <View style={styles.socialLoginContainerStyle}>

              <SocialIcon
                raised
                type='google-plus-official'
                onPress={this._signIn.bind(this)}
              />
            <Text style={{ paddingTop: 20 }} >or sigin with</Text>
              <SocialIcon
                raised
                type='facebook'
                onPress={this._fbAuth.bind(this)}
              />
            </View>

        </View>
        </KeyboardAwareScrollView>
      // </ScrollView>
      );
    }

    return (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0)',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            paddingTop: 125 }}
        >
          <Spinner />
        </View>
    );
  }

  render() {
    return (
      this.renderScreen()
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
    paddingVertical: 30,
  },
  imageTextStyle: {
    color: 'black',
  },
  mainScrollView: {
    backgroundColor: 'transparent',
  },
  imageContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 250,
    height: 255,
    marginVertical: 35,
    backgroundColor: 'transparent'
  },
  smallImageContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 110,
    height: 125,
    marginTop: 35,
    marginBottom: 15,
    backgroundColor: 'transparent'
  },
  socialLoginContainerStyle: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 80,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputMargin: {
    paddingLeft: 15
  }
};

export default LoginForm;
