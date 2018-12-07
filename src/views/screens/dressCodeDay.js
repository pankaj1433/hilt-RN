import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image } from 'react-native';
import Icon  from 'react-native-vector-icons/EvilIcons'
import PageHeaderNotif from '../common/pageHeaderNotif'
import BackTravel from './backTravel'
import { Font } from 'expo'

class DressCodeDay extends Component {
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
        let dressCodeData = [];
        let currDate = '';
        let day = this.props.navigation.state.params.day;
        if(day === 'DAY 1' ){
            currDate = '19 Jul';
            dressCodeData = [
                {
                    imgUrl:require('../../assets/images/dressImg1/dressImg1_mdpi.jpg'),
                    title:'KICK OFF 2018',
                    subTitle:'Hilti Red Shirt with Dark Trouser + Coat/Jacket'
                },
                {
                    imgUrl:require('../../assets/images/dressImg2/dressImg2_mdpi.jpg'),
                    title:'SERVICE AWARD​ NIGHT',
                    subTitle:'Smart Casuals : Be yourself',
                },
                {
                    imgUrl:require('../../assets/images/dressImg3/dressImg3_mdpi.jpg'),
                    title:'SPECIAL DRESS CODE FOR SERVICE AWARDEES​',
                    subTitle:'Formals : Indian or Western - (Saree/Kurta Pajama or Shirt + Trouser/Skirt) with Blazer(optional)',
                }
            ]
        }
        else if(day === 'DAY 2'){
            currDate = '20 Jul';
            dressCodeData = [
                {
                    imgUrl:require('../../assets/images/dressImg4/dressImg4_mdpi.jpg'),
                    title:'WAVE 2',
                    subTitle:'Red Shirt or T-Shirt with Jeans & Safety Shoes'
                },
                {
                    imgUrl:require('../../assets/images/dressImg5/dressImg5_mdpi.jpg'),
                    title:'TEAM MEETING​',
                    subTitle:'Smart Casuals',
                },
            ]
        }
        else{
            currDate = '21 Jul';
            dressCodeData = [
                {
                    imgUrl:require('../../assets/images/dressImg5/dressImg5_mdpi.jpg'),
                    title:'TEAM MEETING​',
                    subTitle:'Smart Casuals',
                },
            ]
        }
        return(
            <View style={styles.container}>
                {this.state.fontLoaded?
                    <View style={{flex:1}}>
                        <PageHeaderNotif props={this.props} parentPage={day} navigation={this.props.navigation}/>
                        <ScrollView>
                            <View style={{height:133.5}}>
                                <ImageBackground
                                    style={{flex:1}}
                                    source={require('../../assets/images/dressCodeWeatherImg/dressCodeWeather_mdpi.jpg')}
                                >
                                    <View style={{height:62.5,flexDirection:'row'}}>
                                        <View style={{flex:2}}>
                                            <Text style={{marginLeft:20,marginTop:20,fontFamily:'hilti-roman',fontSize:18,color:'#d2051e', backgroundColor:'transparent'}}>Delhi</Text>
                                            <Text style={{marginLeft:20,marginTop:3,fontFamily:'hilti-roman',fontSize:12,color:'#000000', backgroundColor:'transparent'}}>{currDate}</Text>
                                        </View>
                                        <View style={{flex:3, flexDirection: 'row', justifyContent: 'space-around'}}>
                                            <Text style={{marginTop:25,fontSize:30, paddingLeft:10, fontFamily:'hilti-roman',color:'#000000', backgroundColor:'transparent'}}>28-35</Text>
                                        </View>
                                        <View style={{flex:5.5}}>
                                            <Text style={{marginTop:26,fontFamily:'hilti-roman',fontSize:13,color:'#000000', backgroundColor:'transparent'}}>&deg; C</Text>
                                            <Text style={{marginTop:1.5,marginLeft:8.5,fontFamily:'hilti-roman',fontSize:12,color:'#000000', backgroundColor:'transparent'}}>Cold</Text>
                                        </View>
                                    </View>

                                    {/* <Text style={{marginLeft:19,marginTop:12,fontFamily:'hilti-roman',fontSize:14,color:'#7c294e', backgroundColor:'transparent'}}>
                                        Carry warm clothes
                                    </Text> */}
                                </ImageBackground>
                            </View>

                            {dressCodeData.map((item,index) => {
                                return(
                                    <View key={index}>
                                        <Image
                                            style={{marginTop:8,alignSelf:'center',flex:3}}
                                            source={item.imgUrl}
                                        />
                                        <View style={{flex:1,justifyContent:'center',paddingBottom:15}}>
                                            <Text style={{marginLeft:17.5,fontSize:15,fontFamily:'hilti-roman',color:'#dd2127', backgroundColor:'transparent'}}>{item.title}</Text>
                                            <Text style={{marginLeft:19.5,marginRight:19,marginTop:6,fontSize:12,fontFamily:'hilti-bold',color:'#7c294e', backgroundColor:'transparent'}}>{item.subTitle}</Text>
                                            {
                                                item.data?
                                                    <Text style={{marginLeft:19.5,marginTop:4,fontSize:12,fontFamily:'hilti-bold',color:'#000000', backgroundColor:'transparent'}}>{item.data}</Text>
                                                    :null
                                            }
                                        </View>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>:null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    },
    agendaMainImg: {
        flex:1,
        resizeMode:'stretch'
    }
})

export default DressCodeDay;