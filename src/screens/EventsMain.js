import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import AddItemForm from '../components/AddItemForm';
import ItemList from '../components/ItemList';


class EventsMain extends Component {
    render() {
        return (
            <ScrollView>
                <AddItemForm />
                <ItemList />
            </ScrollView>
        );
    }
}

export default EventsMain;
