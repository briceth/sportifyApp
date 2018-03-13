import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { MyText } from '../MyText'
import { DARKBLUE } from '../../mainStyle'

export class CallToAction extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.button]}>
        <MyText style={styles.text}>{this.props.children}</MyText>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 103,
    backgroundColor: DARKBLUE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 15,
    borderRadius: 5
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600'
  }
})
