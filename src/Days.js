import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { MyText } from '../MyText'
import { Hours } from './Hours'
import { DARKBLUE } from '../../mainStyle'

export class Days extends Component {
  static propTypes = {
    days: PropTypes.array,
    selectMonthAndDay: PropTypes.func,
    selectHour: PropTypes.func,
    selectedDay: PropTypes.number,
    month: PropTypes.string,
    selectedHour: PropTypes.number
  }

  render() {
    const {
      days,
      selectMonthAndDay,
      selectedDay,
      month,
      selectHour,
      selectedHour
    } = this.props

    const hoursObject = []

    return (
      <View>
        <ScrollView horizontal contentContainerStyle={styles.content}>
          {days.map((day, index) => {
            // console.log('day hours', day)

            hoursObject.push(...day.hours)

            return (
              <TouchableOpacity
                key={index}
                onPress={() => selectMonthAndDay(day.num, month, day.id)}
                style={[
                  styles.containerDays,
                  selectedDay === day.id && styles.selectedPan
                ]}
              >
                <MyText
                  style={[
                    styles.num,
                    selectedDay === day.id && styles.selectedTextPan
                  ]}
                >
                  {day.num}
                </MyText>
                <MyText
                  style={[
                    styles.letter,
                    selectedDay === day.id && styles.selectedTextPan
                  ]}
                >
                  {day.letter}
                </MyText>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        <Hours
          selectHour={selectHour}
          hours={hoursObject}
          dayId={selectedDay}
          selectedHour={selectedHour}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginVertical: 5
  },

  selectedPan: {
    borderColor: 'red',
    borderWidth: 1
  },
  containerDays: {
    width: 70,
    borderWidth: 0.5,
    marginRight: 5,
    borderRadius: 4,
    paddingVertical: 5,
    borderColor: 'grey',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  num: {
    fontSize: 20,
    fontWeight: '500'
  },
  letter: {
    fontSize: 16
  },
  selectedPan: {
    backgroundColor: DARKBLUE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  selectedTextPan: {
    color: 'white'
  }
})
