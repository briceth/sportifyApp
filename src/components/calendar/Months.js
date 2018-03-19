import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { MyText } from '../MyText'
import { Days } from './Days'

export class Months extends Component {
  static propTypes = {
    months: PropTypes.array,
    selectMonthAndDay: PropTypes.func,
    selectHour: PropTypes.func,
    selectedDay: PropTypes.number,
    selectedHour: PropTypes.number
  }

  render() {
    const {
      months,
      selectMonthAndDay,
      selectedDay,
      selectHour,
      selectedHour
    } = this.props

    console.log('this props in months.js', this.props)

    return months.map((month, index) => {
      return (
        <View key={index}>
          <ScrollView horizontal contentContainerStyle={styles.calendar}>
            <TouchableOpacity style={styles.hourContainer}>
              <MyText style={[styles.text]}>{month.month}</MyText>
            </TouchableOpacity>
          </ScrollView>
          <Days
            days={month.days}
            selectMonthAndDay={selectMonthAndDay}
            month={month.month}
            selectHour={selectHour}
            selectedDay={selectedDay}
            selectedHour={selectedHour}
          />
        </View>
      )
    })
  }
}

const styles = StyleSheet.create({
  text: {
    width: 300
  }
})
