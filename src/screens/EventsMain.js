import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ItemList from '../components/ItemList';
import { Card, Button } from '../components/common';


class EventsMain extends Component {
    render() {
        return (
            <ScrollView>
                <Card>
                    <Button>
                        Add Event
                    </Button>
                </Card>
                <ItemList screen="EventsMain" />
            </ScrollView>
        );
    }
}

export default EventsMain;
