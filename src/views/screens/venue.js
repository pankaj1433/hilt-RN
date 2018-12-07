import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Linking, TouchableOpacity, Platform } from 'react-native';
import { Font } from 'expo'
import Icon  from 'react-native-vector-icons/MaterialIcons'
import PageHeaderNotif from '../common/pageHeaderNotif'


class Venue extends Component {
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

    openExternalApp(url) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            }
        });
    }

    findViaGMap = () => {
        if(Platform.OS === 'android'){
            var url = 'geo:' + '28.5582,77.0629'+'?q=Vivanta, By Taj, Dwarka, label=L';
        }
        else if(Platform.OS === 'ios'){
            var url = 'http://maps.apple.com/?ll=28.5582,77.0629&q=Vivanta, By Taj, Dwarka';
        }
        
        this.openExternalApp(url);
    }

    callNumber = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            }
        });
    };

    render(){
        return(
            <View style={styles.container}>
                {this.state.fontLoaded?
                    <View style={{flex:1}}>
                        <PageHeaderNotif props={this.props} parentPage='VENUE' navigation={this.props.navigation}/>

                        <View style={{height:184.5}}>
                            <Image
                                style={{flex:1,position:'relative', height:null,width:null}}
                                source={require('../../assets/images/venueMainImg/banner_img_mdpi.jpg')}
                                resizeMode={'stretch'}
                            />

                            <Text style={{position:'absolute',marginLeft:19,marginTop:32,width:155,fontSize:14,fontFamily:'hilti-roman',color:'#dd2127', backgroundColor:'transparent'}}>
                                Vivanta By Taj, Dwarka
                            </Text>
                        </View>

                        <Text style={{marginLeft:18.5,marginTop:14,width:235,fontSize:12,fontFamily:'hilti-bold',color:'#7c294e'}}>
                            Sector 21 Metro Station, Dwarka, New Delhi 110075
                        </Text>


                        {/* <View style={{flexDirection:'row'}}>
                            <Text style={{marginLeft:18.5,marginTop:12,fontSize:12,fontFamily:'hilti-bold',color:'blue'}}>
                                T: </Text>
                            <TouchableOpacity style={{marginTop:12,justifyContent:'center',alignItems:'center'}}>
                                <Text
                                    onPress={()=>{this.callNumber('tel:01171721234')}}
                                    style={{fontSize:12,fontFamily:'hilti-bold',color:'blue',textDecorationLine:'underline'}}>
                                    011 71721234
                                </Text>
                            </TouchableOpacity>
                        </View> */}

                        <Text style={{marginLeft:18.5,marginTop:15,fontSize:10,fontFamily:'hilti-bold',color:'#000000'}}>
                            From Airport: 20 to 30 mins
                        </Text>

                        <Text style={{marginLeft:18.5,marginTop:8.5,fontSize:10,fontFamily:'hilti-bold',color:'#000000'}}>
                            From Delhi Railway Station: 1 hour
                        </Text>

                        <View style={{alignItems:'center'}}>
                            <TouchableHighlight style={{marginTop:33.5,height:28.5,width:194.5,borderWidth:1,borderColor:'#dd2127',alignItems:'center',justifyContent:'center'}} onPress= { () => {this.findViaGMap()}}>
                                <View style={{flexDirection:'row'}}>
                                    <Icon
                                        style={{color:'#dd2127'}}
                                        name='location-on'
                                        size={15}
                                    />
                                    <Text style={{marginLeft:7.5,fontSize:12,fontFamily:'hilti-roman',color:'#dd2127'}}>
                                        FIND ON GOOGLE MAP
                                    </Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight style={{marginTop:25.5,height:28.5,width:194.5,borderWidth:1,borderColor:'#dd2127',alignItems:'center',justifyContent:'center'}} onPress= { () => {this.props.navigation.navigate('VenueLayout')}}>
                                <Text style={{fontSize:12,fontFamily:'hilti-roman',color:'#dd2127'}}>
                                    VIEW VENUE LAYOUT
                                </Text>
                            </TouchableHighlight>
                        </View>

                    </View>:null
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f3ee'
    },
})

export default Venue;