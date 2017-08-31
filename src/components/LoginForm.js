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
import { Card, CardSection, Input, Button, Spinner } from './common';
import FireAuth from 'react-native-firebase';


class LoginForm extends Component {
    state = {
        email: '',
        password: ''
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

    render() {
        return (
            <ScrollView style={styles.mainScrollView} >
                <View style={{ paddingTop: 65 }}>
                <Text style={styles.errorTextStyle} >
                    {this.props.error}
                </Text>
                <Card>
                    <View>
                        <Button onPress={() => {}}>
                            Google
                        </Button>
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
