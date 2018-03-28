import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import config from '../../config'
import { MyText } from '../components/MyText'
import { formatStartsAt, calcDuration } from '../utils/utils.js'
import { CallToAction } from '../components/buttons/callToAction'

export class Session extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  state = {
    session: null
  }

  componentDidMount() {
    const { session } = this.props.navigation.state.params

    axios
      .get(`${config.API_URL}/api/sessions/${session}`)
      .then(response => {
        this.setState({ session: response.data })
      })
      .catch(err => console.log(err))
  }

  renderBookedBy = () => {
    const { bookedBy, peoplePresent } = this.state.session

    if (bookedBy.length > 0) {
      return bookedBy.map((element, index) => {
        return (
          <View style={styles.imgCircle} key={index}>
            <Image
              style={styles.image}
              source={{
                uri: `https://randomuser.me/api/portraits/men/${index + 5}.jpg`
              }}
            />
          </View>
        )
      })
    } else {
      return peoplePresent.length > 0 ? (
        <MyText>Plus de Participants</MyText>
      ) : (
        <MyText>Pas encore de Participants</MyText>
      )
    }
  }

  renderPeoplePresent = () => {
    const { peoplePresent } = this.state.session

    if (peoplePresent.length > 0) {
      return peoplePresent.map((user, index) => {
        const { firstName } = user.account
        return (
          <View key={index} style={styles.userContainer}>
            <View style={styles.imgCircle}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://randomuser.me/api/portraits/men/${index +
                    5}.jpg`
                }}
              />
            </View>
            <MyText>{firstName}</MyText>
          </View>
        )
      })
    } else {
      return <MyText>Pas encore de personne sur le lieu de l'événement</MyText>
    }
  }

  renderSession = () => {
    if (this.state.session != null) {
      const { session } = this.state
      const { startsAt, duration } = session
      const activityName = session.activity.name
      const { name, address } = session.activity.center

      return [
        <View key="containerSession" style={styles.containerSession}>
          <MyText style={[styles.title]}>{activityName}</MyText>
          <View style={styles.flex}>
            <Icon
              name="clock-o"
              size={30}
              color={'black'}
              style={styles.icon}
            />
            <View>
              <MyText style={[styles.text]}>{formatStartsAt(startsAt)}</MyText>
              <MyText style={[styles.text, styles.tagline]}>
                {calcDuration(startsAt, duration)}
              </MyText>
            </View>
          </View>
          <View style={styles.flex}>
            <Icon
              name="map-marker"
              size={40}
              color={'black'}
              style={styles.icon}
            />
            <View>
              <MyText style={[styles.text]}>{name}</MyText>
              <MyText style={[styles.text, styles.tagline]}>{address}</MyText>
            </View>
          </View>
          <View style={styles.meta}>
            <MyText style={[styles.text]}>Participants</MyText>
            <ScrollView horizontal style={styles.imgContainer}>
              {this.renderBookedBy()}
            </ScrollView>
          </View>
          <View style={styles.meta}>
            <MyText style={[styles.text]}>Présent sur le lieu</MyText>
            <ScrollView horizontal style={styles.imgContainer}>
              {this.renderPeoplePresent()}
            </ScrollView>
          </View>
        </View>,
        <CallToAction
          teacher
          onPress={() =>
            this.props.navigation.navigate('Scanner', {
              session: session
            })
          }
          key="callToAction"
        >
          Scanner un participant
        </CallToAction>
      ]
    } else {
      return (
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
  }
  render() {
    return <View style={styles.container}>{this.renderSession()}</View>
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  containerSession: {
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    marginVertical: 10,
    fontWeight: 'bold'
  },
  icon: {
    marginRight: 15
  },
  text: {
    fontSize: 20,
    lineHeight: 25
  },
  tagline: {
    fontSize: 18,
    fontWeight: '300',
    color: 'grey'
  },
  flex: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  meta: {
    marginTop: 30
  },
  imgContainer: {
    marginTop: 15,
    flexDirection: 'row'
  },
  imgCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 5
  },
  image: {
    width: 50,
    height: 50
  },
  ActivityIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  userContainer: {
    flexDirection: 'column'
  }
})
