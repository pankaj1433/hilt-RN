import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image ,FlatList, Platform} from 'react-native';
import Icon  from 'react-native-vector-icons/EvilIcons'
import PageHeaderNotif from '../common/pageHeaderNotif'
import BackTravel from './backTravel'
import { Font } from 'expo'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAgendaData,postEvent } from '../../actions/apiData';

const month=["Jan","Feb","March","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"];

class AgendaDay extends Component{
    constructor(){
        super();

        this.state = {
            fontLoaded:false,
            detailsLoaded:false
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
        const { getAgendaData } = this.props;
        let detail = {};
        if(this.props.userDetail){
            detail = this.props.userDetail;
        }

        if(typeof this.props.userDetail === "string"){
            detail = JSON.parse(this.props.userDetail)
        }
        let empLoginInfo = {
            email: detail.EmailId,
            password: detail.Code
        };
        console.log('request for fetching user details....');
        const {postEvent} = this.props;
        postEvent({payload: empLoginInfo});
        console.log('changed details',this.props.userDetail);
        let date = this.props.navigation.state.params.day;
        let grpName;
        if(date === '19 Jul 18'){
            grpName = detail.Jul19GroupA;
            getAgendaData({param:grpName,day:date});
            this.setState({
                detailsLoaded:true
            })
        }
        else if(date === '20 Jul 18'){
            grpName = detail.Jul20GroupA;
            getAgendaData({param:grpName,day:date});
            this.setState({
                detailsLoaded:true
            })
        }
        else{
            grpName = detail.Jul21GroupA;
            getAgendaData({param:grpName,day:date});
            this.setState({
                detailsLoaded:true
            })
        }
    }

    render(){
        console.log('agenda-------------->>>>',this.props.agendaList);
        let date = this.props.navigation.state.params.day;
        let day;
        if(date === '19 Jul 18'){
            day = 'Day 1'
        }
        else if(date === '20 Jul 18'){
            day = 'Day 2'
        }
        else{
            day = 'Day 3'
        }

        let flagMarginTop=0;

        let empAgenda = {
                header: {
                    Date: null,
                    ParticipantsGroups: null,
                    DressCode: null,
                    GroupCoordinator: null
                },
                body: []
            };

        if(this.state.detailsLoaded && this.props.agendaList && Object.keys(this.props.agendaList).length){
            empAgenda = this.props.agendaList;
            if(empAgenda.header){
                if((!empAgenda.header.ParticipantsGroups || !empAgenda.header.ParticipantsGroup) && !empAgenda.header.DressCode && (!empAgenda.header.GroupCoordinator || !empAgenda.header.Groupcoordinator)){
                    flagMarginTop=20;
                }
            }
        }
        let currentDateStr = date.split(' ');
        let currentDate = currentDateStr[0];
        let currentMonth = currentDateStr[1];
        let venueCount = 0,presenterCount = 0;

        return(
            <View style={styles.container}>
                {
                    this.state.fontLoaded?
                        <View style={{flex:1}}>
                            <PageHeaderNotif props={this.props} parentPage={day} navigation={this.props.navigation}/>
                             <ScrollView>
                                 <View style={{height:179.5}}>
                                     <Image
                                         style={{flex:1, width:null, height:null}}
                                         source={require('../../assets/images/agendaMainImg/agendaMainImg_mdpi.jpg')}
                                         resizeMode={'cover'}
                                     />

                                     <Text
                                         style={{position:'absolute',
                                             marginTop:20.5,
                                             marginLeft:18.5,
                                             width:133.5,
                                             fontSize:14,
                                             color:'#dd2127',
                                             backgroundColor:'transparent',
                                             fontFamily:'hilti-roman'}}>
                                         WAVE 2</Text>

                                     <View style={{position:'absolute',height:70,width:70,backgroundColor:'#dd2127',top:130.5,left:15,justifyContent:'center',alignItems:'center',zIndex:1}}>
                                         <Text style={{flex:2,fontSize:38.5,fontFamily:'hilti-roman',color:'#ffffff'}}>{currentDate}</Text>
                                         <Text style={{flex:1,fontSize:15,fontFamily:'hilti-roman',color:'#ffffff'}}>{currentMonth}</Text>
                                     </View>

                                 </View>

                                 <View style={{backgroundColor:'#ffffff',paddingLeft:100,zIndex:(Platform.OS === 'ios'? -1 : 0)}}>
                                     {((empAgenda.header && empAgenda.header.ParticipantsGroups)||(empAgenda.header && empAgenda.header.ParticipantsGroup))?
                                         <Text style={{marginTop:7,fontSize:12,fontFamily:'hilti-bold',color:'#7c294e'}}>
                                             Participants Groups: {empAgenda.header.ParticipantsGroups||empAgenda.header.ParticipantsGroup||'Data not available'}
                                         </Text>:
                                         null
                                     }

                                     {(empAgenda.header && empAgenda.header.DressCode)?
                                         <Text style={{marginTop:7,fontSize:12,fontFamily:'hilti-bold',color:'#7c294e',paddingBottom:7}}>
                                             Dress Code: {empAgenda.header.DressCode||'Data not available'}
                                         </Text>:
                                         null
                                     }

                                     {((empAgenda.header && empAgenda.header.GroupCoordinator)||(empAgenda.header && empAgenda.header.Groupcoordinator))?
                                         <Text style={{fontSize:12,fontFamily:'hilti-bold',color:'#7c294e',paddingBottom:7}}>
                                             Group Coordinator: {empAgenda.header.GroupCoordinator||empAgenda.header.Groupcoordinator||'Data not available'}
                                         </Text>:
                                         null
                                     }

                                 </View>

                                 {empAgenda.body && empAgenda.body.map((empAgenda)=>{
                                     if(empAgenda.Venue){
                                         venueCount++;
                                     }
                                     if(empAgenda.Presenter){
                                         presenterCount++;
                                     }
                                 })}


                                 {(empAgenda.body && empAgenda.body.length)?
                                     ((empAgenda.body[0].AgendaItem || empAgenda.body[0].Agendaitem)?
                                             (
                                                 (presenterCount>0)?
                                                     <View style={{marginBottom:10,marginTop:flagMarginTop}}>
                                                         <View style={{backgroundColor:'#ffffff',flexDirection:'row',marginLeft:5,marginRight:5,marginTop:10}}>
                                                             <Text style={{flex:3.95,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>Agenda</Text>
                                                             <Text style={{flex:2.5,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>Presenter</Text>
                                                             {(venueCount > 0)?
                                                                 <Text style={{flex:1.7,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>Venue</Text>
                                                                 :null
                                                             }
                                                             <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>Dur</Text>
                                                             <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>From</Text>
                                                             <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>To</Text>
                                                         </View>

                                                         <FlatList
                                                             data={empAgenda.body}
                                                             keyExtractor = {(item,index) => index}
                                                             renderItem = {({item}) => (
                                                                 <View>
                                                                     <View style={{backgroundColor:'#ffffff',flexDirection:'row',marginLeft:5,marginRight:5}}>
                                                                         <Text style={{flex:3.95,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.AgendaItem||item.Agendaitem}</Text>
                                                                         <Text style={{flex:2.5,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.Presenter||'-'}</Text>
                                                                         {(venueCount > 0)?
                                                                             <Text style={{flex:1.7,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.Venue||'-'}</Text>
                                                                             :null
                                                                         }
                                                                         <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.Dur||'-'}</Text>
                                                                         <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.From||'-'}</Text>
                                                                         <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.To||'-'}</Text>
                                                                     </View>
                                                                 </View>
                                                             )}
                                                         >
                                                         </FlatList>
                                                     </View>
                                                     :<View style={{marginBottom:10}}>
                                                         <View style={{backgroundColor:'#ffffff',flexDirection:'row',marginLeft:5,marginRight:5,marginTop:10}}>
                                                             <Text style={{flex:3.95,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>Agenda</Text>
                                                             <Text style={{flex:2.5,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>Trainer</Text>
                                                             {(venueCount > 0)?
                                                                 <Text style={{flex:1.7,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>Venue</Text>
                                                                 :null
                                                             }
                                                             <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>Dur</Text>
                                                             <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>From</Text>
                                                             <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>To</Text>
                                                         </View>

                                                         <FlatList
                                                             data={empAgenda.body}
                                                             keyExtractor = {(item,index) => index}
                                                             renderItem = {({item}) => (
                                                                 <View>
                                                                     <View style={{backgroundColor:'#ffffff',flexDirection:'row',marginLeft:5,marginRight:5}}>
                                                                         <Text style={{flex:3.95,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.AgendaItem||item.Agendaitem}</Text>
                                                                         <Text style={{flex:2.5,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.Trainer||'-'}</Text>
                                                                         {(venueCount > 0)?
                                                                             <Text style={{flex:1.7,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.Venue||'-'}</Text>
                                                                             :null
                                                                         }
                                                                         <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.Dur||'-'}</Text>
                                                                         <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.From||'-'}</Text>
                                                                         <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.To||'-'}</Text>
                                                                     </View>
                                                                 </View>
                                                             )}
                                                         >
                                                         </FlatList>
                                                     </View>
                                             )
                                             :<View style={{marginBottom:10}}>
                                                 <View style={{backgroundColor:'#ffffff',flexDirection:'row',marginLeft:5,marginRight:5,marginTop:10}}>
                                                     <Text style={{flex:3.95,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>Group Visiting</Text>
                                                     <Text style={{flex:2.5,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>Group Leader</Text>
                                                     {(venueCount > 0)?
                                                         <Text style={{flex:1.7,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>Venue</Text>
                                                         :null
                                                     }
                                                     <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>Dur</Text>
                                                     <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>From</Text>
                                                     <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-bold',fontSize:12}}>To</Text>
                                                 </View>

                                                 <FlatList
                                                     data={empAgenda.body}
                                                     keyExtractor = {(item,index) => index}
                                                     renderItem = {({item}) => (
                                                         <View>
                                                             <View style={{backgroundColor:'#ffffff',flexDirection:'row',marginLeft:5,marginRight:5}}>
                                                                 <Text style={{flex:3.95,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.GroupVisiting}</Text>
                                                                 <Text style={{flex:2.5,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.GroupLeaders||item.GroupLeader||'-'}</Text>
                                                                 {(venueCount > 0)?
                                                                     <Text style={{flex:1.7,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.Venue||'-'}</Text>
                                                                     :null
                                                                 }
                                                                 <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.Dur||'-'}</Text>
                                                                 <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.From||'-'}</Text>
                                                                 <Text style={{flex:1.25,padding:5,borderWidth:1,borderColor:'lightgrey',fontFamily:'hilti-roman',fontSize:10}}>{item.To||'-'}</Text>
                                                             </View>
                                                         </View>
                                                     )}
                                                 >
                                                 </FlatList>
                                             </View>

                                     ):
                                     <View style={{justifyContent:'center',alignItems:'center'}}>
                                         <Text style={{fontSize:12,fontFamily:'hilti-bold',color:'#dd2127',padding:10}}>Not Applicable.</Text>
                                     </View>
                                 }
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
        backgroundColor:'#f5f3ee'
    },
    agendaMainImg: {
        flex:1,
        resizeMode:'stretch'
    }
})

function mapStateToProps (state) {
    return {
        agendaList: state.event.agendaList,
        eventLoginList: state.event.eventLoginList,
        userDetail:state.event.userDetail,
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators({
                getAgendaData,
                postEvent
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaDay)