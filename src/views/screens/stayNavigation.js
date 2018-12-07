import React, {Component} from 'react';
import NavigationContainer from '../common/navigationContainer'

class StayNavigation extends Component {
    render(){
        const data = [
                        {name: 'Submit Your ID',nav:'SubmitId'},
                        {name: 'My Stay',nav:'MyStay'},
                        {name: 'Stay Overview',nav:'StayOverview'},
                    ]
        return(            
            <NavigationContainer navigation={this.props.navigation}
                     navData={data}/>                   
                
        );
    }
}

export default StayNavigation;