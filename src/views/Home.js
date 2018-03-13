import React, { Component } from 'react'
import { View } from 'react-native'
import { Reservations } from '../components/home/Reservations'
import { mainStyles } from '../mainStyle'

export class Home extends Component {
  render() {
    return (
      <View style={mainStyles.containerPadded}>
        <Reservations />
      </View>
    )
  }
}
