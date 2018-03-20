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
    currentUser: PropTypes.object,
    toggleQrCode: PropTypes.func,
    openRow: PropTypes.func,
    navigation: PropTypes.object
  }

  renderActions = () => {
    const { session, currentUser, navigation } = this.props
    const { role } = currentUser.account

    const sessionInfos = {
      sessionId: session._id,
      activity: session.activity.name,
      // center: session.activity.center.name,
      startsAt: session.startsAt,
      duration: session.duration
      // teacher: session.teacher.account.firstName
    }

    return role === 'teacher' ? (
      <TouchableHighlight
        style={styles.link}
        onPress={() =>
          navigation.navigate('Session', {
            teacher: currentUser._id,
            session: session._id
          })
        }
      >
        <Icon name="arrow-right" size={30} color={'white'} />
      </TouchableHighlight>
    ) : (
      <TouchableHighlight
        underlayColor="#EFEFF4"
        onPress={() => this.props.toggleQrCode(sessionInfos)}
      >
        <Actions style={[styles.actions]}>
          <Icon name="qrcode" size={40} color={BLUE} />
        </Actions>
      </TouchableHighlight>
    )
  }

  render() {
    const { session, style } = this.props

    return (
      <View style={style}>
        <ReservationInfos>
          <MyText>{/* session.activity.center.name */}The center</MyText>
          <MyText style={[mainStyles.boldText]}>{session.activity.name}</MyText>
          <MyText>
            {format(session.startsAt, 'ddd DD MMM [à] HH:mm', { locale: fr })}
          </MyText>
        </ReservationInfos>
        {this.renderActions()}
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
  },
  link: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#59A5FE',
    shadowColor: '#59A5FE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  }
})
