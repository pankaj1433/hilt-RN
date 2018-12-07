import React, {Component} from 'react';
import NavigationContainer from '../common/navigationContainer'

class DressCodeNavigation extends Component {
    render(){
        const data = [
                        {name: 'DAY 1',nav:'DressCodeDay',day:'DAY 1'},
                        {name: 'DAY 2',nav:'DressCodeDay',day:'DAY 2'},
                        {name: 'DAY 3',nav:'DressCodeDay',day:'DAY 3'},
                    ];
        return(            
            <NavigationContainer navigation={this.props.navigation}
                     navData={data}/>                   
                
        );
    }
}

export default DressCodeNavigation;