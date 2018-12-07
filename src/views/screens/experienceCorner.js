import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Font } from 'expo'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderNotif from '../common/pageHeaderNotif'
import { getFlag } from '../../actions/apiData'

class ExperienceCorner extends Component {
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
            fontLoaded:true
        })
    }

    componentDidMount() {
        const { getFlag } = this.props;
        getFlag('experienceCorner');
    }

    render(){
        let display ;
        if(this.props.statics){
            display= this.props.statics.display;
        }
        let imgSrc;

        if(display){
            imgSrc = require('../../assets/images/experienceCornerRevised/exp_corner_revision_mdpi.jpg');
        }
        else{
            imgSrc = require('../../assets/images/expCornerMainImg/exp_corner_mdpi.png');
        }
        return(
            <View style={styles.container}>
                {this.state.fontLoaded?
                    <View style={{flex:1}}>
                        <PageHeaderNotif props={this.props} parentPage='EXPERIENCE CORNER' navigation={this.props.navigation}/>

                        {/*<ImageBackground
                            style={{height:183}}
                            source={imgSrc}
                        >*/}
                            {
                                !display ?
                                    <ImageBackground
                                        style={{height:183}}
                                        source={imgSrc}
                                    >
                                    <View>
                                        <Text style={{position:'absolute',marginTop:22.5,marginLeft:20,width:240.5,fontSize:14,fontFamily:'hilti-roman',color:'#dd2127'}}>
                                            BE READY FOR A MEMORABLE EXPERIENCE
                                        </Text>
                                        <Text style={{position:'absolute',marginTop:85,marginLeft:18.5,fontSize:9,fontFamily:'hilti-bold',color:'#7c294e'}}>
                                            Check-out this page on Jan 07, 2018 for details.
                                        </Text>
                                    </View>
                                    </ImageBackground>
                                        :
                                    <ImageBackground
                                        style={{height:258}}
                                        source={imgSrc}
                                    >

                                    </ImageBackground>
                            }
                        {/*</ImageBackground>*/}
                    </View>:null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    },
});

function mapStateToProps (state) {
    return {
        statics:state.event.statics
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators({
                getFlag
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceCorner)


