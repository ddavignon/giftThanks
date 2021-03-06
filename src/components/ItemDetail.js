import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { RadiusCard, CardSection } from './common';


class ItemDetail extends Component {
    //This is a destructured props object using album instead of props
    renderIconForType(type) {
        //console.log('type: ', this.props);
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
        console.log('type: ', this.props.type);
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
        //console.log('type: ', this.props);
        if (type === 'items' && this.props.hasBeenSent) {
            return (
                <Icon
                    name='done'
                    color='#42f45f'
                    iconStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 7,
                        marginRight: 10
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
                <RadiusCard>
                    <CardSection>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            {this.renderCompleted(type)}
                        </View>
                        <View style={thumbnailContainerStyle}>
                            {this.renderImageForType(type, image, thumbnailStyle)}
                        </View>
                        <View style={headerContentStyle}>
                            <Text
                              style={textStyle}
                              numberOfLines={1}
                              ellipsizeMode='tail'
                            >
                              {title}
                            </Text>
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
                </RadiusCard>
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
        //flex: 1,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 5,
        fontFamily: 'mostlyMono',
        fontSize: 28,
        fontWeight: 'bold',
        maxWidth: 200,
        //overflow: 'hidden'
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
