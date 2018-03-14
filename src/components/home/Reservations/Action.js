import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import { LIGHTBLUE } from '../../../mainStyle'

export class Action extends Component {
  static propTypes = {
    icon: PropTypes.string,
    style: PropTypes.array,
    handleTouch: PropTypes.func
  }

  render() {
    const { style, icon, handleTouch } = this.props
    console.log('handleTouch : ', handleTouch)
    return (
      <TouchableOpacity style={style} onPress={handleTouch}>
        <Icon name={icon} size={25} color={LIGHTBLUE} />
      </TouchableOpacity>
    )
  }
}
