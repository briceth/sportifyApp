import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { MyText } from '../MyText'
import { Hours } from './Hours'
import { DARKBLUE } from '../../mainStyle'
import { mergeHoursAndIndex } from '../../utils/utils'

export class Days extends Component {
  static propTypes = {
    days: PropTypes.array,
    selectMonthAndDay: PropTypes.func,
    selectHour: PropTypes.func,
    selectedDays: PropTypes.array,
    month: PropTypes.string,
    isHourSelected: PropTypes.number
  }

  render() {
    const {
      days,
      selectMonthAndDay,
      selectedDays,
      month,
      selectHour,
      isHourSelected
    } = this.props

    const hoursObject = []

    return (
      <View>
        <ScrollView horizontal contentContainerStyle={styles.content}>
          {days.map((day, index) => {
            hoursObject.push(...mergeHoursAndIndex(day.hours, index))

            return (
              <View>
                <TouchableOpacity
                  key={index}
                  onPress={() => selectMonthAndDay(day.num, month, index)}
                  style={[
                    styles.containerDays,
                    index === selectedDays && styles.selectedPan
                  ]}
                >
                  <MyText
                    style={[
                      styles.num,
                      index === selectedDays && styles.selectedTextPan
                    ]}
                  >
                    {day.num}
                  </MyText>
                  <MyText
                    style={[
                      styles.letter,
                      index === selectedDays && styles.selectedTextPan
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
          dayId={selectedDays}
          isHourSelected={isHourSelected}
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
