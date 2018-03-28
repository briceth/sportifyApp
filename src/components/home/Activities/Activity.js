import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  ImageBackground
} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'
import { MyText } from '../../MyText'
import { BLUE } from '../../../mainStyle'
import { startsAt } from '../../../utils/utils'

const AnimatedMyText = Animated.createAnimatedComponent(MyText)
const AnimatedImageBackground = Animated.createAnimatedComponent(
  ImageBackground
)

export class Activity extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    isFavorite: PropTypes.bool,
    data: PropTypes.object,
    width: PropTypes.number,
    goToPlanning: PropTypes.func,
    updateFavorites: PropTypes.func,
    imagePos: PropTypes.object,
    geolocation: PropTypes.object
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

  distance() {
    const { distance } = this.props.data

    if (distance < 1000) return '< 1 km'
    if (distance < 99000) return `${Math.round(distance / 1000)} km`
    return ''
  }

  timeBeforeStartContainer = () => {
    return {
      maxWidth: this.props.width - 100
    }
  }

  render() {
    const {
      geolocation,
      updateFavorites,
      goToPlanning,
      isFavorite,
      imagePos,
      data: { image, name, center, _id, sessions }
    } = this.props

    const ImgParallax = [
      {
        translateY: imagePos.interpolate({
          inputRange: [0, 1],
          outputRange: [-6, 6],
          extrapolate: 'clamp'
        })
      }
    ]

    const TextParallax = [
      {
        translateY: imagePos.interpolate({
          inputRange: [0, 1],
          outputRange: [-4, 4],
          extrapolate: 'clamp'
        })
      }
    ]

    console.tron.display({
      name: 'Kévin',
      preview: '_id',
      value: this.props.data,
      important: true
    })

    const star = isFavorite ? 'star' : 'star-o'

    return (
      <TouchableOpacity
        style={styles.lessonContainer}
        onPress={() => goToPlanning(_id)}
      >
        <AnimatedImageBackground
          resizeMode="cover"
          style={[
            styles.img,
            {
              transform: ImgParallax
            }
          ]}
          source={{
            uri: image
          }}
        >
          <Animated.View
            style={[
              styles.centerContainer,
              {
                transform: TextParallax
              }
            ]}
          >
            <MyText style={[styles.centerText]}>{center}</MyText>
          </Animated.View>

          <TouchableOpacity
            style={styles.starContainer}
            onPress={() => updateFavorites(_id)}
          >
            <Icon name={star} size={30} color={BLUE} />
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.textContainer,
              {
                transform: TextParallax
              }
            ]}
          >
            <MyText style={[styles.nameActivities]}>{name}</MyText>
            {sessions && (
              <View style={this.timeBeforeStartContainer()}>
                <MyText style={[styles.timeBeforeStart]}>
                  Prochaine séance dans {startsAt(sessions)}
                </MyText>
              </View>
            )}
          </Animated.View>

          {geolocation && (
            <View style={styles.distanceContainer}>
              <MyText style={[styles.distance]}>{this.distance()}</MyText>
            </View>
          )}
        </AnimatedImageBackground>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  img: {
    height: 200,
    position: 'relative'
  },
  lessonContainer: {
    marginBottom: 10,
    overflow: 'hidden',
    marginVertical: 10
  },
  centerContainer: {
    top: 10,
    left: -15,
    borderRadius: 3,
    height: 40,
    maxWidth: 170,
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
    bottom: 20,
    left: -15,
    paddingLeft: 30,
    paddingRight: 10,
    paddingBottom: 5,
    borderRadius: 3,
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
