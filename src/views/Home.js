import config from '../../config'
import React, { Component } from 'react'
import { ScrollView, ActivityIndicator, View, StyleSheet } from 'react-native'
import { Reservations } from '../components/home/Reservations'
import { Activities } from '../components/home/Activities'
import { mainStyles } from '../mainStyle'
import store from 'react-native-simple-store'
import axios from 'axios'
import PropTypes from 'prop-types'

export class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  static propTypes = {
    navigation: PropTypes.object
  }

  state = {
    loading: true,
    currentUser: null
  }

  goToPlanning = activityId =>
    this.props.navigation.navigate('Planning', {
      activityId
    })

  componentDidMount = async () => {
    if (this.props.navigation.state.params) {
      const { newCurrentUser } = this.props.navigation.state.params
      if (
        !this.state.currentUser ||
        (newCurrentUser &&
          newCurrentUser.account.sessions.length >
            this.state.currentUser.account.sessions.length)
      ) {
        console.log('Update state')

        this.updateCurrentUserState(newCurrentUser)
      }
    }

    const currentUser = await store.get('currentUser')
    console.log(
      'Current User in STATE before update : ',
      this.state.currentUser
    )
    console.log('Current User in STORE : ', currentUser)
    if (!currentUser) return this.setState({ loading: false })
    this.updateCurrentUserState(currentUser)
    // this.updateServerFromStorage(currentUser)
  }

  updateCurrentUserState = async currentUser =>
    this.setState({
      currentUser,
      loading: false
    })

  // updateServerFromStorage = currentUser => {
  //   axios
  //     .post(
  //       `${config.API_URL}/api/users/${currentUser._id}`,
  //       {
  //         account: currentUser.account
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${currentUser.token}`
  //         }
  //       }
  //     )
  //     .then(response => {
  //       this.setState({
  //         loading: false
  //       })
  //     })
  //     .catch(e => {
  //       console.log('Error when updating user data on server :', e)
  //       console.log('Response :', e.response)
  //       this.setState({
  //         loading: false
  //       })
  //     })
  // }

  // format: data = {dataToAdd: {sessions: [ids]}}
  updateServerFromStorage = (currentUser, data) => {
    console.tron.log('IN UPDATE SERVER')
    if (!data) throw Error('No data given')
    const key = Object.keys(data)[0]
    const dataToUpdate = data[key]
    axios
      .post(
        `${config.API_URL}/api/users/improved/${currentUser._id}`,
        {
          [key]: dataToUpdate
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      )
      .then(response => {
        console.tron.log(response)
        this.setState({
          loading: false
        })
      })
      .catch(err => console.tron.log(err))
  }

  render() {
    const { currentUser } = this.state

    return this.state.loading ? (
      <View style={[mainStyles.containerFlex, styles.centered]}>
        <ActivityIndicator />
      </View>
    ) : (
      <ScrollView style={mainStyles.containerFlex}>
        {this.state.currentUser && (
          <Reservations
            updateServerFromStorage={this.updateServerFromStorage}
            updateCurrentUserState={this.updateCurrentUserState}
            currentUser={currentUser}
          />
        )}
        {
          <Activities
            updateServerFromStorage={this.updateServerFromStorage}
            currentUser={currentUser}
            goToPlanning={this.goToPlanning}
          />
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
