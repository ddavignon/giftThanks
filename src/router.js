import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import EventsMain from './screens/EventsMain';
import AddEventModal from './components/AddEventModal';
import AddItemMain from './screens/AddItemMain';
import EventItems from './screens/EventItems';
import TokensMain from './screens/TokensMain';


const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
            <Scene key='modal' >
                <Scene
                    rightTitle='+'
                    onRight={() => {}}
                    key='events'
                    component={EventsMain}
                    title='Events'
                     type="reset"
                    initial
                />
                <Scene key='addEventModal' component={AddEventModal} />
            </Scene>
            <Scene key='giftScene' >
                <Scene
                    rightTitle='+'
                    onRight={() => {}}
                    key='gifts'
                    component={EventItems}
                    title='Gifts'
                    //initial
                />
                <Scene key='addItemScene' component={AddItemMain} />
            </Scene>
            <Scene key='tokensScene' >
                <Scene
                    key='tokens'
                    component={TokensMain}
                    title='Tokens'
                    initial
                />
            </Scene>

        </Router>
    );
};

export default RouterComponent;
