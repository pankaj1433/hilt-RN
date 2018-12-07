import React, {Component} from 'react';
import NavigationContainer from '../common/navigationContainer'

class AgendaNavigation extends Component {
    render(){
        const data = [
                        {name: 'Train The Trainer',nav:'PreKickOff'},
                        {name: 'Day 1',nav:'AgendaDay1',day:'19 Jul 18'},
                        {name: 'Day 2',nav:'AgendaDay1',day:'20 Jul 18'},
                        {name: 'Day 3',nav:'AgendaDay1',day:'21 Jul 18'},
                    ]
        return(            
            <NavigationContainer navigation={this.props.navigation}
                     navData={data}/>                   
                
        );
    }
}

export default AgendaNavigation;