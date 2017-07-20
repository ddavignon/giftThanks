import React from 'react';
import { Text, View } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EventsMain from './screens/EventsMain';
import AddEventModal from './components/AddEventModal';
import AddItemMain from './screens/AddItemMain';
import EventItems from './screens/EventItems';
import TokensMain from './screens/TokensMain';
import ContactsMain from './screens/ContactsMain';


const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
  );
}

const navButton = ({ selected, title, iconName }) => {
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
            <Icon size={24} color="black" name={iconName} backgroundColor="#FFFFFF" />
            <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
        </View>

    );
}

const RouterComponent = () => {
    return (

        <Router>
            <Scene key="root" sceneStyle={{ paddingTop: 25 }}>
                {/* Tab Container */}
                <Scene
                  key="tabbar"
                  tabs
                  tabBarStyle={{ backgroundColor: '#FFFFFF' }}
                >
                {/* Tab and it's scenes */}
                    <Scene
                        key="eventsScene"
                        title="Events"
                        icon={navButton}
                        iconName="view-list"
                    >
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
                        <Scene
                            rightTitle='+'
                            onRight={() => {}}
                            key='gifts'
                            component={EventItems}
                            title='Gifts'

                        />
                        <Scene key='addItemScene' component={AddItemMain} />
                    </Scene>
                {/* Tab and it's scenes*/}
                    <Scene
                        key='tokensScene'
                        title="Tokens"
                        icon={navButton}
                        iconName="monetization-on"
                    >
                        <Scene
                            key='tokens'
                            component={TokensMain}
                            title='Tokens'
                            initial
                        />
                    </Scene>
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
