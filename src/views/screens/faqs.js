import React, {Component} from 'react';
import { StyleSheet, View, Text,ScrollView } from 'react-native';
import PageHeaderNotif from '../common/pageHeaderNotif'
import Icon  from 'react-native-vector-icons/FontAwesome'
import { Font } from 'expo'

export default class DosDonts extends Component {
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

    render() {
        return (
            <View style={styles.container}>
                {this.state.fontLoaded ?
                    <View style={{flex:1}}>
                        <PageHeaderNotif props={this.props} parentPage={`FAQs`} navigation={this.props.navigation}/>
                        <View style={{backgroundColor:'#f5f3ee'}}>
                            <Text style={{fontFamily:'hilti-roman',fontSize:10,color:'#dd2127',marginTop:16.5,marginLeft:19}}>FAQ HILTI INDIA - KICK OFF 2018</Text>
                            <View style={{backgroundColor:'#ffffff',marginTop:16}}>
                                <ScrollView contentContainerStyle={{paddingBottom:140}}>
                                    <View style={{flex:1,justifyContent:'center', alignItems:'flex-start'}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginLeft:10,marginTop:21.5,marginRight:20}}>When will be my check-in at the Hotel?</Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,marginRight:30}}>
                                            Check-in for outstationed team members will be done as per their Check-in Time.
                                            Stay for Delhi/NCR Team members is not included and they have to report as per the agenda.
                                        </Text>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:5,marginRight:30}}>
                                            All the team members are suggested to come wearing Hilti Red Shirt & T-Shirt as the checkin might be late.
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:60}}>I want to make some changes in my Travel Plan, whom to contact?</Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,marginRight:20}}>
                                            Now, there is no such provision of any change in the travel plan. Should you have any personal plan, please make your own travel arrangements.
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:60}}>I want to request change in my room sharing, whom to contact?</Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,marginRight:20,marginBottom:20}}>
                                            There is no such provision of any change in the Room Sharing.
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:60}}>
                                                I or my Team member has change in the location due to recent announcement and
                                                consequently the location from/to should be changed as per new profile but it
                                                is not reflecting in the existing list?
                                            </Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginRight:40,marginTop:18,paddingBottom:20}}>
                                            No changes are possible now, be it travel or stay and the reloction will be effective post Wave 2 2018
                                            (as shared by HR/your respective Team Leader/EMT)
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:60}}>
                                                What are the Venues for Breakfast/Lunch/Dinner during your stay at Leela Convention Hotel East Delhi?
                                            </Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,marginRight:40,paddingBottom:20}}>
                                            You will get the details in the WELCOME LETTER provided by the hotel. Please read it carefully as it
                                            will answer several other queries as well.
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:30}}>
                                                Will I get free Wifi connectivity at the Hotel?
                                            </Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,marginRight:30,paddingBottom:20}}>
                                            Yes. You will get the the username and password details at the time of check-in. if not shared by the
                                            hotel team, then ask for it.
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:60}}>
                                                I am a Delhi/NCR Team member, how do I reach the Hotel?
                                            </Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,marginRight:30,paddingBottom:20}}>
                                            Since, the venue for the Wave 2 2018 is NCR/Gurgaon, therefore, please plan to come on your own.
                                            You may pool car with the Hilti TMs who have got Hilti Cars. The list has already been shared. For any further
                                            enquiry, please contact your respective EMT.
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:60}}>
                                                How do find my meeting room for meetings during Wave 2?
                                            </Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,paddingBottom:20}}>
                                            Please refer your respective Agends.
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:60}}>
                                                I do not have a smart phone, how do i see Wave 2 2018 details?
                                            </Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,paddingBottom:20}}>
                                            Request you to kindly use your fellow member‘s/ Team Leader‘s phone to check your details.
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:60}}>
                                                I do not know my Employee Code as it is needed to log-in for the App, whom to contact?
                                            </Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,paddingBottom:20}}>
                                            Please get in touch with HR for help.
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:60}}>
                                                Why it is important to send the scanned copy of Identity Card (Voter ID/Driving License/Passport).
                                            </Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,marginRight:40,paddingBottom:20}}>
                                            It will help us provide you express check-in and save the hassle of queuing for long and consequently
                                            come on time for the Wave 2. Please do not email the ID cards as we will not consider this.
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:60}}>
                                                What if I dont have a smart Phone then how to upload my Identity Card (Voter id/Driving License).
                                            </Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,marginRight:40,paddingBottom:20}}>
                                            Please ask your team mate/Team Leader to log-in through your ID and submit the Identity Card.
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:30}}>
                                                What if I need assistance?
                                            </Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,marginRight:40,paddingBottom:20}}>
                                            Please click on "Need assistance" segment in the App and it will reach to the relevant team member for
                                            necessary action and we will come back to you with the solution or TMs who dont have smart phone, please
                                            send us email on HiltiIndiaEvents@hilti.com and we shall get back to to as soon as possible.
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:60}}>
                                                My team member is not going to attend Kick off 2018 and I have come to know just now, whom to inform?
                                            </Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,marginRight:40,paddingBottom:20}}>
                                            Please send the information through the App or on the email id
                                            HiltiIndiaEvents@hilti.com latest by 30 Dec.
                                        </Text>

                                        <View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:60}}>
                                                My Kick off App is not working, whom to contact?
                                            </Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,marginRight:40,paddingBottom:20}}>
                                            Please send email to the HiltiIndiaEvents@hilti.com or call the Emergency Contact in IT. We
                                            encourage you to send the email or connect over the skype rather than call so that Kick off Project Team could
                                            attend more queries efficiently. We also promise you that you will get response within 4 hours of sending the
                                            email.
                                        </Text>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:5,paddingBottom:20}}>
                                            Wherever, it is too critical, then only make a call.
                                        </Text>

                                        {/*<View style={{flexDirection:'row'}}>
                                            <Icon
                                                style={{color:'#000000',marginLeft:19.5,marginTop:25}}
                                                name='circle'
                                                size={10}
                                            />
                                            <Text style={{color:'#000000',fontFamily:'hilti-bold',fontSize:12,marginTop:21.5,marginLeft:10,marginRight:30}}>
                                                I have some more questions, whom to ask?
                                            </Text>
                                        </View>
                                        <Text style={{fontSize:12,fontFamily:'hilti-roman',marginLeft:29.5,marginTop:18,marginRight:40,paddingBottom:20}}>
                                            Please post your question through this link "I want to know" and we will be more than happy to respond
                                            to you and add the same in this FAQ in the next update on 2 Jan for the benefit of others.
                                        </Text>*/}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View> :null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f3ee'
    },
})


