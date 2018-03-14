import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { MyText } from '../../MyText'
import { LIGHTBLUE } from '../../../mainStyle'

import Icon from 'react-native-vector-icons/FontAwesome'

export class Activity extends Component {
  state = {
    session: null
  }

  componentWillMount() {
    const sessions = this.props.data

    if (sessions.length > 0) {
      this.setState({
        session: sessions.sort(compare)[0].startsAt
      })
    }

    function compare(a, b) {
      if (a.startsAt < b.startsAt) return -1
      if (a.startsAt > b.startsAt) return 1
      return 0
    }
  }

  render() {
    const { image, name, center } = this.props.data
    console.log(name, this.state.session)
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

        <TouchableOpacity style={styles.starContainer}>
          <Icon name="star-o" size={30} color={LIGHTBLUE} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <MyText style={styles.nameActivities}>{name}</MyText>
          <MyText style={styles.timeBeforeStart}>
            Prochaine séance demain
          </MyText>
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
