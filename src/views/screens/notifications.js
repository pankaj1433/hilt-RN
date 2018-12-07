import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import PageHeaderNotif from '../common/notificationHeader';
import { getAllNotification, readAllNotification} from '../../actions/apiData';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notification from '../common/notification';


class Notifications extends Component {
    constructor(){
        super();
        this.state = {
            notificationRecieved:false,
        }
    }
    
    componentWillMount(){
        this.getAllNotificationAsync()
        .then((notifications)=>{
            this.setState({notificationRecieved: true},()=> {
                this.props.readAllNotification();
            })
        })
    }
   getAllNotificationAsync() { 
        return this.props.getAllNotification();
    }

    render() {
        const notifArray = this.props.allNotifications;
        return(
            
             <View style={styles.container}>
             <View style={{flex:1}}>
                     <PageHeaderNotif props={this.props} parentPage='NOTIFICATIONS' navigation={this.props.navigation}/>      
                     {    
                        this.state.notificationRecieved ?
                             <ScrollView contentContainerStyle={{ justifyContent:'center',alignItems:'center'}}>
                                 {
                                     notifArray.length == 0 ?
                                         <View style={{marginTop:20, flex:1, justifyContent:'center', alignItems:'center'}}>
                                             <Text style={{color:'red'}}> No Notifications to show.</Text>
                                         </View>
                                         :
                                         notifArray.map((notification,index) =>
                                             <Notification key = {index} notification={notification}/>
                                         )
                                 }
                             </ScrollView>
                             :<ActivityIndicator color='red' size='large' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 80}}/>
                     }
                 </View>
             </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ffffff'
    },
});
function mapStateToProps (state) {
    return {
        allNotifications: state.event.allNotifications
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators({
                getAllNotification,
                readAllNotification
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)