import React, {Component} from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Font } from 'expo';
import Icon  from 'react-native-vector-icons/FontAwesome';
import  moment from 'moment';

export default class ApproveCheckbox extends Component {

    constructor(props){
        super(props);
        this.state = {
            fontLoaded:false,
        }
    }

    async componentWillMount(){
        await Font.loadAsync({
            'hilti-bold': require('../../assets/fonts/Hilti-Bold.ttf'),
            'hilti-roman': require('../../assets/fonts/Hilti-Roman.ttf'),
        });
        this.setState({
            fontLoaded:true,
        })
    }

    handleChange=()=>{
        this.props.checked(this.props.item._id);
    };

    render() {
        const unchecked = <Icon name='square-o' size={20} color='#000' style={{marginRight: 14}}/>
        const checked = <Icon name='check-square-o' size={20} color='#dd2127' style={{marginRight: 14}}/>
        return (
            this.state.fontLoaded?
                <TouchableOpacity style={styles.checkbox} onPress={()=>this.handleChange()}>
                    {this.props.isChecked?checked:unchecked}
                    <View style={styles.rowTextLeft}>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.rowTextLeft}>
                                <View style={styles.messageContainer}>
                                    <Text style={styles.message}>{this.props.item.comment}</Text>
                                    <View style={{flexDirection:'row', marginTop:8}}>
                                        <Text style={styles.sender}>{this.props.item.name}</Text>
                                        <Icon
                                            style={{marginLeft:5,marginTop:15}}
                                            name='circle'
                                            size={5}
                                        />
                                        <Text style={{alignSelf:'flex-end', fontSize:10,marginLeft:5}}>{moment(this.props.item.timestamp).fromNow()}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>:null
        )
    }
}
const styles = StyleSheet.create({
    checkbox: {
        flexDirection: 'row'
    },
        row: {

            flexDirection: 'row',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
        },
        avatar: {
            borderRadius: 20,
            width: 40,
            height: 40,
            marginRight: 10,
        },
        rowTextLeft: {
                width:200,
                borderRadius:10,
                backgroundColor:'#EBE7ED',
        },
        message: {
            fontSize: 15
        },
        senderImage:{
            backgroundColor:'lightblue',
            height:40,
            width:40,
            borderRadius: 40,
            alignItems:'center',
            justifyContent:'center'

        },
        senderImageText:{
            fontSize:30,
            fontWeight:'bold'
        },
        sender: {
            marginTop:10,
            fontSize:10,
            fontWeight: 'bold'
        },
        footer: {
            flexDirection: 'row',
            backgroundColor: '#eee',
        },
        input: {
            paddingHorizontal: 20,
            fontSize: 18,
            flex: 1,
        },
        approve: {
            alignSelf: 'center',
            color: '#dd2127',
            fontSize: 16,
            fontWeight: 'bold',
            padding: 20,
        },
    messageContainer:{
        padding:10
    },
    rowTextRight:{
        flex:1,
        borderRadius:10,
        backgroundColor:'#EBE7ED'
    },
    messageSender:{
        fontSize:15,
    }
});