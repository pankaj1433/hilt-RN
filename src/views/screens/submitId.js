import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { Font, ImagePicker } from 'expo'
import PageHeaderNotif from '../common/pageHeaderNotif'
import RadioButton from 'radio-button-react-native';
import { uploadIdProofEvent, getdownloadIdProofEvent, deletedownloadIdProofEvent } from '../../actions/apiData';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-native-modal'

class SubmitId extends Component {
    constructor(){
        super();

        this.state = {
            fontLoaded:false,
            value: '',
            imgFrontLoaded:false,
            imgBackLoaded:false,
            imgFrontUrl:'',
            imgBackUrl:'',
            currImgType:'',
            imgFrontType:'',
            imgBackType:'',
            imgFrontData:{},
            imgBackData:{},
            btnText:'UPLOAD FILE',
            errText:'',
            isModalVisible: false
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

    componentDidMount(){
        let detail = {};
        if(this.props.userDetail){
            detail = this.props.userDetail;
        }

        if(typeof this.props.userDetail === "string"){
            detail = JSON.parse(this.props.userDetail)
        }
        const { getdownloadIdProofEvent } = this.props;
        getdownloadIdProofEvent({param:detail.Code});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.downloadIdProofEvent && nextProps.downloadIdProofEvent.length){
            let downloadedImageArray = nextProps.downloadIdProofEvent || [];
            if(downloadedImageArray && downloadedImageArray.length !== 0) {
                let initialDownloadObject = downloadedImageArray[0] || {};
                let secondDownloadObject = downloadedImageArray[1] || {};
                if (downloadedImageArray.length === 1) {
                    if (initialDownloadObject && initialDownloadObject.type === 'front') {
                        this.setState({
                            imgFrontType: initialDownloadObject.type,
                            imgFrontLoaded: true,
                            imgFrontUrl: initialDownloadObject.url+'?random_number='+new Date().getTime(),
                            value: initialDownloadObject.idType,
                            btnText: 'DELETE'
                        })
                    }
                }
                else{
                    if (initialDownloadObject && initialDownloadObject.type === 'front'){
                        this.setState({
                            value: initialDownloadObject.idType,
                            imgFrontLoaded: true,
                            imgFrontUrl: initialDownloadObject.url+'?random_number='+new Date().getTime(),
                            imgFrontType: initialDownloadObject.type,
                            imgBackLoaded: true,
                            imgBackUrl: secondDownloadObject.url+'?random_number='+new Date().getTime(),
                            imgBackType: secondDownloadObject.type,
                            btnText: 'DELETE'
                        })
                    }
                    else {
                        this.setState({
                            value: initialDownloadObject.idType,
                            imgBackLoaded: true,
                            imgBackUrl: initialDownloadObject.url+'?random_number='+new Date().getTime(),
                            imgBackType: initialDownloadObject.type,
                            imgFrontLoaded: true,
                            imgFrontUrl: secondDownloadObject.url+'?random_number='+new Date().getTime(),
                            imgFrontType: secondDownloadObject.type,
                            btnText: 'DELETE'
                        })
                    }
                }
            }
            else{
                ToastAndroid.showWithGravity('No ID Submitted yet.', ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        }
    }

    handleOnPress(value){
        if(this.state.value !== ''){
            if(this.state.imgFrontType !== ''){
                this.setState({
                    errText:'Please delete the image(s) first.'
                })
            }
            else{
                this.setState({
                    value:value,
                    errText:''
                })
            }
        }
        else{
            this.setState({
                value:value,
                errText:''
            })
        }
    }

    showModal = (typeSelected) => {
        if(this.state.btnText === 'DELETE'|| this.state.value === ''){
            this.setState({
                isModalVisible:false,
                currImgType:'',
                errText:'Either image(s) are present or Type is not selected.'
            })
        }
        else{
            if(typeSelected === 'back' && this.state.imgFrontType === ''){
                this.setState({
                    isModalVisible:false,
                    errText:'Please select the front image first.'
                })
            }
            else{
                this.setState({
                    isModalVisible:true,
                    currImgType:typeSelected,
                    errText:''
                })
            }
        }
    }

    takePhoto =  async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality:0.5
        });
        if(pickerResult.cancelled === 'true'){
            if(this.state.currImgType === 'front'){
                this.setState({
                    imgFrontType:'',
                    errText:'No picture taken'
                })
            }
            if(this.state.currImgType === 'back'){
                this.setState({
                    imgBackType:'',
                    errText:'No picture taken'
                })
            }
        }
        else{
            if(this.state.currImgType === 'front'){
                this.setState({
                    imgFrontLoaded:true,
                    imgFrontUrl:pickerResult.uri,
                    imgFrontData:pickerResult,
                    imgFrontType:this.state.currImgType,
                    errText:'',
                    isModalVisible:false
                })
            }
            if(this.state.currImgType === 'back'){
                this.setState({
                    imgBackLoaded:true,
                    imgBackUrl:pickerResult.uri,
                    imgBackData:pickerResult,
                    imgBackType:this.state.currImgType,
                    errText:'',
                    isModalVisible:false
                })
            }
        }
    };

    pickImage = async () => {
        if(this.state.value === ''){
            this.setState({errText:'Please select a type of ID proof'})
        }
        else{
            let resultFront,resultBack;


            if(this.state.currImgType === 'front'){
                resultFront = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                });
                if(this.state.errText !== ''){
                    this.setState({
                        imgFrontLoaded:true,
                        imgFrontUrl:resultFront.uri,
                        imgFrontData:resultFront,
                        imgFrontType:this.state.currImgType,
                        errText:'',
                        isModalVisible:false
                    })
                }
                else{
                    this.setState({
                        imgFrontLoaded:true,
                        imgFrontUrl:resultFront.uri,
                        imgFrontData:resultFront,
                        imgFrontType:this.state.currImgType,
                        errText:'',
                        isModalVisible:false
                    })
                }

            }
            else{
                if(this.state.imgFrontType!=='front'){
                    this.setState({
                        errText:'First select front image'
                    })
                }
                else{
                resultBack = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                });
                this.setState({
                    imgBackLoaded:true,
                    imgBackUrl:resultBack.uri,
                    imgBackData:resultBack,
                    imgBackType:this.state.currImgType,
                    errText:'',
                    isModalVisible:false
                })}
            }

            if(this.state.currImgType === 'front'){
                if(resultFront.cancelled){
                    this.setState({
                        imgFrontLoaded:false,
                        imgBackLoaded:false,
                        imgFrontUrl:'',
                        imgBackUrl:'',
                        imgFrontType:'',
                        imgBackType:'',
                        imgFrontData:{},
                        imgBackData:{},
                        isModalVisible:false
                    })
                }
            }
            else{
                if(this.state.imgFrontType!=='front'){
                    if(resultBack && resultBack.cancelled){
                        this.setState({
                            imgFrontLoaded:false,
                            imgBackLoaded:false,
                            imgFrontUrl:'',
                            imgBackUrl:'',
                            imgFrontType:'',
                            imgBackType:'',
                            imgFrontData:{},
                            imgBackData:{},
                            isModalVisible:false
                        })
                    }
                }
            }
        }
    };

    uploadImage = (imageStatus,uri) => {
        if((this.state.value === ''|| this.state.imgFrontType === '')){
            this.setState({
                errText:'Please select the type and images',
                value:'',
                imgBackLoaded:false,
                imgBackType:'',
                imgBackUrl:'',
                imgBackData:{},
                btnText:'UPLOAD FILE'
            })
        }
        else{
            let uriParts = uri.split('.');
            let fileType = uriParts[uriParts.length - 1];

            let uploadObj = new FormData();
            uploadObj.append('file', {
                uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });
            uploadObj.append('id',this.state.value);
            if(imageStatus === 'front'){
                uploadObj.append('type',this.state.imgFrontType);
            }
            else{
                uploadObj.append('type',this.state.imgBackType);
            }

            let header = {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }

            const { uploadIdProofEvent } = this.props;
            return uploadIdProofEvent({payload:uploadObj,headers:header})
        }
    };

    handleImagePicked = async () => {
        if(this.state.btnText === 'DELETE'){
            let detail = JSON.parse(this.props.userDetail);
            const { deletedownloadIdProofEvent } = this.props;
            deletedownloadIdProofEvent({param:detail.Code});
            this.setState({
                value:'',
                imgFrontLoaded:false,
                imgBackLoaded:false,
                imgFrontUrl:'',
                imgBackUrl:'',
                imgFrontType:'',
                imgBackType:'',
                imgFrontData:{},
                imgBackData:{},
                btnText:'UPLOAD FILE',
                errText:'Image(s) deleted.'
            })
        }
        else{
            let uploadResponse, result, resultFront, resultBack, uploadFrontResponse, uploadBackResponse;
            if(this.state.imgFrontLoaded === true && this.state.imgBackLoaded === true){
                resultFront  = this.state.imgFrontData;
                resultBack = this.state.imgBackData;
                try {
                    if (!resultFront.cancelled && !resultBack.cancelled) {
                        this.setState({btnText:'LOADING',errText:'Upload in progress.'});
                        uploadFrontResponse = await this.uploadImage('front',resultFront.uri);
                        uploadBackResponse = await this.uploadImage('back',resultBack.uri);
                        this.setState({btnText:'DELETE',errText:'Image(s) uploaded successfully.'});
                    }
                } catch (e) {
                    this.setState({errText:'Upload failed, sorry :('})

                }
            }
            else if(this.state.imgFrontLoaded === true && this.state.imgBackLoaded === false){
                result = this.state.imgFrontData;
                try {
                    if (!result.cancelled) {
                        this.setState({btnText:'LOADING',errText:'Upload in progress.'})
                        uploadResponse = await this.uploadImage('front',result.uri);
                        this.setState({btnText:'DELETE',errText:'Image(s) uploaded successfully.'});
                    }
                } catch (e) {
                    this.setState({errText:'Upload failed, sorry :('})
                }
            }
            else{
                this.setState({
                    errText:'Please select the type and image(s).'
                })
            }
        }
    };

    render(){
        return(
            <View style={styles.container}>
                {
                    this.state.fontLoaded?
                        <View style={{flex:1}}>
                            <PageHeaderNotif props={this.props} parentPage='Submit Your ID' navigation={this.props.navigation}/>
                                <Text style={{marginTop:25,marginLeft:20.5,fontSize:12,color:'#dd2127',fontFamily:'hilti-roman'}}>
                                    EXPRESS CHECK-IN
                                </Text>
                                <Text style={{marginTop:11,marginLeft:20.5,marginRight:56,fontSize:9,color:'#000000',opacity:0.8,fontFamily:'hilti-bold'}}>
                                    Please submit your Govt. issued ID latest by 31 Dec, 2017 for hotel check-in.
                                </Text>


                            <View style={{marginTop:22,height:465.5,backgroundColor:'#ffffff'}}>
                                <View style={{marginTop:27.5,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                    <TouchableOpacity style={{flexDirection:'row'}} onPress={this.handleOnPress.bind(this)}>
                                        <RadioButton
                                            currentValue={this.state.value}
                                            value={'Voter ID'}
                                            outerCircleSize={15}
                                            innerCircleSize={7.5}
                                            innerCircleColor={'#dd2127'}
                                            onPress={this.handleOnPress.bind(this)}
                                        >
                                            <Text style={{marginLeft:4,fontSize:10,color:'#000000',fontFamily:'hilti-bold'}}>Voter ID</Text>
                                        </RadioButton>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{marginLeft:10,flexDirection:'row'}} onPress={this.handleOnPress.bind(this)}>
                                        <RadioButton
                                            currentValue={this.state.value}
                                            value={'Adhaar Card'}
                                            outerCircleSize={15}
                                            innerCircleSize={7.5}
                                            innerCircleColor={'#dd2127'}
                                            onPress={this.handleOnPress.bind(this)}>
                                            <Text style={{marginLeft:4,fontSize:10,color:'#000000',fontFamily:'hilti-bold'}}>Adhaar Card</Text>
                                        </RadioButton>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{marginLeft:10,flexDirection:'row'}} onPress={this.handleOnPress.bind(this)}>
                                        <RadioButton
                                            currentValue={this.state.value}
                                            value={'Driving License'}
                                            outerCircleSize={15}
                                            innerCircleSize={7.5}
                                            innerCircleColor={'#dd2127'}
                                            onPress={this.handleOnPress.bind(this)}>
                                            <Text style={{marginLeft:4,fontSize:10,color:'#000000',fontFamily:'hilti-bold'}}>Driving License</Text>
                                        </RadioButton>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{marginLeft:10,flexDirection:'row'}} onPress={this.handleOnPress.bind(this)}>
                                        <RadioButton
                                            currentValue={this.state.value}
                                            value={'Passport'}
                                            outerCircleSize={15}
                                            innerCircleSize={7.5}
                                            innerCircleColor={'#dd2127'}
                                            onPress={this.handleOnPress.bind(this)}>
                                            <Text style={{marginLeft:4,fontSize:10,color:'#000000',fontFamily:'hilti-bold'}}>Passport</Text>
                                        </RadioButton>
                                    </TouchableOpacity>
                                </View>

                                <View style={{marginTop:24.5,height:179.5,justifyContent:'center',alignItems:'center'}}>
                                    <View style={{flexDirection:'row',flex:0.9}}>
                                        <View style={{flex:1,alignItems:'flex-end'}}>
                                            <TouchableOpacity
                                                style={{flex:0.9,borderColor:'black',opacity:0.8,borderWidth:1,width:120,borderStyle:'dashed'}}

                                                onPress={() => this.showModal('front')}
                                            >
                                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                                    {this.state.imgFrontLoaded?
                                                        <Image
                                                            style={{width:'100%',height:'100%'}}
                                                            source={{isStatic:true, uri:this.state.imgFrontUrl}}
                                                        />:
                                                        <Image
                                                            style={{resizeMode:'stretch'}}
                                                            source={require('../../assets/images/upload_icon/upload_icon_mdpi.png')}
                                                        />
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                            <Text style={{paddingRight:50,fontFamily:'hilti-roman',fontSize:10,color:'#000000',opacity:0.6}}>Front</Text>
                                        </View>

                                        <View style={{flex:1,marginLeft:20,alignItems:'flex-start'}}>
                                            <TouchableOpacity
                                                style={{flex:0.9,borderColor:'black',opacity:0.8,borderWidth:1,width:120}}

                                                onPress={() => this.showModal('back')}
                                            >
                                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                                    {this.state.imgBackLoaded?
                                                        <Image
                                                            style={{width:'100%',height:'100%'}}
                                                            source={{isStatic:true, uri:this.state.imgBackUrl}}
                                                        />:
                                                        <Image
                                                            style={{resizeMode:'stretch'}}
                                                            source={require('../../assets/images/upload_icon/upload_icon_mdpi.png')}
                                                        />
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                            <Text style={{paddingLeft:50,fontFamily:'hilti-roman',fontSize:10,color:'#000000',opacity:0.6}}>Back</Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={{flex:0.1,marginTop:5}}

                                        onPress={() => {this.handleImagePicked()}}
                                    >
                                        {this.state.btnText === 'LOADING'?
                                            <ActivityIndicator color='red' style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}/>:
                                            <Text style={{color:'#dd2127',fontFamily:'hilti-roman',fontSize:13}}>{this.state.btnText}</Text>

                                        }
                                    </TouchableOpacity>
                                </View>

                                <Text style={{flex:0.3,alignSelf:'center',marginTop:5,color:'#000000',opacity:0.6,fontFamily:'hilti-roman',fontSize:9,width:220}}>You will receive your room sharing details upon uploading the ID proof</Text>
                                {
                                    this.state.errText ?
                                        <Text style={{alignSelf:'center',color:'#dd2127',fontFamily:'hilti-roman',fontSize:13}}>{this.state.errText}</Text>:null
                                }

                                <Modal isVisible={this.state.isModalVisible} backdropColor={'#ffffff'} onBackdropPress={() => {this.setState({isModalVisible:false})}} animationIn={'fadeIn'} animationOut={'fadeOut'}>
                                    <View style={{ flex: 1 ,justifyContent:'center',alignItems:'center'}} pointerEvents={'box-none'}>
                                        <TouchableOpacity
                                            style={{width:200,height:50,backgroundColor:'#dd2127',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#dd2127',borderRadius:5}}

                                            onPress={() => {this.takePhoto()}}
                                        >
                                            <Text style={{color:'#ffffff',fontFamily:'hilti-roman',fontSize:13}}>Take a picture</Text>

                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{width:200,height:50,marginTop:10,backgroundColor:'#dd2127',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#dd2127',borderRadius:5}}

                                            onPress={() => {this.pickImage()}}
                                        >
                                            <Text style={{color:'#ffffff',fontFamily:'hilti-roman',fontSize:13}}>Choose from device</Text>

                                        </TouchableOpacity>
                                    </View>
                                </Modal>
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

function mapStateToProps (state) {
    return {
        uploadIdProofEvent: state.event.uploadIdProofEvent,
        downloadIdProofEvent: state.event.downloadIdProofEvent,
        eventLoginList: state.event.eventLoginList,
        userDetail:state.event.userDetail

    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators({
                uploadIdProofEvent,
                getdownloadIdProofEvent,
                deletedownloadIdProofEvent
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitId);