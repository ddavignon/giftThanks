import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from './common';


class ItemDetail extends Component {
    //This is a destructured props object using album instead of props
    renderIconForType(type) {
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

    renderImageForType(type, image, thumbnailStyle) {
        console.log('type: ', this.props);
        if (type === 'items') {
            return (
                <Image
                    style={thumbnailStyle}
                    source={{ uri: image }}
                />
            );
        }
    }

    renderCompleted(type) {
        console.log('type: ', this.props);
        if (type === 'items' && this.props.sentThanks) {
            return (
                <Icon
                    name='done'
                    color='#42f45f'
                    iconStyle={{
                        justifyContent: 'space-between',
                        marginLeft: 7
                    }}
                />
            );
        }
    }

    render() {
        const {
            thumbnailStyle,
            headerContentStyle,
            thumbnailContainerStyle,
            textStyle,
        } = styles;

        const { image, title, type } = this.props;
        console.log('itemDetail props: ', this.props);

        return (
            <TouchableOpacity
                onPress={this.props.onItemPress}
            >
                <Card>
                    <CardSection>
                        <View style={thumbnailContainerStyle}>
                            {this.renderCompleted(type)}
                        </View>
                        <View style={thumbnailContainerStyle}>
                            {this.renderImageForType(type, image, thumbnailStyle)}
                        </View>
                        <View style={headerContentStyle}>
                            <Text style={textStyle}>{title}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            {this.renderIconForType(type)}
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
    textStyle: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 5,
        fontFamily: 'mostlyMono',
        fontSize: 28,
        fontWeight: 'bold'
    },
    thumbnailStyle: {
        height: 60,
        width: 60
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: 10,
        marginRight: 10
    }
};
export default ItemDetail;
