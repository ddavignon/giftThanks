import React, { Component } from 'react';
import { Image } from 'react-native';

class TokensMain extends Component {
    render() {
        return (
          <Image
            source={require('../../assets/images/gifThanks_tokenscreen.png')}
            style={styles.imageContainer}
          />
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
  }
};

export default TokensMain;
