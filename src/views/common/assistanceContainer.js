import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Linking, TouchableHighlight } from 'react-native';
import { Font } from 'expo';
import { bindActionCreators } from 'redux';

import Checkbox from './Checkbox';
import { connect } from 'react-redux';
import { sendNotif } from '../../actions/apiData'

class assistanceContainer extends Component {
    submit = (url) => {
        let urlSub;
        let Notifbody;
        let selectedItem = this.props.assistanceData.select[Object.keys(this.state.checked)[0]];
        if(selectedItem) {
            if(this.props.assistanceData.title === "Hotel Related Query"){
                urlSub = url + `?subject= HQ - ${this.props.userDetail.Name||JSON.parse( this.props.userDetail).Name} (${this.props.userDetail.Code||JSON.parse( this.props.userDetail).Code})- ${selectedItem} `;
                Notifbody = 'HQ - '+selectedItem+' -'+JSON.parse( this.props.userDetail).Name+' ('+JSON.parse( this.props.userDetail).Code+')'
            }else{
                urlSub = url + `?subject= TQ - ${this.props.userDetail.Name||JSON.parse( this.props.userDetail).Name} (${this.props.userDetail.Code||JSON.parse( this.props.userDetail).Code})- ${selectedItem} `;
                Notifbody = 'TQ - '+selectedItem+' -'+JSON.parse( this.props.userDetail).Name+' ('+JSON.parse( this.props.userDetail).Code+')'
            }
            Linking.canOpenURL(urlSub).then(supported => {
                if (supported) {
                    Linking.openURL(urlSub);
                }
            });
            let options = {
                payload: {
                    title: 'Need Assistance',
                    body: Notifbody
                }
            }
            const { sendNotif } = this.props;
            sendNotif(options);

        }else{
            this.setState({
                err:true,
                errText:'Please select a query to be send'
            })
        }
    };

    selectedItems = (index) => {
        let newob  = {[index]:true};
        this.setState({checked: newob,err:false,errText:''})
    };

    constructor(){
        super();
        this.state = {
            fontLoaded:false,
            checked: {},
            err:false,
            errText:''
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

    render() {
        const mailId = 'TeamAnnualKickOff.IN@hilti.com';
        const CheckBoxes = this.props.assistanceData.select.map((item,i)=><Checkbox check={this.state.checked[i]?true:false} selecteHandler={this.selectedItems} content={item} key={i} idx={i}/>)
        return (
            this.state.fontLoaded?
            <View style={styles.Container}>
                    <View style={styles.queryContainer} >
                        <Text 
                            style={{
                                fontSize:22, 
                                fontFamily:'hilti-roman'
                                }}>
                                {this.props.assistanceData.title}</Text>
                    </View>
                    <View style={{flex:1}}>
                        {CheckBoxes}
                        <TouchableHighlight style={styles.button} onPress= { () => {this.submit(`mailto:${mailId}`)}}>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Image style={{marginRight:9}} source={require('../../assets/images/send_email/send_email_mpdi.png')} />
                                <Text style={{color:'#dd2127',fontSize:16, fontFamily:'hilti-roman', textAlign:'center' }}>SEND EMAIL</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                {
                    this.state.err ?
                        <Text style={{color:'#dd2127',alignSelf:'center',marginTop:15}}>{this.state.errText}</Text>:null
                }
            </View>:null
        )
    }
}
const styles = StyleSheet.create({
    Container: {
        backgroundColor:'#fff',
        flex:1,
        paddingHorizontal:32,
    },
    queryContainer: {
        flex: 0,
        flexShrink: 1,
        alignItems:'center',
        marginVertical:35.5,
    },
    checkboxText: {
        flex: 1,
        fontSize:14, 
        fontFamily:'hilti-roman',
        flexWrap: 'wrap',
    },  
    button:{
        height:41,
        width:194.5,
        alignSelf: 'center',
        backgroundColor:'white',
        borderColor:'#dd2127',
        borderWidth:1,
        marginTop:12,
    }
});

function mapStateToProps (state) {
    return {
        userDetail:state.event.userDetail
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators({
                sendNotif
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(assistanceContainer)