import React from 'react';
import { TextInput, View, Text, Dimensions } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, smallInputStyle, labelStyle, smallLabelStyle, containerStyle } = styles;
    const { height, width } = Dimensions.get('window');

    if (width < 350) {
      return (
          <View style={containerStyle}>
              <Text style={smallLabelStyle}>{label}</Text>
              <TextInput
                  secureTextEntry={secureTextEntry}
                  placeholder={placeholder}
                  autoCorrect={false}
                  style={smallInputStyle}
                  value={value}
                  onChangeText={onChangeText}
              />
          </View>
      );
    }

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingTop: 15,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        paddingLeft: 14,
        paddingTop: 15,
        fontSize: 18,
        flex: 1
    },
    smallInputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingTop: 15,
        fontSize: 16,
        lineHeight: 20,
        flex: 1
    },
    smallLabelStyle: {
        paddingLeft: 1,
        paddingTop: 15,
        fontSize: 16,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { Input };
