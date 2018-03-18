import React, { Component } from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import { mainStyles } from '../../../mainStyle'
import { Actions } from './Actions'
import { Action } from './Action'
import { MyText } from '../../MyText'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import { ReservationInfos } from './ReservationInfos'

export class Reservation extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.array,
    session: PropTypes.object,
    toggleQrCode: PropTypes.func,
    openRow: PropTypes.func
  }

  render() {
    const { session, style } = this.props
    console.log('Session info in reservation : ', session)
    const sessionInfos = {
      sessionId: session._id,
      activity: session.activity.name,
      center: session.activity.center.name,
      startsAt: session.startsAt,
      duration: session.duration,
      teacher: session.teacher.account.firstName
    }

    return [
      <TouchableHighlight
        key={session._id}
        onPress={() => this.props.toggleQrCode(sessionInfos)}
      >
        <View style={style}>
          <ReservationInfos>
            <MyText style={[mainStyles.boldText]}>
              {session.activity.name}
            </MyText>
            <MyText>{session.activity.center.name}</MyText>
            <MyText>
              {format(session.startsAt, 'ddd DD MMM [à] HH:mm', { locale: fr })}
            </MyText>
          </ReservationInfos>
          <Actions style={[styles.actions]}>
            <Action
              icon="qrcode"
              style={[styles.action]}
              // handleTouch={this.props.toggleQrCode}
              // sessionInfos={sessionInfos}
            />
          </Actions>
        </View>
      </TouchableHighlight>
    ]
  }
}

const styles = StyleSheet.create({
  actions: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center'
  },
  action: {
    marginLeft: 20
  }
})
