import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import PageHeaderCross from '../common/pageHeaderCross'
import { Font } from 'expo'

class VenueNavigation extends Component {
    constructor(){
        super();

        this.state = {
            fontLoaded:false
        }
    }

    async componentWillMount(){
        await Font.loadAsync({
            'hilti-bold': require('../../assets/fonts/Hilti-Bold.ttf'),
            'hilti-roman': require('../../assets/fonts/Hilti-Roman.ttf'),
        });
        this.setState({
            fontLoaded:true
        })
    }

    render(){
        return(
            <View style={styles.container}>
                {this.state.fontLoaded?
                    <View style={{flex:1}}>
                        <View style={{height:50}}>
                            <PageHeaderCross props={this.props}/>
                        </View>

                        <View style={styles.navigation}>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    height: 64.5,

                                }}
                                onPress={()=>this.props.navigation.navigate('VenueRoadMap',{})}>
                                <Text style={{color:'#dd2127',
                                    fontSize:16,
                                    height:20.5,
                                    marginTop:20.5,
                                    marginLeft:19,
                                    fontFamily:'hilti-roman'}}>Venue Road Map</Text>

                                <Image
                                    style={{marginTop:28,marginLeft:4.5}}
                                    source={require('../../assets/images/arrow_icon/arrow_mdpi.png')}
                                />
                            </TouchableOpacity>

                            <View style={{width:335,height:0.5,marginLeft:12,backgroundColor:'#000000',opacity:0.2}}/>

                            <TouchableOpacity
                                style={{
                                    height:63.5,

                                    flexDirection:'row'
                                }}
                                onPress={()=>this.props.navigation.navigate('Venue',{})}>
                                <Text style={{color:'#dd2127',
                                    fontSize:16,
                                    height:20.5,
                                    marginTop:21.5,
                                    marginLeft:19,
                                    fontFamily:'hilti-roman'}}>Navigation To Hotel</Text>
                                <Image
                                    style={{marginTop:27,marginLeft:4.5,width:8,height:12}}
                                    source={require('../../assets/images/arrow_icon/arrow_mdpi.png')}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>:null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 22,
        flex: 1,
        backgroundColor:'white'
    },
    horizontalLine: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        width:320,
        marginLeft:10,
        marginTop:10
    },
    navigation:{
        height:134,

        backgroundColor:'#dfd6c9'
    },
    navigationOption:{
        flexDirection:'row',
        height:64.5
    },
    links:{
        color:'red',
        fontSize:17,
        marginTop:27.5,
        marginLeft:19,
        fontWeight:'bold'
    },
    icons:{
        marginTop:24,
        marginLeft:10
    }
});

export default VenueNavigation;