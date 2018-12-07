import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity , Text } from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome'

class BackTravel extends Component {
    render(){
        return(
            <TouchableOpacity style={styles.container} onPress={()=>this.props.props.navigation.goBack()}>
                <Icon
                    style={styles.icons}
                    name="angle-left"
                    size={20}
                />
                <Text style={styles.text}>Back {this.props.parentPage? ('/' + this.props.parentPage): null}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:10,
        flexDirection:'row',
        backgroundColor:'white'
    },
    icons:{
        marginLeft:15,
        marginTop: -2,
    },
    text:{
        marginLeft:10
    }
});

export default BackTravel;