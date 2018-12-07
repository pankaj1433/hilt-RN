import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome';
import { getNotificationCount, readAllNotification} from '../../actions/apiData';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from "react-navigation";

class notificationBell extends Component {
    constructor(){
        super();

        this.state = {
            fontLoaded:false
        }
    }

    async componentWillMount() {
        this.getNotificationAsync()
        .then((data)=>{
        });
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.isLogged){
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Login'})
                ]
            });
            nextProps.navigation.dispatch(resetAction);
        }
    }


    async getNotificationAsync() { 
        return this.props.getNotificationCount();
    }

    bellIconClick() { 
        this.props.readAllNotification().then((resp)=>{
            this.props.navigation.navigate('Notifications',{})
        })
        
    }

    render() {

        return(
                <TouchableOpacity onPress={() => this.bellIconClick()} style={styles.notification}>
                    <View>
                    {this.props.notificationCount && this.props.notificationCount.count && this.props.notificationCount.count!=0?
                    <Text style={styles.notifBadge}>{this.props.notificationCount.count}</Text>:null}
                        <Icon 
                        name='bell'
                        size={20} />
                        </View>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        height: 25,
        width: 40,
        position:'absolute',
        zIndex:10
    },
    notifBadge: {
        position: 'absolute',
        color: '#fff',
        backgroundColor: 'red',
        borderRadius: 8,
        height: 14,
        width: 14,
        zIndex:15,
        padding: 1,
        fontSize: 8,
        overflow:'hidden',
        textAlign: 'center',
        left: 10,
    },
    notification: {
        position: 'relative',
        paddingHorizontal: 5,
    }
});


function mapStateToProps (state) {
    return {
        notificationCount: state.event.notificationCount,
        isLogged:state.event.isLogged
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators({
                getNotificationCount,
                readAllNotification
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(notificationBell)