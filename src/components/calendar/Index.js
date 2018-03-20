import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Swiper from 'react-native-swiper'
import { View, StyleSheet } from 'react-native'
import { Days } from './Days'
import { MyText } from '../MyText'
import { capitalize } from 'lodash'

export class Calendar extends Component {
  static propTypes = {
    dates: PropTypes.array,
    selectHour: PropTypes.func,
    selectedHour: PropTypes.number,
    selectedDay: PropTypes.number
  }

  state = {
    isMonthSelected: null,
    selectedDay: null
  }

  // le mois est selectioné en même temps que le jour
  // les heures apparaissent en fonction du jour cliqué
  selectMonthAndDay = (day, month, dayId) => {
    const selectedDay = this.state.selectedDay

    if (selectedDay === dayId) {
      //si il existe tu le supprimes
      this.setState(
        {
          selectedDay: null
        },
        () => {
          console.log('existe', this.state)
        }
      )
    } else {
      //sinon tu l'ajoutes
      this.setState(
        {
          selectedDay: dayId
        },
        () => {
          console.log('existe pas', this.state)
        }
      )
    }
  }

  renderMonths = () => {
    const { dates, selectHour, selectedHour } = this.props
    const { selectedDay } = this.state

    return dates.map((month, index) => {
      return (
        <View key={index}>
          <MyText style={[styles.text]}>{capitalize(month.month)}</MyText>
          <Days
            days={month.days}
            selectMonthAndDay={this.selectMonthAndDay}
            month={month.month}
            selectHour={selectHour}
            selectedDay={selectedDay}
            selectedHour={selectedHour}
          />
        </View>
      )
    })
  }

  render() {
    return <Swiper>{this.renderMonths()}</Swiper>
  }
}

const styles = StyleSheet.create({
  text: {
    width: 300,
    fontSize: 40,
    marginVertical: 10
  }
})
