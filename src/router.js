import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import EventsMain from './screens/EventsMain';
import AddEventModal from './components/AddEventModal';
import AddItemMain from './screens/AddItemMain';
import EventItems from './screens/EventItems';


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
                    initial
                />
                <Scene key='addEventModal' component={AddEventModal} />
            </Scene>
            <Scene key='itemsScene' >
                <Scene
                    rightTitle='+'
                    onRight={() => {}}
                    key='gifts'
                    component={EventItems}
                    title='Gifts'
                    initial
                />
                <Scene key='addItemScene' component={AddItemMain} />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
// class Router extends Component {
// <Scene key='singleEvent' component={EmployeeEdit} title='Edit Employee' />
// <Scene key='addItemForm' component={AddItemForm} title='Add Item' />
//
//     renderPage() {
//         console.log(this.props.pageIndex);
//         switch (this.props.pageIndex) {
//             case 0:
//                 return <ContactsMain />;
//             case 1:
//                 return <EventsMain />;
//             case 2:
//                 return <TokensMain />;
//             case 3:
//                 return <AddItemMain />;
//             default:
//                 return <View><Text>Uh Oh! Something went wrong!</Text></View>;
//         }
//     }
//
//     render() {
//         return (
//             <View style={{ flex: 1, flexDirection: 'column' }}>
//                 <Header headerText="My Gifts" />
//                 {this.renderPage()}
//                 <FooterBar style={{ flex: 1 }} />
//             </View>
//         );
//     }
// }
//
// const mapStateToProps = ({ navIndex }) => {
//     const { pageIndex } = navIndex;
//
//     return { pageIndex };
// };
//
// export default connect(mapStateToProps, null)(Router);
