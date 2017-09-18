import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
    return (
      <View>
        <View style={styles.containerStyle}>
            {props.children}
        </View>
        <View stlye={{ flex: 0.1 }} />
        </View>
    );
};

const styles = {
    containerStyle: {
        // borderWidth: 1,
        // borderRadius: 2,
        // borderColor: '#ddd',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
};

export { Card };
