import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import {
    fetchEventItems
} from '../actions';
import ItemDetail from './ItemDetail';


class ItemList extends Component {

    componentWillMount() {
        console.log(this.props.screen);
        // if (this.props.screen === 'EventsMain') {
        //     this.props.fetchEventItems();
        // }
    }

    // renderItems() {
    //     console.log(this.props.dbData);
    //     if (this.props.dbData) {
    //         return Object.values(this.props.dbData).map((item, index) => {
    //             return (
    //                 <ItemDetail
    //                     key={index}
    //                     title={item.isFrom}/*item props we are sending to itemDetail*/
    //                     image={item.itemURL}
    //                 />
    //             );
    //         });
    //     }
    // }

    render() {
        return (

                <ScrollView>
                    <View style={{ marginBottom: 65 }} >
                        // {this.renderItems()}
                    </View>
                </ScrollView>

        );
    }
}

const mapStateToProps = ({ addItem }) => {
    const { dbData } = addItem;

    return { dbData };
};

export default connect(mapStateToProps, { fetchEventItems })(ItemList);
