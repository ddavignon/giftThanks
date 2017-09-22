import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.containerStyle} >
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        //borderBottomWidth: 1,
        // padding: 5,
        //flex: 1,
        flexDirection: 'row',
        //flexWrap: 'wrap',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardSection };
