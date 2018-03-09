import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { LINEGREY } from '../mainStyle'

export class Form extends Component {
  render() {
    return <View style={styles.form}>{this.props.children}</View>
  }
}
const styles = StyleSheet.create({
  form: {
    borderWidth: 1,
    borderColor: LINEGREY,
    width: '80%',
    borderRadius: 15,
    overflow: 'hidden'
  }
})
