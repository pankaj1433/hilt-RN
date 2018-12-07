import React, {Component} from 'react';
import { StyleSheet, View, Text,ScrollView } from 'react-native';
import PageHeaderNotif from '../common/pageHeaderNotif'
import { Font } from 'expo'
import Icon  from 'react-native-vector-icons/FontAwesome'

export default class OrgInfo extends Component {
    state = {
        fontLoaded:false
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
                {this.state.fontLoaded ?
                    <View style={{flex:1}}>
                        <PageHeaderNotif props={this.props} parentPage={`ORG. INFO.`} navigation={this.props.navigation}/>
                        <Text style={{marginTop:15,marginLeft:20,fontFamily:'hilti-roman',fontSize:14,color:'#dd2127'}}>Organisational Information</Text>
                        <View style={{marginTop:15,flex:1,backgroundColor:'#ffffff',alignItems:'flex-start',justifyContent:'center'}}>
                            <ScrollView>
                                <View style={{flexDirection:'row'}}>
                                    <Icon
                                        style={{color:'#dd2127',marginLeft:19.5,marginTop:25}}
                                        name='circle'
                                        size={10}
                                    />
                                    <Text style={{color:'#dd2127',fontFamily:'hilti-bold',fontSize:12,marginLeft:10,marginTop:21.5,marginRight:20}}>
                                        REPORT ON TIME AT THE AIRPORT :
                                    </Text>
                                </View>
                                <View style={{marginLeft:30,marginRight:60}}>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:15}}>
                                        Team Members who are planned to take flight booked as group are
                                        suggested to reach at the airport at-least 2 hours prior to the departure of the
                                        flight to avoid any lack of time in check-in. In case, the booked flight is
                                        missed, Hilti India shall not be responsible to book another flight.
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        Pl. do not forget to carry print-out of your tickets/ download your tickets in
                                        your mobile to show at the airport or in railways.
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        Also, carry your govt authorised Identity card (voter id/driving license/ pan
                                        card/ passport etc) with you as it is mandatory to board flight/train.
                                    </Text>
                                    <Text style={{color:'#dd2127',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        Also, please be updated that we shall not be able to accommodate any
                                        changes in the tickets on account of Personal plans/travel, therefore, please
                                        plan your personal travel on your own.
                                    </Text>
                                </View>

                                <View style={{flexDirection:'row'}}>
                                    <Icon
                                        style={{color:'#dd2127',marginLeft:19.5,marginTop:25}}
                                        name='circle'
                                        size={10}
                                    />
                                    <Text style={{color:'#dd2127',fontFamily:'hilti-bold',fontSize:12,marginLeft:10,marginTop:21.5,marginRight:20}}>
                                        STAY ARRANGEMENT BEFORE/AFTER TEAM CONFERENCE :
                                    </Text>
                                </View>
                                <View style={{marginLeft:30,marginRight:60}}>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:15}}>
                                        Team members who are supposed to travel to another location to take connecting
                                        flight/train and need stay enroute, are requested to take care of their
                                        accommodation as per their domestic policy eligibility and get the re-imbusement
                                        from the company for the same.
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        You may seek help from the Travel Desk directly for making travel and stay
                                        arrangement for your via-Journey.
                                    </Text>
                                </View>

                                <View style={{flexDirection:'row'}}>
                                    <Icon
                                        style={{color:'#dd2127',marginLeft:19.5,marginTop:25}}
                                        name='circle'
                                        size={10}
                                    />
                                    <Text style={{color:'#dd2127',fontFamily:'hilti-bold',fontSize:12,marginLeft:10,marginTop:21.5,marginRight:20}}>
                                        Travel from Home to Airport/Station &amp; Viz-a- viz. :
                                    </Text>
                                </View>
                                <View style={{marginLeft:30,marginRight:60}}>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:15}}>
                                        Out-stationed members who are scheduled to take flight/train, can apply for
                                        reimbursement for their travel from home to Airport/Station or from Airport/Station to
                                        Home, as per the domestic policy.
                                    </Text>
                                    <Text style={{color:'#dd2127',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        It is advisable to plan your travel from Home to Airport/Station or Station/Airport to
                                        home in a shared cab, as far as possible, for effective resource utilisation and
                                        saving cost for the company.
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        It is the prime responsibility of the Team Leader to ensure that the grouping has
                                        been done wisely. If a group of team members will be travelling in one cab, then
                                        only one team member is subjected to get the re-imbusement.
                                    </Text>
                                </View>

                                <View style={{flexDirection:'row'}}>
                                    <Icon
                                        style={{color:'#dd2127',marginLeft:19.5,marginTop:25}}
                                        name='circle'
                                        size={10}
                                    />
                                    <Text style={{color:'#dd2127',fontFamily:'hilti-bold',fontSize:12,marginLeft:10,marginTop:21.5,marginRight:50}}>
                                        Emergency Contacts: Kick off 2018 :</Text>
                                </View>
                                <View style={{marginLeft:30,marginRight:60}}>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:15}}>
                                        Please read through the organisational information and FAQ for general
                                        enquiry and avoid calls. However, if you need any support, send it
                                        contacting through the App under “ I need your assistance”
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        If you need any urgent help, you may reach to the following team members
                                        and we would be happy to assist.
                                    </Text>

                                    <Text style={{color:'#dd2127',fontSize:11,fontFamily:'hilti-roman',marginTop:12}}>
                                        For Ticket (Train/Flight) Related Query :
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-bold',marginTop:4}}>
                                        Gurpreet Singh | TravelDesk
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        M: + 918285148204 | E: travel.desk@hilti.com
                                    </Text>

                                    <View style={{height:0.5,backgroundColor:'#000000',marginTop:5}}/>

                                    <Text style={{color:'#dd2127',fontSize:11,fontFamily:'hilti-roman',marginTop:5}}>
                                        For Airport/Railway Station/ Delhi/NCR Shuttles :
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-bold',marginTop:4}}>
                                        Akash Singh Tomar | Sr. Executive - Administration
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        M: +919582381609 | E: Akash.Tomar@hilti.com
                                    </Text>

                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-bold',marginTop:4}}>
                                        Dinesh Prasad | Manager-Administration
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        M: +919711989254 | E: Dinesh.Prasad@hilti.com

                                    </Text>

                                    <View style={{height:0.5,backgroundColor:'#000000',marginTop:5}}/>

                                    <Text style={{color:'#dd2127',fontSize:11,fontFamily:'hilti-roman',marginTop:5}}>
                                        For App Related Query :
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-bold',marginTop:4}}>
                                        Pramod-Kumar Singh | Manager IT
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        M: +919958893301 | E: Pramod Kumar.Singh@hilti.com
                                    </Text>

                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-bold',marginTop:4}}>
                                        Amol Oberoi | Head– Digital Marketing
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        M: +917290075839 | E: Amol.Oberoi@hilti.com
                                    </Text>

                                    <View style={{height:0.5,backgroundColor:'#000000',marginTop:5}}/>

                                    <Text style={{color:'#dd2127',fontSize:11,fontFamily:'hilti-roman',marginTop:5}}>
                                        For Any Other Emergency :
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-bold',marginTop:4}}>
                                        Kamal Khattar | Local Process Expert - Finance
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        M: +918377980753 | E: Kamal.Khattar@hilti.com
                                    </Text>

                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-bold',marginTop:4}}>
                                        Loveleen Arora | Kick off Project Lead
                                    </Text>
                                    <Text style={{color:'#000000',fontSize:11,fontFamily:'hilti-roman',marginTop:4}}>
                                        M: +919811902669 | E: loveleen.arora@hilti.com
                                    </Text>
                                </View>

                            </ScrollView>
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