import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Reservations } from '../components/home/Reservations'
import { Reservation } from '../components/home/Reservations/Reservation'
import { ReservationInfos } from '../components/home/Reservations/ReservationInfos'
import { mainStyles, BLACK } from '../mainStyle'
import { Actions } from '../components/home/Reservations/Actions'

export class Home extends Component {
  state = {
    loading: true,
    reservations: []
  }

  componentDidMount = () => {
    this.setState({ loading: false })
  }

  renderHome = () => {
    console.log('render home')
    // if (this.state.loading) return <Text>'loading...'</Text>
    return this.state.loading ? (
      <Text>'loading...'</Text>
    ) : (
      <Reservations>
        <Text style={mainStyles.title}>Mes réservations</Text>
        <Reservation style={[styles.reservation, mainStyles.shadow]}>
          <ReservationInfos>
            <Text>Mes infos resa</Text>
          </ReservationInfos>
          <Actions style={styles.actions}>
            <Text>Delete</Text>
          </Actions>
        </Reservation>
      </Reservations>
    )
  }

  render() {
    console.log('render')
    return <View style={mainStyles.containerPadded}>{this.renderHome()}</View>
  }
}

const styles = StyleSheet.create({
  reservation: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
    // borderWidth: 1,
    // borderColor: BLACK
  },
  actions: {
    backgroundColor: 'red'
  }
})
