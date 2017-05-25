import React, { Component } from 'react';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';


class FooterBar extends Component {
    render() {
        return (
            <BottomNavigation
                labelColor="white"
                rippleColor="white"
                style={styles.footerStyle}
                //onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
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
        height: 56,
        elevation: 8,
        position: 'absolute',
        left: 0,
        bottom: -74,
        right: 0
    }
};

export default FooterBar;
