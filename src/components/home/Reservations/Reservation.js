import React, { Component } from 'react'
import { Animated, View, StyleSheet, TouchableHighlight } from 'react-native'
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

  constructor(props) {
    super(props)

    this._animated = new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(this._animated, {
      toValue: 1,
      duration: 250
    }).start()
  }

  renderActions = () => {
    const {
      session: {
        _id: sessionId,
        startsAt,
        duration,
        teacher: { firstName: teacher },
        activity: { name: activity, center: { name: center } }
      },
      currentUser: { _id: currentUserId, account: { role } },
      navigation
    } = this.props

    // warning
    const sessionInfos = {
      sessionId,
      activity,
      center,
      startsAt,
      duration,
      teacher
    }

    return role === 'teacher' ? (
      <TouchableHighlight
        style={styles.link}
        onPress={() =>
          navigation.navigate('Session', {
            teacher: currentUserId,
            session: sessionId
          })
        }
      >
        <Icon name="arrow-right" size={30} color={'white'} />
      </TouchableHighlight>
    ) : (
      <TouchableHighlight
        underlayColor="#EFEFF4"
        //onPress={() => this.props.toggleQrCode(this.props.session)}
        onPress={() => this.props.toggleQrCode(sessionInfos)}
      >
        <Actions style={[styles.actions]}>
          <Icon name="qrcode" size={40} color={BLUE} />
        </Actions>
      </TouchableHighlight>
    )
  }

  render() {
    const {
      style,
      session: {
        startsAt,
        activity: { name: activity, center: { name: center } }
      }
    } = this.props

    return (
      <Animated.View style={[style]}>
        <ReservationInfos>
          <MyText style={[mainStyles.boldText]}>{activity}</MyText>
          <MyText>{center}</MyText>
          <MyText>
            {format(startsAt, 'ddd DD MMM [à] HH:mm', { locale: fr })}
          </MyText>
        </ReservationInfos>
        {this.renderActions()}
      </Animated.View>
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
