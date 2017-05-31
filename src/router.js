import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Header } from './components/common';
import AddItemForm from './components/AddItemForm';
import FooterBar from './components/FooterBar';
import ItemList from './components/ItemList';
import EventsMain from './screens/EventsMain';


class Router extends Component {

    renderPage() {
        console.log(this.props.pageIndex);
        switch (this.props.pageIndex) {
            case 0:
                return <View><Text>Contacts!</Text></View>;
            case 1:
                return <EventsMain />;
            case 2:
                return <View><Text>Tokens!</Text></View>;
            default:
                return <View><Text>Uh Oh!</Text></View>;
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Header headerText="My Gifts" />
                {this.renderPage()}
                <FooterBar style={styles.footerStyle} />
            </View>
        );
    }
}

const styles = {
    footerStyle: {
        flex: 1,
        // height: 56,
        // elevation: 8,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        // marginTop: 10,
        justifyContent: 'space-between'
    }
};

const mapStateToProps = ({ navIndex }) => {
    const { pageIndex } = navIndex;

    return { pageIndex };
};

export default connect(mapStateToProps, null)(Router);
