import React, {Component} from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Font } from 'expo';
import Icon  from 'react-native-vector-icons/FontAwesome';


export default class CheckBox extends Component {

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
            fontLoaded:true
        })
    }

    handleChange=()=>{
        this.props.selecteHandler(this.props.idx);
    }
    
    render() {
        const unchecked = <Icon name='square-o' size={20} color='#000' style={{marginRight: 14}}/>
        const checked = <Icon name='check-square-o' size={20} color='#dd2127' style={{marginRight: 14}}/>
        return (
            this.state.fontLoaded?
                <TouchableOpacity style={styles.checkbox} onPress={()=>this.handleChange()}>
                    {this.props.check?checked:unchecked}
                    <Text style={styles.checkboxText}>{this.props.content}</Text>
                </TouchableOpacity>:null
        )
    }
}
const styles = StyleSheet.create({
    checkbox: {
        marginBottom:11.5,
        flexDirection: 'row',
        paddingVertical: 5
    },
    checkboxText: {
        flex: 1,
        fontSize:14, 
        fontFamily:'hilti-roman',
        flexWrap: 'wrap',
    },
});