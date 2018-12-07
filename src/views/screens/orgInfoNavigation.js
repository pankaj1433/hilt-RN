import React, {Component} from 'react';
import NavigationContainer from '../common/navigationContainer'

class OrgInfoNavigation extends Component {
    render(){
        const data = [
                        {name: 'Org Info',nav:'OrgInfo'},
                        {name: "Do's & Don't's",nav:'DosDonts'},
                        {name: 'FAQs',nav:'Faqs'}
                    ]
        return(            
            <NavigationContainer navigation={this.props.navigation}
                     navData={data}/>                   
                
        );
    }
}

export default OrgInfoNavigation;