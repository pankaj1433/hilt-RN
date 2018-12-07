import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Navigate from './src/navigation';
import store from './src/store/configureStore';
import {View, StatusBar, Platform, StyleSheet} from 'react-native';

export default class App extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{...Platform.select({ios:{height:24}, android:{height:0}})}}>
                    <StatusBar barStyle={'dark-content'} hidden={Platform.OS !== 'ios'}/>
                    {/*{Platform.OS === 'ios' && <StatusBar barStyle="default" />}*/}
                    {/*{Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}*/}
                </View>
                <Provider store={store} style={{flex:1}}>
                    <Navigate />
                </Provider>
            </View>
        );
    }
}