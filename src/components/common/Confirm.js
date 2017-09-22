import React from 'react';
import { Text, View, Modal } from 'react-native';
import { SquareCardSection } from './SquareCardSection';
import { Button } from './Button';


const Confirm = ({ children, visible, onAccept, onDecline }) => {
const { containerStyle, textStyle, cardSectionStyle } = styles;

    return (
        <Modal
            animationType='slide'
            onRequestClose={() => {}}//Android requires this function so we are passing an empty one
            transparent
            visible={visible}
        >
            <View style={containerStyle}>
              <View style={{ marginHorizontal: 15, borderRadius: 12 }} >
                <SquareCardSection style={cardSectionStyle}>
                    <Text style={textStyle}>
                        {children}
                    </Text>
                </SquareCardSection>

                <SquareCardSection>
                <Button onPress={onAccept}>
                    Yes
                </Button>

                <Button onPress={onDecline}>
                    No
                </Button>
                </SquareCardSection>
              </View>
            </View>
        </Modal>
    );
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
};

export { Confirm };
