import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'
import { MyText } from '../MyText'
import { mainStyles, BLUE } from '../../mainStyle'
import { manageStyle } from '../../utils/utils'

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

const { height, width } = Dimensions.get('window')
const { marginVertical, fontsize } = manageStyle(height, width)
// console.log('hours fontsize', marginVertical, fontsize)

const styles = StyleSheet.create({
  content: {
    marginVertical: 10 // to change
  },
  text: {
    fontSize: 16 - fontsize // to change
  },
  hourContainer: {
    width: 50 - marginVertical, // to change
    height: 50 - marginVertical, // to change
    borderRadius: 25,
    borderColor: 'grey',
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  selected: {
    borderWidth: 0,
    backgroundColor: BLUE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  }
})
