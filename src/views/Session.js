import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import config from '../../config'
import { MyText } from '../components/MyText'
import { mainStyles, BLUE } from '../mainStyle'

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
      const activityName = this.state.session.activity.name
      const { name, address } = this.state.session.activity.center

      return (
        <View>
          <MyText style={[styles.title]}>{activityName}</MyText>
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
