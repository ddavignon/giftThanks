import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import EditItemForm from '../components/EditItemForm';

class EditItemMain extends Component {
    render() {
        return (
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
