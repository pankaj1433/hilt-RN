import React, {Component} from 'react';
import { StyleSheet, View ,Text ,TouchableOpacity } from 'react-native';
import { Font } from 'expo'
import { connect } from 'react-redux';
import PageHeaderNotif from '../common/pageHeaderNotif'
import Icon  from 'react-native-vector-icons/FontAwesome';
import PageHeaderLogout from "../common/pageHeaderLogout";


class Profile extends Component {
    constructor(){
        super();

        this.state = {
            fontLoaded:false,
            userDetail:{}
        }
    }

    async componentWillMount(){
        await Font.loadAsync({
            'hilti-bold': require('../../assets/fonts/Hilti-Bold.ttf'),
            'hilti-roman': require('../../assets/fonts/Hilti-Roman.ttf'),
        });
        this.setState({
            fontLoaded:true
        });
    }

    render() {
        let detail = {};
        if(this.props.userDetail){
            detail = this.props.userDetail;
        }

        if(typeof this.props.userDetail === "string"){
            detail = JSON.parse(this.props.userDetail)
        }

        return (
            <View style={styles.container}>
                {
                    this.state.fontLoaded?
                        <View style={{flex:1}}>

                            <PageHeaderLogout props={this.props} parentPage='Profile' navigation={this.props.navigation}/>

                            <View style={{marginLeft:20,marginTop:20}}>
                                <View style={{flexDirection:"row",marginTop:10}}>
                                    <Icon style={{marginTop:4}} name='user'/>
                                    <Text style={{marginLeft:10}}>Name</Text>
                                </View>
                                <Text style={{color:'grey',marginLeft:20}}>{detail.Name}</Text>

                                <View style={{flexDirection:"row",marginTop:10}}>
                                    <Icon style={{marginTop:4}} name="group"/>
                                    <Text style={{marginLeft:10}}>Team</Text>
                                </View>
                                <Text style={{color:'grey',marginLeft:20}}>{detail.Team}</Text>

                                <View style={{flexDirection:"row",marginTop:10}}>
                                    <Icon style={{marginTop:4}} name="map-marker"/>
                                    <Text style={{marginLeft:10}}>Location</Text>
                                </View>
                                <Text style={{color:'grey',marginLeft:20}}>{detail.Location}</Text>

                                <View style={{flexDirection:"row",marginTop:10}}>
                                    <Icon style={{marginTop:4}} name="sitemap"/>
                                    <Text style={{marginLeft:10}}>Team Category</Text>
                                </View>
                                <Text style={{color:'grey',marginLeft:22}}>{detail.Category}</Text>

                                <View style={{flexDirection:"row",marginTop:10}}>
                                    <Icon style={{marginTop:4}} name="id-card"/>
                                    <Text style={{marginLeft:10}}>Group Name (Jul 19)</Text>
                                </View>
                                <Text style={{color:'grey',marginLeft:22}}>{detail.Jul19GroupA}</Text>

                            </View>

                            <View
                                style={{
                                    marginTop:15,
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />

                        </View>
                        :null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

function mapStateToProps (state) {
    return {
        userDetail:state.event.userDetail
    }
}


export default connect(mapStateToProps, null)(Profile)

