import React, {Component} from 'react';
import { StyleSheet, View, Image, Dimensions ,Text ,TouchableOpacity } from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome';
import {BoxShadow} from 'react-native-shadow';
import { Font } from 'expo';
import { getNotificationCount } from '../../actions/apiData';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotificationBell from './notificationBell';

class PageHeader extends Component {
    constructor(){
        super();

        this.state = {
            fontLoaded:false
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'hilti-bold': require('../../assets/fonts/Hilti-Bold.ttf'),
            'hilti-roman': require('../../assets/fonts/Hilti-Roman.ttf'),
        });
        this.setState({
            fontLoaded:true
        })
    }

    render(){
        var {height, width} = Dimensions.get('window');
        const shadowOpt = {
            width:width,
            flex:1,
            color:"#000",
            border:1,
            radius:0,
            opacity:0.2,
            x:0,
            y:1,
            style:{marginVertical:1}
        };
        return(
            <BoxShadow setting={shadowOpt}>
                <View style={{position:"relative",
                    width: width,
                    height: 38,
                    backgroundColor: "#fff",
                    borderRadius:0,
                    overflow:"hidden"
                }}>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.logo} onPress={()=>this.props.navigation.navigate('HomeScreen')}>
                            <Image
                                source={require('../../assets/images/logo/logo_mdpi.png')}
                            />
                        </TouchableOpacity>
                        <View style={styles.IconBtn}>
                            {
                                this.props.showBell ?(
                                    <NotificationBell pauseVideo ={this.props.pauseVideo} navigation={this.props.navigation} />
                                ):null
                            }
                            {
                                this.props.showUser ?
                                    <Icon
                                        name='user-circle-o'
                                        size={20}
                                        onPress={()=> {
                                            this.props.pauseVideo();
                                            this.props.navigation.navigate('Profile',{})
                                        }}
                                    />:null
                            }
                        </View>
                    </View>
                </View>
            </BoxShadow>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        backgroundColor:'white',

    },
    logo:{
        flex:1,
        justifyContent:'flex-start',
        marginTop:10,
        marginRight:10,
        marginLeft:19.5
    },
    IconBtn: {
        flex: 0.3,
        marginTop:10,
        marginLeft:5,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    text: {
        textAlign: 'center'
    },
    button: {
        height: 60,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0b7eff'
    },
    buttonText: {
        color: 'white'
    },
    icon: {
        height: 25,
        width: 40
    },
    notifBadge: {
        position: 'absolute',
        color: '#fff',
        backgroundColor: 'red',
        borderRadius: 8,
        height: 16,
        width: 16,
        zIndex:15,
        padding: 1,
        fontSize: 9,
        textAlign: 'center',
        left: 5,
        top: -5,
    },
    notification: {
        position: 'relative',
    }
});


function mapStateToProps (state) {
    return {
        notificationCount: state.event.notificationCount
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators({
                getNotificationCount
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader)