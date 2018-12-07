import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'

export const asyncGet = (key) => {
   return AsyncStorage.getItem(key)
}

export const asyncPost = (key,value) => {
    AsyncStorage.setItem(key, value);
}

export const asyncRemove = (key) => {
  AsyncStorage.removeItem(key);
}