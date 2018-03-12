import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { LINEGREY } from '../mainStyle'
import PropTypes from 'prop-types'

export class Input extends Component {
  static propTypes = {
    data: PropTypes.string,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    noBorderBottom: PropTypes.bool,
    handleInputs: PropTypes.func,
    secureTextEntry: PropTypes.bool,
    noCapitalize: PropTypes.bool
  }

  render() {
    const {
      placeholder,
      data,
      noBorderBottom,
      text,
      handleInputs,
      secureTextEntry,
      noCapitalize
    } = this.props

    const border = noBorderBottom ? {} : styles.border

    return (
      <TextInput
        autoCapitalize={noCapitalize && 'none'}
        secureTextEntry={secureTextEntry}
        style={[styles.input, border]}
        placeholder={placeholder}
        value={text}
        onChangeText={text => handleInputs(text, data)}
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
