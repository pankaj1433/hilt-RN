import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import PageHeaderCross from '../common/pageHeaderCross'
import { Font } from 'expo'
import Icon  from 'react-native-vector-icons/Entypo'
import { connect } from 'react-redux'

class NavigationContainer extends Component {
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

    sendMail = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            }
        });
    }

    render(){
        const mailId = 'TeamAnnualKickOff.IN@hilti.com';
        return(
            <View style={styles.container}>
                {this.state.fontLoaded?
                    <View style={{flex:1}}>
                        <View style={{height:50}}>
                            <PageHeaderCross props={this.props}/>
                        </View>

                        <View style={styles.navigation}>
                            {this.props.navData.map((link,index) => {
                                return (
                                    <View style={{height:65}} key={index}>
                                        {
                                            link.name === "I would like to share"?
                                                <TouchableOpacity
                                                    style={{
                                                        flexDirection: 'row',
                                                        height: 64.5,

                                                    }}
                                                    onPress={()=>this.sendMail(`mailto:${mailId}?subject= Kick off 2018 - ${link.name} - ${JSON.parse( this.props.userDetail).Name}`)}>
                                                    <Text style={{color:'#dd2127',
                                                        fontSize:16,
                                                        height:20.5,
                                                        marginTop:20.5,
                                                        marginLeft:19,
                                                        fontFamily:'hilti-roman'}}>{link.name}</Text>
                                                    <Icon
                                                        style={{color:'#7c294e',marginTop:22,marginLeft:1.5}}
                                                        name='chevron-right'
                                                        size={20}
                                                        onPress={() => {}} />
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity
                                                    style={{
                                                        flexDirection: 'row',
                                                        height: 64.5,

                                                    }}
                                                    onPress={()=>this.props.navigation.navigate(link.nav,{day:link.day||''})}>
                                                    <Text style={{color:'#dd2127',
                                                        fontSize:16,
                                                        height:20.5,
                                                        marginTop:20.5,
                                                        marginLeft:19,
                                                        fontFamily:'hilti-roman'}}>{link.name}</Text>
                                                    <Icon
                                                        style={{color:'#7c294e',marginTop:22,marginLeft:1.5}}
                                                        name='chevron-right'
                                                        size={20}
                                                        onPress={() => {}} />
                                                </TouchableOpacity>

                                        }
                                        <View style={{marginRight:12,height:0.5,marginLeft:12,backgroundColor:'#000000',opacity:0.2}}/>

                                    </View>
                                )
                            })}

                        </View>
                    </View>:null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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

function mapStateToProps (state) {
    return {
        userDetail:state.event.userDetail
    }
}

export default connect(mapStateToProps, null)(NavigationContainer)
