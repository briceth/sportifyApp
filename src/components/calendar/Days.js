import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'
import { MyText } from '../MyText'
import { Hours } from './Hours'
import { BLUE, mainStyles } from '../../mainStyle'
import { manageStyle } from '../../utils/utils'

export class Days extends Component {
  static propTypes = {
    days: PropTypes.array,
    selectMonthAndDay: PropTypes.func,
    selectHour: PropTypes.func,
    selectedDay: PropTypes.number,
    month: PropTypes.string,
    selectedHour: PropTypes.number
  }

  state = {
    animatedValue: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 400
    }).start()
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
        <Animated.View
          style={
            ({ opacity: this.state.animatedValue },
            {
              transform: [
                { scale: this.state.animatedValue },
                {
                  rotate: this.state.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['35deg', '0deg'],
                    extrapolate: 'clamp'
                  })
                }
              ]
            })
          }
        >
          <ScrollView horizontal contentContainerStyle={styles.content}>
            {days.map((day, index) => {
              hoursObject.push(...day.hours)

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectMonthAndDay(day.num, month, day.id)}
                  style={[
                    styles.containerDays,
                    selectedDay === day.id && styles.selectedPan
                  ]}
                >
                  <MyText
                    style={[
                      styles.num,
                      selectedDay === day.id && styles.selectedTextPan
                    ]}
                  >
                    {day.num}
                  </MyText>
                  <MyText
                    style={[
                      styles.letter,
                      selectedDay === day.id && styles.selectedTextPan
                    ]}
                  >
                    {day.letter}
                  </MyText>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </Animated.View>
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

const { height, width } = Dimensions.get('window')
const { fontsize } = manageStyle(height, width)
//console.log('days fontsize', fontsize)

const styles = StyleSheet.create({
  content: {
    marginVertical: 5
  },
  selectedPan: {
    borderColor: 'red',
    borderWidth: 1
  },
  containerDays: {
    width: 70,
    borderWidth: 0.8,
    marginRight: 5,
    borderRadius: 4,
    paddingVertical: 5,
    borderColor: 'grey',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  num: {
    fontSize: 20 - fontsize, // for iphone SE responsiveness
    fontWeight: '500'
  },
  letter: {
    fontSize: 16 - fontsize // for iphone SE responsiveness
  },
  selectedPan: {
    backgroundColor: BLUE
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2
  },
  selectedTextPan: {
    color: 'white'
  }
})
