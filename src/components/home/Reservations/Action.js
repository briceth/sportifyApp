import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import { LIGHTBLUE } from '../../../mainStyle'

export class Action extends Component {
  static propTypes = {
    icon: PropTypes.string,
    style: PropTypes.array,
    handleTouch: PropTypes.func,
    sessionInfos: PropTypes.object
  }

  render() {
    const { style, icon, handleTouch } = this.props
    return (
      <TouchableOpacity
        style={style}
        onPress={() => handleTouch(this.props.sessionInfos)}
      >
        <Icon name={icon} size={25} color={LIGHTBLUE} />
      </TouchableOpacity>
    )
  }
}
