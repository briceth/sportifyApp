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
    selectedHour: PropTypes.number
  }

  renderHours = () => {
    const { hours, dayId, selectHour, selectedHour } = this.props
    // si l'id de l'heure (donné dans le mergeObject) correspond au jour cliqué,
    // tu affiches les heures
    return hours.map((hour, index) => {
      //console.log(hour, dayId)

      if (hour._dayId === dayId) {
        return (
          <TouchableOpacity
            onPress={() => selectHour(hour.hour, hour.id)}
            key={index}
            style={[
              styles.hourContainer,
              hour.id === selectedHour && styles.selected
            ]}
          >
            <MyText>{hour.hour}</MyText>
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
