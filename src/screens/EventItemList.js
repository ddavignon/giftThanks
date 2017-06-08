import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import {
    fetchEventItems
} from '../actions';
import ItemDetail from '../components/ItemDetail';


class EventItemList extends Component {

    componentWillMount() {
        console.log(this.props.screen);

        const { currentUser } = firebase.auth();

        const { eventPathKey } = this.props;

        this.props.fetchEventItems(`/users/${currentUser.uid}/events/${eventPathKey}`);
    }

    renderItems() {
        console.log(this.props.dbData);
        if (this.props.dbData) {
            return _.map(this.props.dbData, (item, index) => {
                return (
                    <ItemDetail
                        key={index}
                        title={item.isFrom}/*item props we are sending to itemDetail*/
                        image={item.itemURL}
                    />
                );
            });
        }
    }

    render() {
        return (

                <ScrollView>
                    <View style={{ marginBottom: 65 }} >
                        {this.renderItems()}
                    </View>
                </ScrollView>

        );
    }
}

const mapStateToProps = ({ addItem, navIndex }) => {
    const { dbData } = addItem;

    const { eventPathKey } = navIndex

    return { dbData, eventPathKey };
};

export default connect(mapStateToProps, { fetchEventItems })(EventItemList);
