import React, {Component} from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Font } from 'expo'

export default class HomeNavContainer extends Component {
    state = {
      fontLoaded:false
    };


    async componentWillMount(){
        await Font.loadAsync({
            'hilti-bold': require('../../assets/fonts/Hilti-Bold.ttf'),
            'hilti-roman': require('../../assets/fonts/Hilti-Roman.ttf'),
        });
        this.setState({
            fontLoaded:true
        })
    }

    render(){
        const { imgSrc, navigationPage, titleText} = this.props;
        return(
            <View style={{flex:1}}>
                {this.state.fontLoaded?
                    <TouchableOpacity
                        style={{flex:1,
                            backgroundColor:'white',
                            marginLeft:7,
                            marginRight:7,
                            marginBottom:15,
                        }}
                        onPress={() => {
                            this.props.pauseVideo();
                            this.props.homeNavProps.navigation.navigate(`${navigationPage}`,{})
                        }}
                    >
                        <Image
                            style={{
                              backgroundColor:'#f5f3ee',
                              width:null,
                              height:null,
                              flex:1,
                                }}
                            source={imgSrc}
                            resizeMode='stretch'
                        />
                        <View style={{
                            height:35,
                            justifyContent:'center',
                            backgroundColor:'#f5f3ee',
                            }}>
                            <Text
                                style={{
                                    color:'#dd2127',
                                    backgroundColor:'#f5f3ee',
                                    fontFamily:'hilti-roman',
                                    fontSize:10,
                                    letterSpacing:0.5,
                                    textAlign:'center'
                                }}>
                                {titleText}</Text>
                        </View>
                    </TouchableOpacity>:null
                }
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        height:100,
        width:100,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'aqua',
        marginTop:20

    },
    imgContainer:{
        flex:0.7,
        backgroundColor:'yellow'

    },
    img:{
        width:111.5,
        height:103.5,
        backgroundColor:'blue'
    },
    titleContainer:{
        width:111.5,
        height:34,
        alignItems:'center',
        justifyContent:'center'

    },
    title:{
        flex:1,
        color:'red'
    }
})
