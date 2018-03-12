import React, { Component } from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'

export class Actions extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  }
  render() {
    return <View style={this.props.style}>{this.props.children}</View>
  }
}
