import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Swiper from 'react-native-swiper'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Days } from './Days'
import { MyText } from '../MyText'
import { capitalize } from 'lodash'
import { manageStyle } from '../../utils/utils'

export class Calendar extends Component {
  static propTypes = {
    dates: PropTypes.array,
    selectHour: PropTypes.func,
    onSwipeDay: PropTypes.func,
    selectedHour: PropTypes.number,
    selectedDay: PropTypes.number
  }

  state = {
    isMonthSelected: null,
    selectedDay: null,
    monthIndex: 0
  }

  componentDidMount() {
    const { dates } = this.props
    //mettre par défaut le premier jour du premier mois
    this.setState({ selectedDay: dates[0].days[0].id })
  }

  // le mois est selectionné en même temps que le jour
  // les heures apparaissent en fonction du jour cliqué
  selectMonthAndDay = (day, month, dayId) => {
    const { selectedDay } = this.state
    const { onSwipeDay } = this.props

    if (selectedDay !== dayId) {
      //si il n'existe pas dans le state tu l'ajoutes
      this.setState(
        {
          selectedDay: dayId
        },
        () => {
          onSwipeDay()
          console.log('existe pas', this.state)
        }
      )
    }
  }

  onSwipe = index => {
    const { dates, onSwipeDay } = this.props
    this.setState(
      {
        monthIndex: index,
        selectedDay: dates[index].days[0].id //mettre par défaut le premier jour du mois suivant
      },
      () => onSwipeDay() // on change de jour, du coup le boutton n'est plus bleu
    )
  }

  renderDays = () => {
    const { dates, selectHour, selectedHour } = this.props
    const { selectedDay, monthIndex } = this.state
    const month = dates[monthIndex]

    return (
      <Days
        key="days"
        days={month.days}
        selectMonthAndDay={this.selectMonthAndDay}
        month={month.month}
        selectHour={selectHour}
        selectedDay={selectedDay}
        selectedHour={selectedHour}
      />
    )
  }

  renderMonths = () => {
    const { dates } = this.props

    return dates.map((month, index) => {
      return (
        <View key={index}>
          <MyText style={[styles.text]}>{capitalize(month.month)}</MyText>
        </View>
      )
    })
  }

  render() {
    return [
      <Swiper
        key="swip"
        showsButtons={false}
        showsPagination={false}
        onIndexChanged={this.onSwipe}
      >
        {this.renderMonths()}
      </Swiper>,
      this.renderDays()
    ]
  }
}

const { height, width } = Dimensions.get('window')
const { title } = manageStyle(height, width)
//console.log('index title', title)

const styles = StyleSheet.create({
  text: {
    fontSize: 40 - title // 40 //title
  }
})
