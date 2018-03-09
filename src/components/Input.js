import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { LINEGREY } from '../mainStyle'

export class Input extends Component {
  render() {
    const { noBorderBottom } = this.props
    const border = noBorderBottom ? {} : styles.border

    return (
      <TextInput
        style={[styles.input, border]}
        placeholder={this.props.placeholder}
        onChangeText={text => this.setState({ text })}
      />
    )
  }
}
const styles = StyleSheet.create({
  input: {
    fontSize: 22,
    height: 65,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: LINEGREY
  }
})
