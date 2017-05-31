import React, { Component } from 'react';
import { connect } from 'react-redux';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    navTabChange
} from '../actions';

class FooterBar extends Component {
    render() {
        return (
            <BottomNavigation
                labelColor="white"
                rippleColor="white"
                style={styles.footerStyle}
                onTabChange={(newTabIndex) => this.props.navTabChange(newTabIndex)}
            >
                <Tab
                    barBackgroundColor="#37474F"
                    label="Contacts"
                    icon={<Icon size={24} color="white" name="people" />}
                />
                <Tab
                    barBackgroundColor="#4f6b99"
                    label="Events"
                    icon={<Icon size={24} color="white" name="view-list" />}
                />
                <Tab
                    barBackgroundColor="#00796B"
                    label="Tokens"
                    icon={<Icon size={24} color="white" name="monetization-on" />}
                />
            </BottomNavigation>
        );
    }
}

const styles = {
    footerStyle: {
        flex: 1,
        height: 56,
        elevation: 8,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        marginTop: 10,
        justifyContent: 'space-between'
    }
};

export default connect(null, { navTabChange })(FooterBar);
