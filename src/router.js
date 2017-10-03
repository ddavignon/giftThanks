import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { GoogleSignin } from 'react-native-google-signin';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddEventModal from './components/AddEventModal';
import LoginForm from './components/LoginForm';
import EventsMain from './screens/EventsMain';
import AddItemMain from './screens/AddItemMain';
import SendItemMain from './screens/SendItemMain';
import EventItems from './screens/EventItems';
import TokensMain from './screens/TokensMain';
import EditItemMain from './screens/EditItemMain';


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

const RouterComponent = () => {
    const { textStyle } = styles;

    return (

        <Router>
            <Scene key="root" sceneStyle={{ paddingTop: 25 }}>
                {/* Tab Container */}
                <Scene key="auth" >
                    <Scene
                    key="login"
                    component={LoginForm}
                    title='Login'
                    titleStyle={textStyle}
                    />
                </Scene>
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
                            rightTitle='Add Event'
                            onRight={() => Actions.addEventModal()}
                            leftTitle='Log Out'
                            onLeft={() => {
                              firebase.auth().signOut()
                                .then((user) => {
                                  console.log('User signed out successfully', user);
                                  GoogleSignin.signOut()
                                  .then(() => {
                                      console.log('google out');
                                  });
                                  AsyncStorage.clear();
                                  Actions.auth({ type: 'reset' });
                                })
                                .catch();
                            }}
                            key='events'
                            component={EventsMain}
                            title='Events'
                            titleStyle={textStyle}
                            initial
                        />
                        <Scene
                            rightTitle='+'
                            onRight={() => {}}
                            key='gifts'
                            component={EventItems}
                            title='Gifts'
                            titleStyle={textStyle}

                        />
                        <Scene
                            key='addItemScene'
                            title='Add a gift'
                            titleStyle={textStyle}
                            component={AddItemMain}
                        />
                        <Scene
                            key='editItemScene'
                            title='Edit Item'
                            titleStyle={textStyle}
                            component={EditItemMain}
                        />
                        <Scene
                            key='sendItemScene'
                            title='Send Thanks!'
                            titleStyle={textStyle}
                            component={SendItemMain}
                        />
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
                            titleStyle={textStyle}
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
