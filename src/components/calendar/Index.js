import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import PropTypes from 'prop-types'
import { parse, format } from 'date-fns'
import { MyText } from '../MyText'
import { DARKBLUE } from '../../mainStyle'
const log = console.log

export class Calendar extends Component {
  static propTypes = {
    sessions: PropTypes.array
  }

  state = {
    isDaySelected: null,
    isHourSelected: null,
    day: {},
    hour: ''
  }

  selectHour = (hour, index) => {
    this.setState({ hour, isHourSelected: index })
  }

  renderHours = () => {
    const { sessions } = this.props
    const { isHourSelected } = this.state

    const { hours } = this.formatDate(sessions.map(session => session.startsAt))

    return hours.map((hour, index) => {
      return (
        <TouchableOpacity
          onPress={() => this.selectHour(hour, index)}
          key={index}
          style={[
            styles.hourContainer,
            index === isHourSelected && styles.selected
          ]}
        >
          <Text>{hour}</Text>
        </TouchableOpacity>
      )
    })
  }

  selectday = (day, index) => {
    this.setState({ day, isDaySelected: index })
  }

  formatDate = dates => {
    //log(dates.map(date => format(parse(date), 'MM DD YYYY HH:MM')))
    const days = dates.map(date => {
      return {
        letter: format(parse(date), 'ddd'), //SUN, MON, TUE
        num: format(parse(date), 'DD') //07, 08, 09
      }
    })
    const months = dates.map(date => format(parse(date), 'MM')) //04, 05, 11
    const hours = dates.map(date => format(parse(date), 'HH:MM')) //14:00, 11:30, 15:00
    return { days, months, hours }
  }

  renderDays = () => {
    const { sessions } = this.props
    const { isDaySelected } = this.state

    const { days, months } = this.formatDate(
      sessions.map(session => session.startsAt)
    )

    return days.map((day, index) => {
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
            style={[
              styles.letter,
              index === isDaySelected && styles.selectedTextPan
            ]}
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
