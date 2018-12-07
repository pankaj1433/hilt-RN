import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import PageHeaderNotif from '../common/pageHeaderNotif';
import AssistanceContainer from '../common/assistanceContainer';

class travelAssistance extends Component {
    render() {
        const data = {title:'Travel Related Query',
                    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
                    select:[
                        'My flight time date is changed',
                        'My flight is cancelled',
                        'Need to cancel my Flight as not joining the Kick off',
                        'Need to Change my flight (only emergency cases)',
                        'Any other Queries (Pickup, Drop, Agenda etc.)'
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

export default travelAssistance;