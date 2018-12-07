import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import PageHeaderNotif from '../common/pageHeaderNotif';
import AssistanceContainer from '../common/assistanceContainer';

class hotelAssistance extends Component {
    render() {
        const data = {title:'Hotel Related Query',
                    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    select:[
                        'Wrong checkin date',
                        'Wrong check-out date',
                        'Need change in check-in date as my flight is changed',
                        'Need change in my check-out date as my flight is changed',
                        'Release room booking as I am not travelling',
                        ],
                    }
        return ( 
            <View style={styles.container}>
            <View style={{flex:1}}>
                <PageHeaderNotif props={this.props} parentPage={data.title} navigation={this.props.navigation}/>
                <ScrollView>
                    <AssistanceContainer assistanceData={data} />
                </ScrollView>
            </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
})

export default hotelAssistance;