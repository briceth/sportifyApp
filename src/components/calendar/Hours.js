import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { MyText } from '../MyText'
import { DARKBLUE } from '../../mainStyle'

export class Hours extends Component {
  static propTypes = {
    hours: PropTypes.array,
    dayId: PropTypes.number,
    selectHour: PropTypes.func,
    isHourSelected: PropTypes.number
  }

  renderHours = () => {
    const { hours, dayId, selectHour, isHourSelected } = this.props
    // si l'id de l'heure (donné dans le mergeObject) correspond au jour cliqué,
    // tu affiches les heures
    return hours.map((hours, index) => {
      if (hours.id === dayId) {
        return (
          <TouchableOpacity
            onPress={() => selectHour(hours.hour, index)}
            key={index}
            style={[
              styles.hourContainer,
              index === isHourSelected && styles.selected
            ]}
          >
            <MyText>{hours.hour}</MyText>
          </TouchableOpacity>
        )
      }
      return null
    })
  }

  render() {
    return (
      <ScrollView horizontal contentContainerStyle={styles.content}>
        {this.renderHours()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
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
