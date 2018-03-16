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
    selectedDays: PropTypes.number,
    isHourSelected: PropTypes.number
  }

  render() {
    const {
      months,
      selectMonthAndDay,
      selectedDays,
      selectHour,
      isHourSelected
    } = this.props

    return months.map((months, index) => {
      return (
        <View>
          <ScrollView horizontal contentContainerStyle={styles.calendar}>
            <TouchableOpacity
              //onPress={() => selectMonth(months.month, index)}
              key={index}
              style={[
                styles.hourContainer
                //index === ismonthSelected && styles.selected
              ]}
            >
              <MyText style={[styles.text]}>{months.month}</MyText>
            </TouchableOpacity>
          </ScrollView>
          <Days
            days={months.days}
            selectMonthAndDay={selectMonthAndDay}
            month={months.month}
            selectedDays={selectedDays}
            selectHour={selectHour}
            isHourSelected={isHourSelected}
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
