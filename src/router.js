import React from 'react';
import { Text } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
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
                    <Scene key="contactsScene" title="Contacts" icon={TabIcon}>
                        <Scene
                            key="contacts"
                            component={ContactsMain}
                            title="Contacts"
                        />
                    </Scene>
                {/* Tab and it's scenes */}
                    <Scene key="eventsScene" title="Events" icon={TabIcon}>
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
                {/* Tab and it's scenes
                    <Scene key='giftScene' title="Gifts" icon={TabIcon}>
                        <Scene
                            rightTitle='+'
                            onRight={() => {}}
                            key='gifts'
                            component={EventItems}
                            title='Gifts'
                            initial
                        />
                        <Scene key='addItemScene' component={AddItemMain} />
                    </Scene>*/}
                {/* Tab and it's scenes */}
                    <Scene key='tokensScene' title="Tokens" icon={TabIcon}>
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

// const RouterComponent = () => {
//     return (
//
//         <Router sceneStyle={{ paddingTop: 65 }}>
//
//             <Scene key='modal' >
//                 <Scene
//                     rightTitle='+'
//                     onRight={() => {}}
//                     key='events'
//                     component={EventsMain}
//                     title='Events'
//                      type="reset"
//                     initial
//                 />
//                 <Scene key='addEventModal' component={AddEventModal} />
//             </Scene>
//             <Scene key='giftScene' >
//                 <Scene
//                     rightTitle='+'
//                     onRight={() => {}}
//                     key='gifts'
//                     component={EventItems}
//                     title='Gifts'
//                     type="reset"
//                     initial
//                 />
//                 <Scene key='addItemScene' component={AddItemMain} />
//             </Scene>
//             <Scene key='tokensScene' >
//                 <Scene
//                     key='tokens'
//                     component={TokensMain}
//                     title='Tokens'
//                     initial
//                 />
//             </Scene>
//
//         </Router>
//     );
// };
//
// export default RouterComponent;
