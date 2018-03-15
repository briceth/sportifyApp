import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { MyText } from '../../MyText'
import { LIGHTBLUE } from '../../../mainStyle'
import { distanceInWords } from 'date-fns'

const frLocale = require('date-fns/locale/fr')

import Icon from 'react-native-vector-icons/FontAwesome'

export class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: null,
      isFavorite: props.isFavorite
    }
  }

  componentDidMount() {
    this.findFirstSession()
  }

  findFirstSession() {
    const session = this.props.data.sessions.sort(compare)[0]

    if (session) {
      this.setState({
        start: distanceInWords(session.startsAt, new Date(), {
          locale: frLocale
        })
      })
    }

    function compare(a, b) {
      if (a.startsAt < b.startsAt) return -1
      if (a.startsAt > b.startsAt) return 1
      return 0
    }
  }

  // handlePress() {
  //   if (this.state.isFavorite) {
  //     this.setState({ isFavorite: false })
  //     this.props.deleteFavorite(this.props.data._id)
  //   }

  //   if (!this.state.isFavorite) {
  //     this.setState({ isFavorite: true })
  //     this.props.pushFavorite(this.props.data._id)
  //   }
  // }

  render() {
    const { image, name, center, _id } = this.props.data
    const { start } = this.state

    const star = this.props.isFavorite ? 'star' : 'star-o'

    return (
      <TouchableOpacity style={styles.lessonContainer}>
        <Image
          resizeMode="cover"
          style={{ height: 200 }}
          source={{
            uri: image
          }}
        />

        <View style={styles.blackfilter} />

        <View style={styles.centerContainer}>
          <MyText style={styles.centerText}>{center.name}</MyText>
        </View>

        <TouchableOpacity
          style={styles.starContainer}
          onPress={() => this.props.updateFavorites(_id)}
        >
          <Icon name={star} size={30} color={LIGHTBLUE} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <MyText style={styles.nameActivities}>{name}</MyText>
          {this.state.start && (
            <MyText style={styles.timeBeforeStart}>
              Prochaine scéance dans {start}
            </MyText>
          )}
        </View>

        <View style={styles.distanceContainer}>
          <MyText style={styles.distance}>3 km</MyText>
        </View>
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
    left: 20
  },
  nameActivities: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white'
  },
  timeBeforeStart: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  distanceContainer: {
    position: 'absolute',
    bottom: 30,
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
})
