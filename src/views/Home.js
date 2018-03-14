import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { Reservations } from '../components/home/Reservations'
import { Activities } from '../components/home/Activities'
import { mainStyles } from '../mainStyle'

export class Home extends Component {
  render() {
    return (
      <ScrollView style={mainStyles.containerFlex}>
        <Reservations />
        <Activities />
      </ScrollView>
    )
  }
}
