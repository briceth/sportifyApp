import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

export class MyText extends Component {
  render() {
    return (
      <Text style={[styles.font, this.props.style]}>{this.props.children}</Text>
    )
  }
}

const styles = StyleSheet.create({
  font: { fontFamily: 'Quicksand' }
})
