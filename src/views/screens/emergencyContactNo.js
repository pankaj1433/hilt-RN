import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Font } from 'expo'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getFlag } from '../../actions/apiData'
import PageHeaderNotif from '../common/pageHeaderNotif'

class EmergencyContactNo extends Component {
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

    componentDidMount() {
        const { getFlag } = this.props;
        getFlag('emergencyContact');
    }

    render(){
        let display,imgSrc ;
        if(this.props.staticsContact){
            display= this.props.staticsContact.display;
        }
        if(!display) {
            imgSrc = require('../../assets/images/expCornerMainImg/exp_corner_mdpi.png');
        }

        return(
            <View style={styles.container}>
                {this.state.fontLoaded?
                    <View style={{flex:1}}>
                        <PageHeaderNotif props={this.props} parentPage='EMERGENCY CONTACT NO.' navigation={this.props.navigation}/>

                            {
                                !display ?

                                    <ImageBackground
                                        style={{height:183}}
                                        source={imgSrc}
                                    >
                                    <Text style={{position:'absolute',marginTop:40,marginLeft:20,width:240.5,fontSize:14,fontFamily:'hilti-roman',color:'#dd2127'}}>
                                        Emergency contacts will be available after 1 Jan, therefore, please write in to Annual kick off Email ID
                                    </Text>
                                    </ImageBackground>

                                    :

                                    <View style={{marginTop:20,marginLeft:20}}>
                                        <Text style={{color:'#000000',fontSize:13,fontFamily:'hilti-roman',marginTop:4}}>
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
                                            Dinesh Prasad |  Manager-Administration
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
                            }


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
});


function mapStateToProps (state) {
    return {
        staticsContact:state.event.staticsContact
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators({
                getFlag
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyContactNo)
