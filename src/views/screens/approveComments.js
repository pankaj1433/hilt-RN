import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, View, FlatList ,TouchableOpacity } from 'react-native';
import { Font } from 'expo';
import Icon  from 'react-native-vector-icons/FontAwesome';

import { getUnapprovedComments ,approveComment } from '../../actions/apiData';
import PageHeaderNotif from "../common/pageHeaderNotif";
import ApproveCheckbox from '../common/approveCheckbox';
import openSocket from 'socket.io-client';

let socket;
class ApproveComments extends Component {

    constructor(props){
        super(props);
        this.state = {
            typing: '',
            errText:'',
            checked: {},
            selectAllState: false,
            unapprovedList:[]
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

    componentWillReceiveProps(nextProps){
        this.setState({
            unapprovedList:nextProps.unapprovedCommentList
        })
    }

    componentDidMount(){

        socket = openSocket('http://hilti.tothenew.net:8080', {
            path: '/socket.io-client'
        });

        console.ignoredYellowBox = [ 'Setting a timer' ]

        socket.on('connect', () => {
            console.log('connected!');
        });

        socket.on('error', error => {
            console.log('connected!');
        });

        socket.on('comment:save',(data) => {
            let localComments = JSON.parse(JSON.stringify(this.state.unapprovedList));
            localComments.unshift(data);
            this.setState({
                unapprovedList:localComments
            })
        });

        socket.on('disconnect',()=>{
            console.log("disconnected")
        });

        socket.on('comment:findOneAndUpdate', (data) => {
            let localComments = this.state.unapprovedList;
            let index =localComments.findIndex((item)=> item._id === data._id);
            if(index >=0){
                localComments.splice(index,1);
            }
            this.setState({
                unapprovedList:localComments
            })
        });


        const { getUnapprovedComments } = this.props;
        getUnapprovedComments().then(()=> {
            let initialObject = {};
            for (let key in this.state.unapprovedList){
                initialObject[this.state.unapprovedList[key]._id]  = false
            }
            this.setState({checked: initialObject})
        });
    }


    disconnectSocket = () => {
        socket.disconnect();
    };

    checked = (index) => {
        let newob  = Object.assign({},this.state.checked,{[index]:!this.state.checked[index]})
        this.setState({checked: newob})
    };

    approveComments = () => {
        let tempArray = [];
        for(let key in this.state.checked) {
            if(this.state.checked[key])
                tempArray.push(key);
        }
        if(tempArray) {
            const {approveComment} = this.props;
            approveComment({
                payload: {
                    ids: tempArray
                }
            });
        }else{
            this.setState({
                errText:'First select Comments'
            })
        }

    };
    selectAll = () => {
        let newob  = {};
        for(let key in this.state.checked) {
            newob[key]  = !this.state.selectAllState
        }
        this.setState({
            selectAllState: !this.state.selectAllState,
            checked: newob
        })
    };

    render() {
        const unchecked = <Icon name='square-o' size={20} color='#000' style={{marginRight: 14}}/>
        const checked = <Icon name='check-square-o' size={20} color='#dd2127' style={{marginRight: 14}}/>

        return(
            <View style={styles.container}>
                {this.state.fontLoaded?
                    <View style={{flex:1}}>
                        <PageHeaderNotif props={this.props} parentPage={`Approve Comments`} navigation={this.props.navigation} disconnectSocket={this.disconnectSocket}/>
                        <View>
                            <TouchableOpacity  onPress={() => this.selectAll()}>
                                <View style={{flexDirection:'row', padding: 20,}}>
                                    {this.state.selectAllState?checked:unchecked}
                                    <Text>Select all</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            inverted
                        extraData = {this.state.checked}
                        data={this.state.unapprovedList}
                            renderItem={({item}) =>
                                <View style={styles.row}>
                                    <ApproveCheckbox isChecked = {this.state.checked[item._id]?true:false} item={item} checked={this.checked}/>
                                </View>
                            }
                            keyExtractor={item => item.timestamp}
                        />

                        <TouchableOpacity onPress={this.approveComments} style={{width:100,marginLeft:150,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'lightgrey',borderRadius:5,marginBottom:10, marginTop:10}}>
                            <Text style={styles.approve}>Approve</Text>
                        </TouchableOpacity>
                    </View>
                    :null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        flex: 1,
    },
    message: {
        marginLeft:50,
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
        marginLeft:10,
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
        padding:5,
    },
});


function mapStateToProps (state) {
    return {
        unapprovedCommentList: state.event.unapprovedCommentList,
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators({
                getUnapprovedComments,
                approveComment
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApproveComments)

