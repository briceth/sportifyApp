import React, { Component } from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import { mainStyles, BLUE } from '../../../mainStyle'
import { Actions } from './Actions'
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
    console.tron.display({
      name: 'Jerome Debug',
      preview: 'session',
      value: session,
      important: true
    })
    const sessionInfos = {
      sessionId: session._id,
      activity: session.activity.name,
      // center: session.activity.center.name,
      startsAt: session.startsAt,
      duration: session.duration,
      teacher: session.teacher.firstName
    }

    return (
      <View style={style}>
        <ReservationInfos>
          <MyText style={[mainStyles.boldText]}>{session.activity.name}</MyText>
          <MyText>{/* session.activity.center.name */}The center</MyText>
          <MyText>
            {format(session.startsAt, 'ddd DD MMM [à] HH:mm', { locale: fr })}
          </MyText>
        </ReservationInfos>
        <TouchableHighlight
          underlayColor="#EFEFF4"
          onPress={() => this.props.toggleQrCode(sessionInfos)}
        >
          <Actions style={[styles.actions]}>
            <Icon name="qrcode" size={40} color={BLUE} />
          </Actions>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  }
})
