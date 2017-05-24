import React, { Component } from 'react';
import { ScrollView } from 'react-native';
//import axios from 'axios';
import ItemDetail from './ItemDetail';

class ItemList extends Component {
    state = {
        items: [{ image: 'http://images.clipartpanda.com/smiley-face-transparent-background-smile-triste-421a98.gif', title: 'smiley face' },
        { image: 'http://images.clipartpanda.com/smiley-face-transparent-background-smile-triste-421a98.gif', title: 'smiley face2' }]
    };

    // componentWillMount() {
    //     axios.get('https://rallycoding.herokuapp.com/api/music_albums')
    //         .then(response => this.setState({ albums: response.data }));
    // }

    renderItems() {
        return this.state.items.map(item => //map is an iterator good for arrays
            //key needs to be unique so pick a field in the data that is unique
            <ItemDetail key={item.title} item={item}/*item props we are sending to itemDetail*/ />
        );
    }

    render() {
        return (
            <ScrollView>
                {this.renderItems()}
            </ScrollView>
        );
    }
}

export default ItemList;
