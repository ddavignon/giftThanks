import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import AddItemForm from '../components/AddItemForm';

class AddItemMain extends Component {
    render() {
        return (
          <Image
            source={require('../../assets/images/plain.png')}
            style={styles.imageContainer}
          >
            <ScrollView keyboardShouldPersistTaps="always">
                <AddItemForm eventId={this.props.eventId} />
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
    backgroundColor: 'rgba(0,0,0,0)',
    paddingBottom: 30
  }
};

export default AddItemMain;
