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
import FireAuth from 'react-native-firebase';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { Card, CardSection, Input, Button, Spinner } from './common';


class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        googleUser: {}
    }
    componentDidMount() {
      GoogleSignin.configure({
        iosClientId: '1097148081266-ls3e9l7eqtf10456as58l4gid60pl8cs.apps.googleusercontent.com', // only for iOS
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
      }).done();
      // GoogleSignin.getAccessToken()
      // .then((token) => {
      //   console.log(token);
      // })
      // .catch((err) => {
      //   console.log(err);
      // })
      // .done();
    }

    render() {
        return (
            <ScrollView style={styles.mainScrollView} >
                <View style={{ paddingTop: 65 }}>
                <Text style={styles.errorTextStyle} >
                    {this.props.error}
                </Text>
                <Card>
                    <View>
                        <GoogleSigninButton
                          style={{ flex: 1,
                            alignSelf: 'stretch',
                            marginLeft: 10,
                            marginRight: 10,
                            height: 48 }}
                          size={GoogleSigninButton.Size.Icon}
                          color={GoogleSigninButton.Color.Dark}
                          onPress={this._signIn.bind(this)}
                        />
                    </View>
                </Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@email.com"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Password"
                        placeholder="password"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                </CardSection>
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
};

// const mapStateToProps = ({ auth }) => {
//     const { email, password, phone_number, carrier, error, loading, token } = auth;
//     return { email, password, phone_number, carrier, error, loading, token };
// };

export default connect(null, null)(LoginForm);
