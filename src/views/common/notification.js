import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import { Font } from 'expo';
import  moment from 'moment';
import Icon  from 'react-native-vector-icons/FontAwesome';
import { deleteNotification } from '../../actions/apiData';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const {height, width} = Dimensions.get('window');
class Notification extends Component {
    constructor(){
        super();
        this.state = {
            fontLoaded:false,
            showThis: true
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
    deleteThisNotification = (id) => {
        let options = { params: id }
        this.props.deleteNotification(options).then(()=> {
            this.setState({showThis: false});
        })
    }
    render(){
        return(
                <View>
                {  
                    this.state.fontLoaded && this.state.showThis  ? (
                        <View style={styles.container}>
                        {
                        (typeof(this.props.notification.data)!='undefined') ? (
                            <View>
                            <View style={{flexDirection:'row',marginBottom:5}}>
                                <Text style={{
                                        alignSelf:'flex-start',
                                        flex:1,
                                        fontSize:14,
                                        fontFamily:'hilti-roman',
                                        color:'#dd2127'}}>
                                    {this.props.notification.title}
                                </Text>
                                <View style={styles.delBtn}>
                                    <TouchableOpacity onPress={() => this.deleteThisNotification(this.props.notification.nid)}>
                                        <Icon 
                                        name='times'
                                        size={15}
                                        color='#dd2127' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex:1,height:250,width:width}}>
                                <Image 
                                style={{flex:1, height: undefined, width: undefined}}
                                resizeMode='contain' source={{uri:this.props.notification.data.url}}/> 
                            </View>
                            <View style={{
                                alignItems:'flex-start',
                                flex:1}}>
                                <Text style={{
                                    textAlign: 'left',
                                    fontFamily:'hilti-roman',
                                    fontSize:10,
                                    color:'#000000',
                                    marginVertical:10}}>
                                    {this.props.notification.body}
                                    </Text>
                            </View> 
                            <Text style={{
                                flexShrink:1,
                                alignSelf: 'flex-end',
                                fontSize: 9,
                                color: '#5b5b5b',
                                textAlign:'right',
                                marginBottom: 5
                            }}>
                                {moment(this.props.notification.timestamp).fromNow()}
                            </Text>
                            <View style={styles.horizontalLine}></View>
                            </View>):
                            (
                                
                                <View>
                                    <View style={{flexDirection:'row',marginBottom:5}}>
                                            <Text style={{
                                                    alignSelf:'flex-start',
                                                    flex:1,
                                                    fontSize:14,
                                                    fontFamily:'hilti-roman',
                                                    color:'#dd2127'}}>
                                                {this.props.notification.title}
                                            </Text>
                                            <View style={styles.delBtn}>
                                                <TouchableOpacity onPress={() => this.deleteThisNotification(this.props.notification.nid)}>
                                                    <Icon 
                                                    name='times'
                                                    size={15}
                                                    color='#dd2127' />
                                                </TouchableOpacity>
                                            </View>
                                    </View>
                                    <View style={{backgroundColor: "#d6d6d6",position: 'relative',minHeight: 100,}}>
                                        <View style={styles.whiteOverlay}></View>
                                            <View style={{
                                                alignItems:'flex-start',
                                                flex:1}}>
                                                <Text style={{
                                                    textAlign: 'left',
                                                    fontFamily:'hilti-roman',
                                                    fontSize:10,
                                                    color:'#000000',
                                                    backgroundColor:'transparent',
                                                    width: width/2,
                                                    marginVertical:10}}>
                                                    {this.props.notification.body}
                                                    </Text>
                                            </View> 
                                            <Text style={{
                                                flexShrink:1,
                                                alignSelf: 'flex-end',
                                                fontSize: 9,
                                                color: '#5b5b5b',
                                                textAlign:'right',
                                                marginBottom: 5,
                                                marginRight: 5
                                            }}>{moment(this.props.notification.timestamp).fromNow()}</Text>
                                            <View style={styles.horizontalLine}></View>  
                                    </View>
                                </View>
                            ) } 
                        </View>):null
                }
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width-40,
        flexShrink:1,
        backgroundColor: "#fff",
        borderRadius:1,
        overflow:"hidden",
        justifyContent:'center',
        paddingHorizontal: 10,
        marginTop:10
    },
    horizontalLine: {
        height: 2,
        width: width-60,
        backgroundColor: '#d6d6d6' ,
        paddingHorizontal: 10,
    },
    delBtn: {
        alignItems: 'flex-end',
        padding:5,
    },
    whiteOverlay : {
        width: width/1.5,
        position: 'absolute',
        borderTopColor: '#FFF',
        borderRightColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 200,
        borderRightWidth: width/2,
    }
});

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators({
                deleteNotification,
            },
            dispatch
        ),
    };
}

export default connect(null, mapDispatchToProps)(Notification)