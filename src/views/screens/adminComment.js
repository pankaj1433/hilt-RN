import React, {Component} from 'react';
import NavigationContainer from '../common/navigationContainer'

class AdminComment extends Component {

    render(){
            const data = [
                {name: 'POST COMMENTS',nav:'Comments'},
                {name: 'APPROVE COMMENTS',nav:'ApproveComments'}
            ];
            return(
                <NavigationContainer navigation={this.props.navigation}
                                     navData={data}/>

            );
    }
}

export default AdminComment


