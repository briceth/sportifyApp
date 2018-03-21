import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import { parse, format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import config from '../../config'
import { MyText } from '../components/MyText'
import { mainStyles, BLUE } from '../mainStyle'
import { formatStartsAt, calcDuration } from '../utils/utils.js'

export class Session extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  state = {
    session: null
  }

  componentDidMount() {
    // const { teacher, session } = this.props.navigation.state.params
    // console.log('teacher, session', teacher, session)

    axios
      .get(`${config.API_URL}/api/sessions/5ab1056955e9ceb902688079`)
      .then(response => {
        console.log('response', response)
        this.setState({ session: response.data })
      })
      .catch(err => console.log(err))
  }

  renderSession = () => {
    if (this.state.session != null) {
      const { session } = this.state
      const { startsAt, duration } = session
      const activityName = session.activity.name
      const { name, address } = session.activity.center
      console.log(this.state)
      console.log(format(parse(startsAt), 'h', { locale: fr }))

      return (
        <View>
          <MyText style={[styles.title]}>{activityName}</MyText>
          <View>
            <Icon name="clock-o" size={30} color={BLUE} />
            <MyText>{formatStartsAt(startsAt)}</MyText>
            <MyText>{calcDuration(startsAt, duration)}</MyText>
          </View>
          <View>
            <Icon name="map-marker" size={30} color={BLUE} />
            <MyText>{name}</MyText>
            <MyText>{address}</MyText>
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <MyText>Loading data...</MyText>
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
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    marginVertical: 10,
    fontWeight: 'bold'
  }
})
