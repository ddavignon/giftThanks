import React, { Component } from 'react';
import { Text, View, Modal } from 'react-native';
import { Input, Button, CardSection } from './common';


class AddEventModal extends Component {
    
    state = {
        eventName: '',
        visible: false
    }

    componentWillMount() {
        this.setState({ visible: this.props.visible });
    }

    getEventName() {
        this.props.onAccept(this.state.eventName);
    }

    render() {
        const { visible, onDecline } = this.props;
        const { containerStyle, textStyle, cardSectionStyle } = styles;
        return (
            <Modal
                animationType='slide'
                onRequestClose={() => {}}//Android requires this function so we pass an empty one
                transparent
                visible={visible}
            >
                <View style={containerStyle}>
                    <CardSection style={cardSectionStyle}>
                        <Text style={textStyle}>
                            Add Event
                        </Text>
                    </CardSection>

                    <CardSection>
                        <Input
                            label='Event Name:'
                            placeholder='Birthday!'
                            value={this.state.eventName}
                            onChangeText={eventName => this.setState({ eventName })}
                        />
                    </CardSection>

                    <CardSection>
                    <Button onPress={() => this.getEventName()}/*Not passing onAccept() says don't call imediately*/>
                        Create
                    </Button>

                    <Button onPress={onDecline}>
                        Cancel
                    </Button>
                    </CardSection>
                </View>
            </Modal>
        );
    }
}

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


export default AddEventModal;
