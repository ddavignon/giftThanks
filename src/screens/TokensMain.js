import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';


class TokensMain extends Component {
    render() {
        return (
            <View style={{ paddingTop: 70, flex: 1, flexDirection: 'column' }}>
                <ScrollView>
                    <View style={{ marginBottom: 65 }}>
                        <Text>
                            Tokens Coming Soon!
                            </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default TokensMain;
