import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { MyText } from '../MyText'
import { DARKBLUE } from '../../mainStyle'
const log = console.log

export class Calendar extends Component {
  state = {
    isDaySelected: null,
    isHourSelected: null,
    day: {},
    hour: ''
  }

  selectHour = (hour, index) => {
    this.setState({ hour, isHourSelected: index }, () => {
      log(this.state)
    })
  }

  renderHours = () => {
    const { isHourSelected } = this.state

    if (this.state.isDaySelected !== null) {
      return ['10:00', '10:30', '11:00', '15:00', '19:00', '21:00'].map(
        (hour, index) => {
          return (
            <TouchableOpacity
              onPress={() => this.selectHour(hour, index)}
              key={index}
              style={[
                styles.hourContainer,
                index === isHourSelected && styles.selected
              ]}
            >
              <Text>{hour} am</Text>
            </TouchableOpacity>
          )
        }
      )
    }
  }

  selectday = (day, index) => {
    this.setState({ day, isDaySelected: index }, () => {
      console.log('this state', this.state)
    })
  }

  renderDays = () => {
    const { isDaySelected } = this.state
    return [
      { num: '22', letter: 'SUN' },
      { num: '23', letter: 'MON' },
      { num: '24', letter: 'TUE' },
      { num: '25', letter: 'WED' },
      { num: '26', letter: 'FRI' },
      { num: '27', letter: 'SAT' },
      { num: '28', letter: 'SUN' }
    ].map((day, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => this.selectday(day, index)}
          style={[
            styles.containerDays,
            index === isDaySelected && styles.selectedPan
          ]}
        >
          <MyText
            style={[
              styles.num,
              index === isDaySelected && styles.selectedTextPan
            ]}
          >
            {day.num}
          </MyText>
          <MyText
            style={
              (styles.letter, index === isDaySelected && styles.selectedTextPan)
            }
          >
            {day.letter}
          </MyText>
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <View>
        <ScrollView horizontal contentContainerStyle={styles.calendar}>
          {this.renderDays()}
        </ScrollView>
        <ScrollView horizontal contentContainerStyle={styles.calendar}>
          {this.renderHours()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#ddd',
    borderBottomWidth: 1
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
  },
  hourContainer: {
    width: 80,
    paddingVertical: 15,
    paddingLeft: 15
  },
  selected: {
    borderBottomWidth: 1,
    borderColor: DARKBLUE
  }
})
