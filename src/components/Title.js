import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { DARKBLUE, LIGHTBLUE } from '../mainStyle'

export class Title extends Component {
  render() {
    const { fontSize } = this.props
    return (
      <Text style={[styles.logo]}>
        Sporti<Text style={styles.subLogo}>fy</Text>
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 70,
    color: DARKBLUE,
    textAlign: 'center'
  },
  subLogo: {
    color: LIGHTBLUE
  }
})
