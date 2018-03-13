import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'
import PropTypes from 'prop-types'
import { mainStyles } from '../../../mainStyle'
import { Actions } from './Actions'
import { Action } from './Action'
import { MyText } from '../../MyText'
import { format } from 'date-fns'
import { ReservationInfos } from './ReservationInfos'
import fr from 'date-fns/locale/fr'

const deleteBtnWidth = 130

export class Reservation extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.array,
    session: PropTypes.object
  }

  state = {
    deleteBtnFromRight: new Animated.Value(-deleteBtnWidth)
  }

  showDeleteBtn = () => {
    console.log('In show delete btn')
    Animated.timing(
      // Animate over time
      this.state.deleteBtnFromRight, // The animated value to drive
      {
        toValue: 0, // Animate to right: 0
        duration: 200
      }
    ).start() // Starts the animation
  }

  hideDeleteBtn = () => {
    Animated.timing(
      // Animate over time
      this.state.deleteBtnFromRight, // The animated value to drive
      {
        toValue: -deleteBtnWidth, // Animate to right: 0
        duration: 200
      }
    ).start() // Starts the animation
  }

  render() {
    const { session, style } = this.props
    const { deleteBtnFromRight } = this.state
    return [
      <View style={style}>
        <ReservationInfos>
          <MyText style={mainStyles.boldText}>{session.activity.name}</MyText>
          <MyText>{session.activity.center.name}</MyText>
          <MyText>
            {format(session.startsAt, 'ddd DD MMM [à] HH:mm', { locale: fr })}
          </MyText>
        </ReservationInfos>
        <Actions style={[styles.actions]}>
          <Action icon="qrcode" style={[styles.action]} />
          <Action
            icon="trash"
            style={[styles.action]}
            handleTouch={this.showDeleteBtn}
          />
        </Actions>
        <Animated.View
          style={[styles.deleteBtn, { right: deleteBtnFromRight }]}
        >
          <TouchableOpacity
            style={styles.deleteTouch}
            onPress={() =>
              Alert.alert(
                'Confirmation',
                'Etes vous sûr de vouloir supprimer cette réservation ?',
                [
                  {
                    text: 'Annuler',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                  },
                  {
                    text: 'Supprimer',
                    onPress: () => console.log('OK Pressed'),
                    style: 'destructive'
                  }
                ],
                { cancelable: false }
              )
            }
          >
            <MyText style={styles.deleteTxt}>Delete</MyText>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
  },
  deleteBtn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'red',
    alignItems: 'center',
    width: deleteBtnWidth
  },
  deleteTouch: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: deleteBtnWidth - 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25
  }
})
