import React from 'react';
import { Text, View } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EventsMain from './screens/EventsMain';
import AddEventModal from './components/AddEventModal';
import AddItemMain from './screens/AddItemMain';
import SendItemMain from './screens/SendItemMain';
import EventItems from './screens/EventItems';
import TokensMain from './screens/TokensMain';
import EditItemMain from './screens/EditItemMain';
import ContactsMain from './screens/ContactsMain';


const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
  );
};

const navButton = ({ selected, title, iconName }) => {
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
            <Icon size={24} color="black" name={iconName} backgroundColor="#FFFFFF" />
            <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
        </View>

    );
};

// const reducerCreate = params=>{
//     const defaultReducer = Reducer(params);
//     return (state, action)=>{
//         console.log("ACTION:", action);
//         return defaultReducer(state, action);
//     }
// };

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
                            rightTitle='Add'
                            onRight={() => Actions.addEventModal()}
                            key='events'
                            component={EventsMain}
                            title='Events'
                            titleStyle={styles.textStyle}
                            type='reset'
                            initial
                        />
                        <Scene
                            rightTitle='+'
                            onRight={() => {}}
                            key='gifts'
                            component={EventItems}
                            title='Gifts'
                            titleStyle={styles.textStyle}

                        />
                        <Scene key='addItemScene' title='Add a gift' component={AddItemMain} />
                        <Scene key='editItemScene' title='Edit Item' component={EditItemMain} />
                        <Scene key='sendItemScene' title='Send Thanks!' component={SendItemMain} />
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
                            titleStyle={styles.textStyle}
                            initial
                        />
                    </Scene>
                </Scene>
            </Scene>

            <Scene
                key='addEventModal'
                direction='vertical'
                component={AddEventModal}
                title="Create Event"
                hideNavBar
            />

        </Router>
    );
};

const styles = {
    textStyle: {
        fontFamily: 'CatCafe',
        fontSize: 27
    }
};

export default RouterComponent;
