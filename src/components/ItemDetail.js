import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from './common';


class ItemDetail extends Component {
    //This is a destructured props object using album instead of props
    renderForType(type) {
        console.log('type: ', this.props);
        if (type === 'items') {
            return (
                <Icon
                    onPress={this.props.onEditPress}
                    name='create'
                    color='#65c3d8'
                    iconStyle={{
                        justifyContent: 'space-between',
                        marginLeft: 10,
                        marginRight: 20 }}
                />
            );
        }
    }

    render() {
        const {
            thumbnailStyle,
            headerContentStyle,
            thumbnailContainerStyle,
            headerTextStyle,
        } = styles;

        const { image, title, type } = this.props;
        console.log('props: ', this.props);

        return (
            <TouchableOpacity
                onPress={this.props.onItemPress}
            >
                <Card>
                    <CardSection>
                        <View style={thumbnailContainerStyle}>
                            <Image
                                style={thumbnailStyle}
                                source={{ uri: image }}
                            />
                        </View>
                        <View style={headerContentStyle}>
                            <Text style={headerTextStyle}>{title}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            {this.renderForType(type)}
                            <Icon
                                onPress={this.props.onDeletePress}
                                name='not-interested'
                                color='#d66035'
                                iconStyle={{
                                    justifyContent: 'flex-end',
                                    marginLeft: 10,
                                    marginRight: 20 }}
                            />
                        </View>
                    </CardSection>
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    }
};
export default ItemDetail;
