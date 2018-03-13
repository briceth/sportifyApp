import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import { LIGHTBLUE } from '../../../mainStyle'

export class Action extends Component {
  static propTypes = {
    icon: PropTypes.string,
    style: PropTypes.array
  }
  render() {
    return (
      <TouchableOpacity style={this.props.style}>
        <Icon name={this.props.icon} size={40} color={LIGHTBLUE} />
      </TouchableOpacity>
    )
  }
}
