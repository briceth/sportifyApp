import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { MyText } from '../components/MyText'
import { mainStyles, BLUE } from '../mainStyle'
import PropTypes from 'prop-types'

export class Button extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    children: PropTypes.node
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.handleSubmit}
        style={[styles.button, mainStyles.shadow]}
      >
        <MyText style={[styles.text]}>{this.props.children}</MyText>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: BLUE,
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
