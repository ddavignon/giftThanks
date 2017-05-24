import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Card, CardSection } from './common';


const ItemDetail = ({ item }) => {
    //This is a destructured props object using album instead of props
    console.log('inside ItemDetail');
    const { image, title } = item;
    const {
        thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
    } = styles;

    return (
        <Card>
            <TouchableWithoutFeedback>
                <CardSection>
                    <View style={thumbnailContainerStyle}>
                        <Image
                            style={thumbnailStyle}
                            source={{ uri: item.image }}
                        />
                    </View>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}>{title}</Text>
                    </View>
                </CardSection>
            </TouchableWithoutFeedback>
        </Card>
    );
};

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
