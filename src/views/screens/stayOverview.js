import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { FileSystem } from 'expo';
import PageHeaderNotif from '../common/pageHeaderNotif'
import { Font,WebBrowser } from 'expo'

class stayOverview extends Component {
    constructor(){
        super();

        this.state = {
            fontLoaded:false
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

    downloadFile = () => {
        WebBrowser.openBrowserAsync('http://hilti.tothenew.net:8080/api/documents/download/Stay_Overview.xlsx')
            .then((resp) => {
                console.log("Finished", resp);
            })
            .catch(error => {
                alert.error(error);
            });
    };

    render(){
        return(
            <View style={styles.container}>
                {this.state.fontLoaded?
                    <View style={{flex:1}}>
                        <PageHeaderNotif props={this.props} parentPage='STAY OVERVIEW' navigation={this.props.navigation}/>

                        <View style={{height:331,justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={this.downloadFile}>
                            <Image
                                style={{marginTop:76}}
                                source={require('../../assets/images/excel_icon.png')}
                            />
                            </TouchableOpacity>
                            <View
                                style={{marginTop:22}}
                            >
                                <Text style={{fontSize:15,fontFamily:'hilti-roman',color:'#dd2127'}}>DOWNLOAD COMPLETE EXCEL SHEET</Text>
                            </View>
                            <Text style={{marginTop:35,fontSize:22,fontFamily:'hilti-bold',color:'#000000'}}>
                                STAY OVERVIEW
                            </Text>
                            <Text style={{marginTop:14,fontSize:12,fontFamily:'hilti-roman',color:'#000000',opacity:0.8}}>Complete excel will be available only after Jan 5, 2018</Text>
                        </View>
                    </View>:null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f3ee'
    }
})

export default stayOverview;