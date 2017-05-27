import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
            <Scene key="main">
                <Scene 
                    onRight={() => Actions.addItemCreate()}
                    rightTitle="Add"
                    key="itemList"
                    component={ItemList}
                    title="Events"
                    initial
                />
                <Scene
                    key="addItemCreate"
                    component={AddItemForm}
                    title="Add an Item"
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
