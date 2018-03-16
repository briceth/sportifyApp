import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Months } from './Months'

export class Calendar extends Component {
  static propTypes = {
    dates: PropTypes.array
  }

  state = {
    isMonthSelected: null,
    selectedDays: [],
    isHourSelected: null,
    month: '',
    day: '',
    hour: ''
  }

  // le mois est selectioné en même temps que le jour
  // les heures apparaissent en fonction du jour cliqué
  selectMonthAndDay = (day, month, id) => {
    console.log('id', id)
    this.setState({
      month,
      day,
      isDaySelected: [...this.state.selectedDays, id]
    })
  }

  selectHour = (hour, index) => {
    this.setState({ hour, isHourSelected: index }, () => {
      console.log('this state', this.state)
    })
  }

  render() {
    return (
      <View>
        <Months
          months={this.props.dates}
          selectMonthAndDay={this.selectMonthAndDay}
          selectHour={this.selectHour}
          selectedDays={this.state.selectedDays}
          isHourSelected={this.state.isHourSelected}
        />
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
  }
})
