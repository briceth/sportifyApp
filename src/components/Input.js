import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { LINEGREY } from '../mainStyle'
import { BLACK } from '../mainStyle'
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
      noCapitalize,
      autoCorrect
    } = this.props

    const border = noBorderBottom ? {} : styles.border

    return (
      <TextInput
        autoCorrect={autoCorrect}
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
    fontSize: 16,
    height: 45,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: BLACK
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: LINEGREY
  }
})
