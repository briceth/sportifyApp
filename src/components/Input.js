import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { LINEGREY } from '../mainStyle'
<<<<<<< HEAD
import { BLACK } from '../mainStyle'
=======
import PropTypes from 'prop-types'
>>>>>>> 3f5d3acad69a86f3fcbfe261ad9ba0446384280b

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
<<<<<<< HEAD
        placeholder={this.props.placeholder}
=======
        placeholder={placeholder}
        value={text}
        onChangeText={text => handleInputs(text, data)}
>>>>>>> 3f5d3acad69a86f3fcbfe261ad9ba0446384280b
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
