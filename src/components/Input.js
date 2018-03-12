import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { LINEGREY } from '../mainStyle'
import { BLACK } from '../mainStyle'

export class Input extends Component {
  render() {
    const { noBorderBottom } = this.props
    const border = noBorderBottom ? {} : styles.border

    return (
      <TextInput
        style={[styles.input, border]}
        placeholder={this.props.placeholder}
      />
    )
  }
}
const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    height: 55,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: BLACK
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: LINEGREY
  }
})
