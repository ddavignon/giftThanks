import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import FooterBar from '../components/FooterBar';


class TokensMain extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <ScrollView>
                    <View style={{ marginBottom: 65 }}>
                        <Text>
                            Tokens Coming Soon!
                            </Text>
                    </View>
                </ScrollView>

                <View>
                    <FooterBar style={{ flex: 1 }} />
                </View>
            </View>
        );
    }
}

export default TokensMain;
