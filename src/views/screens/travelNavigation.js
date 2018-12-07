import React, {Component} from 'react';
import NavigationContainer from '../common/navigationContainer'

class TravelNavigation extends Component {
    render(){
        const data = [
                    {name: 'MY ARRIVAL',nav:'MyArrivals'},
                    {name: 'MY DEPARTURE',nav:'MyDeparture'},
                    {name: 'TRAVEL OVERVIEW',nav:'TravelOverview'},
                    ]
        return(            
            <NavigationContainer navigation={this.props.navigation}
                     navData={data}/>                   
                
        );
    }
}

export default TravelNavigation;