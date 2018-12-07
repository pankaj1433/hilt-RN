import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator,AppState } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from "react-navigation";
import { getEvent,setUserDetail, setToken, readAllNotification, getNotificationCount } from '../actions/apiData';

import Login from './screens/login'
import HomeScreen from './screens/homeScreen'
import { asyncGet } from '../utils/asyncStore'
import {Notifications} from 'expo';

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            appState: AppState.currentState,
            notificationCount: this.props.notificationCount,
            notifResponse: {},
        }
    }


    componentWillMount(){
        Notifications.addListener(this._handleListner);
        asyncGet('token').then((value) => {
            if(value !== null){
                asyncGet('userDetail').then((detail) => {
                    const { setUserDetail } = this.props;
                    this.props.setUserDetail(detail);
                    return value;
                })
                .then((value)=>
                    this.props.setToken({token: value})
                );
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'HomeScreen' })
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            }
            else{
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Login' })
                    ]
                })
                this.props.navigation.dispatch(resetAction);
            }
        })

    }

    _handleListner= (notification) => {
        this.setState({notifResponse: notification});
        if(notification.origin == 'selected') {
            const resetAction = NavigationActions.reset({
                index: 1,
                actions: [
                    NavigationActions.navigate({ routeName: 'HomeScreen' }),
                    NavigationActions.navigate({ routeName: 'Notifications' })
                ]
            });
            this.props.navigation.dispatch(resetAction);
        } 
        this.getNotificationAsync().then((data) => {
            this.setState({ notificationCount : data });
        })
    }

    async getNotificationAsync() { 
        return this.props.getNotificationCount();
    }


    render() {
        return (
            <View style={{flex:1}}>
                <View style={{alignItems:'center',justifyContent:'center',flex:1,marginTop:70}}>
                    <ActivityIndicator color='red' size='large' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 80}}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
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
    }
});

function mapStateToProps (state) {
    return {
        eventList: state.event.eventList,
        eventLoginList:state.event.eventLoginList,
        notificationCount: state.event.notificationCount,
    }
}

function mapDispatchToProps(dispatch){
  return {
    dispatch,
    ...bindActionCreators({
            getEvent,
            setUserDetail,
            readAllNotification,
            getNotificationCount,
            setToken
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
