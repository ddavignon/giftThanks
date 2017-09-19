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
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import { SocialIcon } from 'react-native-elements';
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
    googleUser: {},
    showLogin: true
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
      // this.saveToken(data.refreshToken);
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

  renderScreen() {
    if (this.state.showLogin) {
      return (
        <ScrollView style={styles.mainScrollView} >
          <View style={{ paddingTop: 45, backgroundColor: 'rgb(245,245,245)' }}>
              <Image
                source={require('../../assets/images/gifThanks_login.png')}
                style={styles.imageContainer}
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
        </ScrollView>
      );
    }

    return (
      <ScrollView style={styles.mainScrollView} >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            paddingTop: 125 }}
        >
          <Spinner />
        </View>
      </ScrollView>
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
    width: 250,
    height: 250,
    marginVertical: 35,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  socialLoginContainerStyle: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 80,
    flexDirection: 'row',
    justifyContent: 'space-between'
    // height: 48,
    // width: 180,
    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3
    // }
  },
  inputMargin: {
    paddingLeft: 15,
  }
};

// const mapStateToProps = ({ auth }) => {
//     const { email, password, phone_number, carrier, error, loading, token } = auth;
//     return { email, password, phone_number, carrier, error, loading, token };
// };

export default connect(null, null)(LoginForm);
