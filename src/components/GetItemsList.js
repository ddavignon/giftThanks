import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import firebase from 'firebase';
import { CardSection } from './common';


class GetItemsList extends Component {

    state = {
        dbData: ''
    }

    componentWillMount() {
        firebase.database().ref('items').on('value', snapshot => {
            this.setState({ dbData: snapshot.val() });
        });
    }

    renderItems(dbItems) {
        const { inputStyle, labelStyle, containerStyle } = styles;
        return _.map(dbItems, (item, index) => {
            console.log(item, index);
            return (
                <CardSection key={index}>
                    <View style={containerStyle}>
                        <View>
                            <Image
                                style={{ width: 200, height: 200 }}
                                source={{ uri: item.itemURL }}
                            />
                        </View>
                        <Text style={labelStyle}>From: {item.isFrom}</Text>
                        <Text style={inputStyle}>{item.description}</Text>
                    </View>
                </CardSection>
            );   
        });
    }

    render() {
        return (
            <ScrollView>
                {this.renderItems(this.state.dbData)}
            </ScrollView>
        );
    }
}

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 1
    },
    labelStyle: {
        fontSize: 18,
        flex: 1
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    }
};

export default GetItemsList;
