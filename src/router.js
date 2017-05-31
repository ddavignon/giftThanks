import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Header } from './components/common';
import FooterBar from './components/FooterBar';
import EventsMain from './screens/EventsMain';
import TokensMain from './screens/TokensMain';


class Router extends Component {

    renderPage() {
        console.log(this.props.pageIndex);
        switch (this.props.pageIndex) {
            case 0:
                return <View><Text>Contacts!</Text></View>;
            case 1:
                return <EventsMain />;
            case 2:
                return <TokensMain />;
            default:
                return <View><Text>Uh Oh! Something went wrong!</Text></View>;
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
