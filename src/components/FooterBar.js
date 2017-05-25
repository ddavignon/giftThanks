import React, { Component } from 'react';
import { Container, Footer, Button, Icon } from 'native-base';
import { View } from 'react-native';

class FooterBar extends Component {
    render() {
        return (
            <Container>
                <Footer>
                    <Button>
                        <Icon size={30} color={'#fff'} name={'ion-pricetags'} />
                    </Button>
                    <Button>
                        <Icon size={30} color={'#fff'} name={'ion-person-stalker'} />
                    </Button>
                    <Button>
                        <Icon size={30} color={'#fff'} name={'ion-social-usd'} />
                    </Button>
                </Footer>
            </Container>
        );
    }
}

export default FooterBar;
