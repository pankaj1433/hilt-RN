import React, {Component} from 'react';
import NavigationContainer from '../common/navigationContainer'

class assistanceNavigation extends Component {
    render() {
        return (
                    <NavigationContainer navigation={this.props.navigation}
                     navData={[
                         {name: 'TRAVEL RELATED',nav:'TravelAssistance'},
                         {name: 'HOTEL RELATED',nav:'HotelAssistance'},
                         {name: 'EMERGENCY CONTACT NO.',nav:'EmergencyContact'}
                         ]}/>

        )
    }
}


export default assistanceNavigation;