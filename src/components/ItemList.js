import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
//import axios from 'axios';
import {
    fetchEventItems
} from '../actions';
import ItemDetail from './ItemDetail';


class ItemList extends Component {
    state = {
        items: [{ image: 'http://images.clipartpanda.com/smiley-face-transparent-background-smile-triste-421a98.gif', title: 'smiley face' },
        { image: 'http://images.clipartpanda.com/smiley-face-transparent-background-smile-triste-421a98.gif', title: 'smiley face2' }]
    };

    componentWillMount() {
        // axios.get('https://rallycoding.herokuapp.com/api/music_albums')
        //     .then(response => this.setState({ albums: response.data }));
        this.props.fetchEventItems();
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
                {this.renderItems()}
            </ScrollView>
        );
    }
}

const mapStateToProps = ({ addItem }) => {
    const { dbData } = addItem;

    return { dbData };
};

export default connect(mapStateToProps, { fetchEventItems })(ItemList);
