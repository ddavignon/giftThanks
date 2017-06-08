import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, CardSection, Button } from './common';


class ItemDetail extends Component {
    //This is a destructured props object using album instead of props
    render() {
        const {
            thumbnailStyle,
            headerContentStyle,
            thumbnailContainerStyle,
            headerTextStyle,
        } = styles;

        const { image, title } = this.props;

        return (
            <TouchableOpacity
                onPress={() => this.props.onItemPress()}
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
                        <Button onPress={this.props.onEditPress}>
                            Edit
                        </Button>
                        <Button onPress={this.props.onDeletePress}>
                            Delete
                        </Button>
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
