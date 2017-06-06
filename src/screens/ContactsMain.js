import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import {
    CardSection,
    Card,
    Button,
    Input
} from '../components/common';


class ContactsMain extends Component {
    state = {
        contactName: ''
    }

    render() {
        return (
            <ScrollView>
                <CardSection>
                    <Input
                        placeholder="Bob"
                        label="Name"
                        value={this.state.contactName}
                        onChangeText={contactName => this.setState({ contactName })}
                    />
                </CardSection>
                <Card>
                    <Button>
                        Add Contacts
                    </Button>
                </Card>
            </ScrollView>
        );
    }
}

export default ContactsMain;
