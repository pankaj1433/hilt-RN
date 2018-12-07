import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image , TouchableOpacity, FlatList} from 'react-native';
import Icon  from 'react-native-vector-icons/EvilIcons'
import PageHeaderNotif from '../common/pageHeaderNotif'
import BackTravel from './backTravel'
import { Font } from 'expo'
import RadioButton from 'radio-button-react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAgendaData,postEvent } from '../../actions/apiData';

class PreKickOff extends Component{
    constructor(){
        super();

        this.state = {
            fontLoaded:false,
            selectedDate:'17 Jul 18',
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

    componentDidMount() {
        //get api call for 17 Jul.
        const { getAgendaData } = this.props;
        let detail = {};
        if(this.props.userDetail){
            console.log('got user 1');
            detail = this.props.userDetail;
        }

        if(typeof this.props.userDetail === "string"){
            console.log('got user 1*');
            detail = JSON.parse(this.props.userDetail)
        }
        let empLoginInfo = {
            email: detail.EmailId,
            password: detail.Code
        };
        // let detail = JSON.parse(this.props.userDetail);
        const {postEvent} = this.props;
        postEvent({payload: empLoginInfo});
        console.log('changed details',this.props.userDetail);
        let grpName = detail.Jul17GroupA;
        getAgendaData({param:grpName,day:'17 Jul 18'});
        this.setState({
            detailsLoaded:true
        })
    }

    handleOnPress = (value) => {
        this.setState({
            selectedDate: value
        },()=> {
            //if Jan 6 selected then api call for Jan 6 else Jan 7.
            if(this.state.selectedDate === '17 Jul 18'){
                // 17 Jul api call
                const { getAgendaData } = this.props;
                let detail = {};
                if(this.props.userDetail){
                    detail = this.props.userDetail;
                }

                if(typeof this.props.userDetail === "string"){
                    detail = JSON.parse(this.props.userDetail)
                }
                // let detail = JSON.parse(this.props.userDetail);
                let groupName = detail.Jul17GroupA;
                getAgendaData({param:groupName,day:'17 Jul 18'});
            }
            else{
                // 18 Jul api call
                const { getAgendaData } = this.props;
                let detail = {};
                if(this.props.userDetail){
                    detail = this.props.userDetail;
                }

                if(typeof this.props.userDetail === "string"){
                    detail = JSON.parse(this.props.userDetail)
                }
                // let detail = JSON.parse(this.props.userDetail);
                let groupName = detail.Jul18GroupA;
                getAgendaData({param:groupName,day:'18 Jul 18'});
            }
        })
    }

    render(){
        let empAgenda = {
            header: {
                Date: null,
                ParticipantsGroups: null,
                DressCode: null,
                GroupCoordinator: null
            },
            body: []
        };

        if(this.props.agendaList && Object.keys(this.props.agendaList).length){
            empAgenda = this.props.agendaList;
        }
        let venueCount = 0,presenterCount=0;
        return(
            <View style={styles.container}>
                {
                    this.state.fontLoaded?
                        <View style={{flex:1}}>
                            <PageHeaderNotif props={this.props} parentPage='Train The Trainer' navigation={this.props.navigation}/>
                            <ScrollView>
                                <View style={{height:289.5}}>
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
                                        HILTI INDIA KICK OFF 2018</Text>

                                    <View style={{position:'absolute',height:70,width:70,backgroundColor:'#dd2127',top:165.5,left:15,justifyContent:'center',alignItems:'center',zIndex:1}}>
                                        <Text style={{flex:1.5,fontSize:25,fontFamily:'hilti-roman',color:'#ffffff'}}>17-18</Text>
                                        <Text style={{flex:1,fontSize:15,fontFamily:'hilti-roman',color:'#ffffff'}}>Jul</Text>
                                    </View>

                                    <View style={{height:90,backgroundColor:'#ffffff'}}>
                                        <View style={{flex:3,paddingLeft:100,justifyContent:'center',alignItems:'flex-start'}}>
                                            {((empAgenda.header && empAgenda.header.ParticipantsGroups)||(empAgenda.header && empAgenda.header.ParticipantsGroup))?
                                                <Text style={{marginTop:3,fontSize:12,fontFamily:'hilti-bold',color:'#7c294e'}}>
                                                    Participants Groups: {empAgenda.header.ParticipantsGroups||empAgenda.header.ParticipantsGroup||'Data not available'}
                                                </Text>:
                                                null
                                            }

                                            {(empAgenda.header && empAgenda.header.DressCode)?
                                                <Text style={{marginTop:3,fontSize:12,fontFamily:'hilti-bold',color:'#7c294e',paddingBottom:3}}>
                                                    Dress Code: {empAgenda.header.DressCode||'Data not available'}
                                                </Text>:
                                                null
                                            }

                                            {((empAgenda.header && empAgenda.header.GroupCoordinator)||(empAgenda.header && empAgenda.header.Groupcoordinator))?
                                                <Text style={{fontSize:12,fontFamily:'hilti-bold',color:'#7c294e',paddingBottom:3}}>
                                                    Group Coordinator: {empAgenda.header.GroupCoordinator||empAgenda.header.Groupcoordinator||'Data not available'}
                                                </Text>:
                                                null
                                            }
                                        </View>
                                        <View style={{flex:2,backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                            <TouchableOpacity style={{paddingRight:10,paddingTop:10,paddingBottom:10,marginRight:5,marginTop:5,marginBottom:5}}>
                                                <RadioButton
                                                    currentValue={this.state.selectedDate}
                                                    value={'17 Jul 18'}
                                                    outerCircleSize={15}
                                                    innerCircleSize={7.5}
                                                    innerCircleColor={'#dd2127'}
                                                    onPress={this.handleOnPress.bind(this)}
                                                >
                                                    <Text style={{marginLeft:4,fontSize:14,color:'#dd2127',fontFamily:'hilti-bold'}}>17 Jul</Text>
                                                </RadioButton>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{padding:10,margin:5}}>
                                                <RadioButton
                                                    currentValue={this.state.selectedDate}
                                                    value={'18 Jul 18'}
                                                    outerCircleSize={15}
                                                    innerCircleSize={7.5}
                                                    innerCircleColor={'#dd2127'}
                                                    onPress={this.handleOnPress.bind(this)}
                                                >
                                                    <Text style={{marginLeft:4,fontSize:14,color:'#dd2127',fontFamily:'hilti-bold'}}>18 Jul</Text>
                                                </RadioButton>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

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
                                                    <View style={{marginBottom:10}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(PreKickOff)