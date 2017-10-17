import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EditItemForm from '../components/EditItemForm';

class EditItemMain extends Component {
    render() {
        return (
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
          >
          <Image
            source={require('../../assets/images/plain.png')}
            style={styles.imageContainer}
          >
            <ScrollView keyboardShouldPersistTaps="always">
                <EditItemForm
                    eventItem={this.props.event}
                    eventId={this.props.eventId}
                    editKeyId={this.props.editKeyId}
                />
            </ScrollView>
          </Image>
          </KeyboardAwareScrollView>
        );
    }
}

const styles = {
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: null,
    height: null,
    backgroundColor: 'transparent',
    paddingBottom: 30
  }
};

export default EditItemMain;
