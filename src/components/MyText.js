import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export class MyText extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.array
  }

  render() {
    return (
      <Text style={[styles.font, this.props.style]}>{this.props.children}</Text>
    )
  }
}

const styles = StyleSheet.create({
  font: { fontFamily: 'Quicksand' }
})
