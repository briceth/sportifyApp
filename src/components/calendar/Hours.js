import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { MyText } from '../MyText'
import { mainStyles, DARKBLUE } from '../../mainStyle'

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
      if (hour._dayId === dayId) {
        return (
          <TouchableOpacity
            onPress={() => selectHour(hour.hour, hour.id, hour.session)}
            key={index}
            style={[
              styles.hourContainer,
              hour.id === selectedHour && styles.selected
            ]}
          >
            <MyText
              style={[
                styles.text,
                hour.id === selectedHour && mainStyles.textSelected
              ]}
            >
              {hour.hour}
            </MyText>
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
  content: {
    marginVertical: 15
  },
  text: {
    fontSize: 15
  },
  hourContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: 'grey',
    borderWidth: 1,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 15
  },
  selected: {
    borderWidth: 0,
    backgroundColor: DARKBLUE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  }
})
