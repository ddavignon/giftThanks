import React, { Component } from 'react';

import { Text,
    ScrollView,
    View,
    Picker,
    Alert,
    Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { connect } from 'react-redux';
import FirAuth from 'react-native-firebase';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { Card, CardSection, Input, Button, Spinner } from './common';

let provider = new firebase.auth.GoogleAuthProvider();

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        googleUser: {}
    }
    componentDidMount() {
      GoogleSignin.configure({
        iosClientId: '1097148081266-ls3e9l7eqtf10456as58l4gid60pl8cs.apps.googleusercontent.com',
      });
    }

    onSignInPress() {
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => Actions.tabbar())
            .catch(err => alert(err));
    }

    onSignUpPress() {
        const { email, password } = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => Actions.tabbar())
            .catch(err => alert(err));
    }

    _signIn() {
      GoogleSignin.currentUserAsync({
          iosClientId: '1097148081266-ls3e9l7eqtf10456as58l4gid60pl8cs.apps.googleusercontent.com',
      }).then((user) => {
          console.log('USER: ', user);
          this.setState({ googleUser: user });
          console.log('ID token: ', user.idToken);
          const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
          console.log('Credential: ', credential);
          console.log(firebase.auth().signInWithCredential(credential));
          firebase.auth().signInWithCredential(credential)
          .then(() => Actions.tabbar())
          .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const errorCredential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
              alert('Email already associated with another account.');
            // Handle account linking here, if using.
          } else {
              console.error(error);
          }
       });
        // const credential = {
        //   provider: 'google.com',
        //   token: user.accessToken,
        //   secret: user.idToken,
        // };
        // firebase.auth().signInWithCredential(credential)
        //   .then((currentUser) => {
        //     console.log('User successfully signed in', currentUser);
        //   })
        //   .catch((err) => {
        //     console.error('User signin error', err);
        //   });
      }).done();
      // provider.addScope('profile');
      // provider.addScope('email');
      // firebase.auth().signInWithPopup(provider).then((result) => {
      //  // This gives you a Google Access Token.
      //  const token = result.credential.accessToken;
      //  // The signed-in user info.
      //  const user = result.user;
      //  console.log('firebase accesstoken: ', token);
      //  console.log('firebase user info: ', user);
      // });
    }

    render() {
        return (
            <ScrollView style={styles.mainScrollView} >
                <View style={{ paddingTop: 65 }}>
                <Card>
                    <CardSection>
                        <Input
                            label="Email"
                            placeholder="email@email.com"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        />
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>
                        <Input
                            label="Password"
                            placeholder="password"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        />
                    </CardSection>
                </Card>
                <Card>
                    <View>
                      <Button onPress={this.onSignInPress.bind(this)}>
                          Sign In
                      </Button>
                      <Button onPress={this.onSignUpPress.bind(this)}>
                          Sign Up
                      </Button>
                    </View>
                </Card>
                <Card>
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
    pickerTextStyle: {
        fontSize: 18,
        paddingRight: 70,
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
        flex: 1,
        justifyContent: 'center',
        width: null,
        height: null,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    googleButtonStyle: {
        // flex: 1,
        // alignSelf: 'stretch',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        height: 48,
        width: 180,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        }
    }
};

// const mapStateToProps = ({ auth }) => {
//     const { email, password, phone_number, carrier, error, loading, token } = auth;
//     return { email, password, phone_number, carrier, error, loading, token };
// };

export default connect(null, null)(LoginForm);
