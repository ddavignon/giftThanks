import React, { Component } from 'react';

import { Text,
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

    // componentWillMount() {
    //     if (this.state.googleUser) {
    //         Actions.tabbar({ type: 'replace' });
    //     }
    // }

    componentDidMount() {
        GoogleSignin.configure({
            iosClientId: '1097148081266-ls3e9l7eqtf10456as58l4gid60pl8cs.apps.googleusercontent.com',
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

    _signIn() {
        console.log('googleUser value: ', this.state.googleUser);
      GoogleSignin.signIn({
        iosClientId: '1097148081266-ls3e9l7eqtf10456as58l4gid60pl8cs.apps.googleusercontent.com',
      })
      .then((user) => {
        console.log(user);
        this.setState({ googleUser: user });
        console.log('ID token: ', this.state.googleUser.idToken);
        const credential = firebase.auth.GoogleAuthProvider.credential(this.state.googleUser.idToken);
        console.log('Credential: ', credential);
        console.log(firebase.auth().signInWithCredential(credential));
        firebase.auth().signInWithCredential(credential)
        .then((firebaseUser) => {
          this.saveToken(firebaseUser.refreshToken);
          console.log('storage Token: ', firebaseUser.refreshToken);
          Actions.tabbar({ type: 'replace' });
          console.log('firebase userdata:', firebaseUser);
        })
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
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
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
