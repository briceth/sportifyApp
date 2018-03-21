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
    selectedDay: null,
    monthIndex: 0
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

  onSwipe = index => {
    console.log(this.props)
    console.log('index swipe', index)
    this.setState({ monthIndex: index })
  }

  renderDays = () => {
    const { dates, selectHour, selectedHour } = this.props
    const { selectedDay } = this.state

    const month = dates[this.state.monthIndex]
    // console.log('dates[this.state.monthIndex]', dates[this.state.monthIndex])
    return (
      <Days
        key="days"
        days={month.days}
        selectMonthAndDay={this.selectMonthAndDay}
        month={month.month}
        selectHour={selectHour}
        selectedDay={selectedDay}
        selectedHour={selectedHour}
      />
    )
  }

  renderMonths = () => {
    const { dates } = this.props

    return dates.map((month, index) => {
      return (
        <View key={index}>
          <MyText style={[styles.text]}>{capitalize(month.month)}</MyText>
        </View>
      )
    })
  }

  render() {
    return [
      <Swiper
        style={styles.wrapper}
        key="swip"
        showsButtons={false}
        showsPagination={false}
        onIndexChanged={this.onSwipe}
      >
        {this.renderMonths()}
      </Swiper>,
      this.renderDays()
    ]
  }
}

const styles = StyleSheet.create({
  wrapper: {
    //backgroundColor: 'green'
  },

  text: {
    width: 300,
    fontSize: 40,
    marginVertical: 10
  }
})
