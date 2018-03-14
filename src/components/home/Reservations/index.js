import config from '../../../../config'
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { mainStyles, BLACK, LIGHTBLUE } from '../../../mainStyle'
import { Reservation } from './Reservation'
import { ReservationInfos } from './ReservationInfos'
import { Actions } from './Actions'
import { Action } from './Action'
import PropTypes from 'prop-types'
import axios from 'axios'
import store from 'react-native-simple-store'

export class Reservations extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.array
  }

  state = {
    loading: true,
    reservations: []
  }

  componentDidMount = async () => {
    const currentUser = await store.get('currentUser')
    console.log('user after async ', currentUser)
    axios
      .get(`${config.API_URL}/api/users/${currentUser._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState(
            { reservations: response.data.account.sessions },
            () => {
              console.log('State reservations : ', this.state.reservations)
            }
          )
        }
      })
      .catch(e => {
        console.log('Error when fetching sessions of the user :', e)
        console.log('Response :', e.response)
        if (e.response.status === 401) {
          this.setState({ flashAlert: true })
        }
      })
    this.setState({ loading: false })
  }

  renderReservations = () => {
    if (this.state.loading) return <Text>'loading...'</Text>
    const reservations = this.state.reservations.map((session, index) => {
      console.log(session)
      return (
        <Reservation
          style={[styles.reservation, mainStyles.shadow]}
          key={index}
        >
          <ReservationInfos>
            <Text style={mainStyles.boldText}>{session.activity.name}</Text>
            <Text>Hello</Text>
          </ReservationInfos>
          <Actions style={[styles.actions]}>
            <Action icon="qrcode" style={[styles.action]} />
            <Action icon="cog" style={[styles.action]} />
          </Actions>
        </Reservation>
      )
    })

    return [
      <Text key="title" style={mainStyles.title}>
        Mes réservations
      </Text>,
      reservations
    ]
  }

  render() {
    return <View style={this.props.style}>{this.renderReservations()}</View>
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
    // backgroundColor: 'red',
    flexDirection: 'row'
  },
  action: {
    marginLeft: 15
  }
})
