import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { MyText } from '../components/MyText'
import { mainStyles } from '../mainStyle'
import { DARKBLUE } from '../mainStyle'

export class Button extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.button}>
        <MyText style={styles.text}>{this.props.children}</MyText>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: DARKBLUE,
    width: 200,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 25
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600'
  }
})
