import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

export class Reservation extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.array
  }
  render() {
    return <View style={this.props.style}>{this.props.children}</View>
  }
}
