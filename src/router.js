import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Header } from './components/common';
import AddItemForm from './components/AddItemForm';
import FooterBar from './components/FooterBar';
import ItemList from './components/ItemList';

class Router extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>

                    <Header headerText="My Gifts" />
                    <ScrollView>
                        <AddItemForm />
                        {/*<GetItemsList />*/}
                        <ItemList />
                    </ScrollView>

                    <View>
                    <FooterBar style={{ flex: 1 }} />
                    </View>
                </View>
        );
    }
};

export default Router;
