import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'
import { MyText } from '../../MyText'
import { BLUE } from '../../../mainStyle'
import { startsAt } from '../../../utils/utils'
// import { distanceInWords } from 'date-fns'
// import Fr from 'date-fns/locale/fr'

export class Activity extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    isFavorite: PropTypes.bool,
    data: PropTypes.object,
    width: PropTypes.number,
    goToPlanning: PropTypes.func,
    updateFavorites: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      start: null,
      isFavorite: props.isFavorite
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.geolocation !== this.props.geolocation ||
      nextProps.isFavorite !== this.props.isFavorite ||
      nextState.start != this.state.start
    ) {
      return true
    }
    return false
  }

  // startsAt() {
  //   return distanceInWords(this.props.data.sessions, new Date(), {
  //     locale: frLocale
  //   })
  // }

  distance() {
    const { distance } = this.props.data
    if (distance < 1000) return '-1'
    if (distance < 99000) return Math.round(distance / 1000)
    return '+99'
  }

  timeBeforeStartContainer = function() {
    return {
      maxWidth: this.props.width - 100
    }
  }

  render() {
    const { image, name, center, _id, sessions } = this.props.data
    const { start } = this.state

    const star = this.props.isFavorite ? 'star' : 'star-o'
    return (
      <TouchableOpacity
        style={styles.lessonContainer}
        onPress={() => this.props.goToPlanning(_id)}
      >
        <Image
          resizeMode="cover"
          style={{ height: 200 }}
          source={{
            uri: image
          }}
        />

        <View style={styles.blackfilter} />

        <View style={styles.centerContainer}>
          <MyText style={[styles.centerText]}>{center}</MyText>
        </View>

        <TouchableOpacity
          style={styles.starContainer}
          onPress={() => this.props.updateFavorites(_id)}
        >
          <Icon name={star} size={30} color={BLUE} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <MyText style={[styles.nameActivities]}>{name}</MyText>
          {sessions && (
            <View style={this.timeBeforeStartContainer()}>
              <MyText style={[styles.timeBeforeStart]}>
                Prochaine scéance dans {startsAt(this.props.data.sessions)}
              </MyText>
            </View>
          )}
        </View>

        {this.props.geolocation && (
          <View style={styles.distanceContainer}>
            <MyText style={[styles.distance]}>{this.distance()} km</MyText>
          </View>
        )}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  lessonContainer: {
    marginBottom: 10
  },
  centerContainer: {
    position: 'absolute',
    top: 0,
    left: 20,
    height: 40,
    minWidth: 170,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16
  },
  starContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  textContainer: {
    position: 'absolute',
    bottom: 30,
    left: -10,
    paddingLeft: 30,
    paddingRight: 10,
    paddingBottom: 5,
    borderRadius: 4,
    backgroundColor: BLUE
  },
  nameActivities: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white'
  },
  timeBeforeStart: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  distanceContainer: {
    position: 'absolute',
    bottom: 35,
    right: 20
  },
  distance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  blackfilter: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  }
})
