import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import { Header } from './components/common';
import reducers from './reducers';
import AddItemForm from './components/AddItemForm';
import GetItemsList from './components/GetItemsList';
import FooterBar from './components/FooterBar';
import ItemList from './components/ItemList';


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
                <View>
                    <Header headerText="My Gifts" />
                    <ScrollView>
                        <AddItemForm />
                        {/*<GetItemsList />*/}
                    <ItemList />
                    </ScrollView>
                    <FooterBar />
                </View>
            </Provider>
        );
    }
}

export default App;
