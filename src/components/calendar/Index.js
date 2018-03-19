import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Months } from './Months'

export class Calendar extends Component {
  static propTypes = {
    dates: PropTypes.array,
    selectHour: PropTypes.func,
    selectedHour: PropTypes.number
  }

  state = {
    isMonthSelected: null,
    selectedDay: null
    //month: ''
    //day: ''
    // selectedHour: null,
    // sessionId: null,
    // hour: '',
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
          //month,
          //day,
          selectedDay: dayId
        },
        () => {
          console.log('existe pas', this.state)
        }
      )
    }
  }

  // selectHour = (hour, hourId, sessionId) => {
  //   const selectHour = this.state.selectedHour

  //   if (selectHour === hourId) {
  //     // si il existe tu le supprimes
  //     this.setState({ selectedHour: null })
  //   } else {
  //     // sinon tu l'ajoutes
  //     this.setState({ hour, selectedHour: hourId, sessionId }, () => {
  //       console.log('this state', this.state)
  //     })
  //   }
  // }

  render() {
    return (
      <View>
        <Months
          months={this.props.dates}
          selectMonthAndDay={this.selectMonthAndDay}
          selectHour={this.props.selectHour}
          selectedDay={this.state.selectedDay}
          selectedHour={this.props.selectedHour}
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
