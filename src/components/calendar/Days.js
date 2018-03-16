import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { MyText } from '../MyText'
import { Hours } from './Hours'
import { DARKBLUE } from '../../mainStyle'
//import { mergeHoursAndIndex } from '../../utils/utils'

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
            hoursObject.push(...day.hours)

            return (
              <View>
                <TouchableOpacity
                  key={index}
                  onPress={() => selectMonthAndDay(day.num, month, day.id)}
                  style={[
                    styles.containerDays,
                    selectedDay == day.id && styles.selectedPan
                  ]}
                >
                  <MyText
                    style={[
                      styles.num,
                      selectedDay == day.id && styles.selectedTextPan
                    ]}
                  >
                    {day.num}
                  </MyText>
                  <MyText
                    style={[
                      styles.letter,
                      selectedDay == day.id && styles.selectedTextPan
                    ]}
                  >
                    {day.letter}
                  </MyText>
                </TouchableOpacity>
              </View>
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
    flex: 1
    //flexDirection: 'row'
  },
  container: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  selectedPan: {
    borderColor: 'red',
    borderWidth: 1
  },
  containerDays: {
    width: 70,
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
    backgroundColor: DARKBLUE
  },
  selectedTextPan: {
    color: 'white'
  }
})
