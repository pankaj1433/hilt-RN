import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon  from 'react-native-vector-icons/FontAwesome'
import MaterialComIcon  from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon  from 'react-native-vector-icons/Feather'

import PageHeaderNotif from '../common/pageHeaderNotif'
import { Font, WebBrowser } from 'expo'
import { getDepartures, getDepartureTicket } from '../../actions/apiData';
import DetailContainer from '../common/detailContainer'

class MyDeparture extends Component {
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

    componentDidMount(){
        const { getDepartures, getDepartureTicket } = this.props;
        let detail = JSON.parse(this.props.userDetail);
        getDepartures({param:detail.Code});
        getDepartureTicket();
    }

    downloadDepTicket = () => {
        if(this.props.departureTicket.url) {
            let userTicketUrl = this.props.departureTicket.url;
            if (userTicketUrl !== '') {
                WebBrowser.openBrowserAsync(userTicketUrl)
                    .then((resp) => {
                        console.log("Finished", resp);
                    })
                    .catch(error => {
                        ToastAndroid.showWithGravity('Download Unsuccessful.', ToastAndroid.SHORT, ToastAndroid.CENTER);
                    });
            }
        }
        else{
            ToastAndroid.showWithGravity('Ticket not available yet.', ToastAndroid.SHORT, ToastAndroid.CENTER);

        }

    }

    render(){
        let details={};
        if(this.props.departureList.length){
            details={...this.props.departureList[0]}
        }
        return(
            <View style={styles.container}>
                {this.state.fontLoaded?
                    <View style={{flex:1}}>
                        <PageHeaderNotif props={this.props} parentPage='MY DEPARTURE' navigation={this.props.navigation}/>
                        <ScrollView>
                            {
                                !details.hasOwnProperty('From') ? <Text style={{alignSelf:'center',color:'#dd2127',fontWeight:'bold',marginTop:7}}>Not Applicable for Delhi/NCR Team Members</Text>:null
                            }
                            <View
                                style={{height:39.5,
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    alignItems:'center',
                                    paddingLeft:17,
                                    paddingRight:6,
                                }}>
                                <View
                                    style={{flex:1,
                                        flexDirection:'row',
                                    }}>
                                    <MaterialComIcon
                                        style={{color:'#dd2127'}}
                                        name='airplane-landing'
                                        size={20}
                                    />
                                    <Text style={{marginLeft:7,marginTop:1,fontSize:12,fontFamily:'hilti-roman',color:'#dd2127'}}>DEPARTURE DETAILS</Text>
                                </View>
                                <TouchableOpacity
                                    style={{flex:1,
                                        flexDirection:'row',
                                        justifyContent:'flex-end'
                                    }}

                                    onPress={() => {this.downloadDepTicket()}}
                                >
                                    <FeatherIcon
                                        style={{color:'#dd2127'}}
                                        name='download'
                                        size={17}
                                    />
                                    <Text style={{marginLeft:5,fontSize:11,fontFamily:'hilti-roman',color:'#dd2127'}}>TICKET DOWNLOAD</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{height:332.5,backgroundColor:'#ffffff'}}>
                                <DetailContainer leftHeading={'From'} rightHeading={'To'} leftData={details.From||'N/A'} rightData={details.To||'N/A'} />

                                <View style={{height:0.5,backgroundColor:'#000000',marginLeft:35,marginRight:35}}/>

                                {(details && details.ModeofJourney === '#N/A' || !details.hasOwnProperty('From'))?
                                    <DetailContainer leftHeading={'Flight/Train No.'} rightHeading={'PNR No.'} leftData={details.FlightTrainNumber||'N/A'} rightData={details.PNRNo||'N/A'} />
                                    :
                                    (details.ModeofJourney === 'Train'||details.ModeofJourney === 'train')?
                                        <DetailContainer leftHeading={'Train No.'} rightHeading={'PNR No.'} leftData={details.FlightTrainNumber||'N/A'} rightData={details.PNRNo||'N/A'} />
                                        :
                                        <DetailContainer leftHeading={'Flight No.'} rightHeading={'PNR No.'} leftData={details.FlightTrainNumber||'N/A'} rightData={details.PNRNo||'N/A'} />

                                }

                                <View style={{height:0.5,backgroundColor:'#000000',marginLeft:35,marginRight:35}}/>

                                <DetailContainer leftHeading={'Dep Date & Time'} rightHeading={'Departure Terminal'} leftData={details.DepartureDate && details.DepartureTime ? `${details.DepartureDate} | ${details.DepartureTime}`:'N/A'} rightData={details.DepartureFromTerminalStation||'N/A'} />

                                <View style={{height:0.5,backgroundColor:'#000000',marginLeft:35,marginRight:35}}/>

                                <DetailContainer leftHeading={'My Champion Name'} rightHeading={'Champion No.'} leftData={details.MyTravelChampionName||'N/A'} rightData={details.MyTravelChampionContactNumber||'N/A'} />

                            </View>

                            <View
                                style={{height:40.5,
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    alignItems:'center',
                                    paddingLeft:17,
                                    paddingRight:6,
                                }}>
                                <View
                                    style={{flex:1,
                                        flexDirection:'row',
                                    }}>
                                    <Icon
                                        style={{color:'#dd2127'}}
                                        name='exchange'
                                        size={17}
                                    />
                                    <Text style={{marginLeft:7,fontSize:11,fontFamily:'hilti-roman',color:'#dd2127'}}>
                                        TRANSFER FROM HOTEL TO AIRPORT/STATION DETAILS
                                    </Text>
                                </View>
                            </View>
                            <View style={{height:235.5,backgroundColor:'#ffffff'}}>

                                <DetailContainer leftHeading={'Pickup Point'} rightHeading={'Cab/Coach No.'} leftData={details.PickUpPoint||'N/A'} rightData={details.CoachCabNo||'N/A'} />

                                <View style={{height:0.5,backgroundColor:'#000000',marginLeft:35,marginRight:35}}/>

                                <DetailContainer leftHeading={'My Champion Name'} rightHeading={'Champion No.'} leftData={details.MyTravelChampionName1||'N/A'} rightData={details.MyTravelChampionContactNumber1||'N/A'} />

                                <View style={{height:0.5,backgroundColor:'#000000',marginLeft:35,marginRight:35}}/>

                                <View style={{height:67,
                                    alignItems:'center',
                                    paddingTop:18,
                                    paddingLeft:40,
                                    paddingRight:40,
                                }}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontFamily:'hilti-roman',fontSize:10,color:'#000000',opacity:0.8}}>Bus/Cab Departure Time</Text>
                                        <Text style={{fontFamily:'hilti-bold',fontSize:12,color:'#000000'}}>{details.BusCabDeparture||'N/A'}</Text>
                                        <Text style={{marginTop:10.5,fontSize:9,fontFamily:'hilti-roman',color:'#000000',opacity:0.8}}>
                                            (The time is indicative and may change as per the arrival schedule of flight)
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>:null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f5f3ee'
    },
    bodyContainer:{
        flex:1,
    },
    header:{
        backgroundColor:'#F5F3EE',
        height:30,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:15,
        paddingRight:15,
        alignItems:'center'
    },
    text:{
        color:'red'
    },
    detail:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5,
        marginBottom:5,
        paddingBottom:7,
        borderBottomColor:'#F5F3EE',
        borderBottomWidth:2
    },
    noBorder:{
        borderBottomWidth:0
    },
    heading:{
        color:'lightgrey'
    },
    icon:{
        marginTop:10
    },
    detailParent:{
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:15
    }
});

function mapStateToProps (state) {
    return {
        departureList: state.event.departureList,
        departureTicket: state.event.departureTicket,
        eventLoginList:state.event.eventLoginList,
        userDetail:state.event.userDetail
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators({
                getDepartures,
                getDepartureTicket
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDeparture)