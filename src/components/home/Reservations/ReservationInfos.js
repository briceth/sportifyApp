import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

export class ReservationInfos extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    return <View>{this.props.children}</View>
  }
}
