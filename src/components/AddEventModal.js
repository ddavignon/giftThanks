import React, { Component } from 'react';
import { Text, View, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Input, Button, SquareCardSection } from './common';
import { eventTextChanged, eventTextCompleted } from '../actions';


class AddEventModal extends Component {

    state = {
        eventName: '',
        visible: false
    }

    componentWillMount() {
        this.setState({ visible: this.props.visible });
    }

    getEventName(eventName) {
        const tempName = eventName;
        console.log('eventName: ', eventName);
        this.props.eventTextChanged(tempName);
        Actions.popTo('events');
        Actions.pop();
    }

    render() {
        const { visible } = this.props;
        //console.log('eventName= ', eventName);
        const { containerStyle, textStyle, cardSectionStyle } = styles;
        return (
            <Modal
                animationType='slide'
                onRequestClose={() => {}}//Android requires this function so we pass an empty one
                transparent
                visible={visible}
            >
                <View style={containerStyle}>
                  <View style={{ marginHorizontal: 15, borderRadius: 12 }}>
                    <SquareCardSection style={cardSectionStyle}>
                        <Text style={textStyle}>
                            Add Event
                        </Text>
                    </SquareCardSection>

                    <SquareCardSection>
                        <Input
                            label='   Event Name:'
                            placeholder='Birthday!'
                            value={this.state.eventName}
                            onChangeText={eventName => this.setState({ eventName })}
                        />
                    </SquareCardSection>

                    <SquareCardSection style={cardSectionStyle}>
                        <Button onPress={() => this.getEventName(this.state.eventName)} >
                            Create
                        </Button>

                        <Button onPress={() => Actions.pop()}>
                            Cancel
                        </Button>
                    </SquareCardSection>
                  </View>
                </View>
            </Modal>
        );
    }
}

const styles = {
    cardSectionStyle: {
        justifyContent: 'center',
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


const mapStateToProps = ({ eventMain }) => {
     const {
         eventName
     } = eventMain;

     return {
         eventName
    };
 };

 export default connect(mapStateToProps, { eventTextChanged, eventTextCompleted })(AddEventModal);
