import React, {Component} from 'react';
import { Text, View } from 'react-native';

export default class DetailsContainer extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={{height:67,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                paddingLeft:40,
                paddingRight:17,
            }}>
                <View style={{flex:1}}>
                    <Text style={{fontFamily:'hilti-roman',fontSize:10,color:'#000000',opacity:0.8}}>{this.props.leftHeading}</Text>
                    <Text style={{width:110,fontFamily:'hilti-bold',fontSize:12,color:'#000000'}}>{this.props.leftData}</Text>
                </View>

                <View style={{flex:1}}>
                    <Text style={{fontFamily:'hilti-roman',fontSize:10,color:'#000000',opacity:0.8}}>{this.props.rightHeading}</Text>
                    <Text style={{width:110,fontFamily:'hilti-bold',fontSize:12,color:'#000000'}}>{this.props.rightData}</Text>
                </View>
            </View>
        )
    }
}