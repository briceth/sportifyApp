import config from '../../config'
import React, { Component } from 'react'
import { ScrollView, ActivityIndicator, View, StyleSheet } from 'react-native'
import { Reservations } from '../components/home/Reservations'
import { Activities } from '../components/home/Activities'
import { mainStyles } from '../mainStyle'
import store from 'react-native-simple-store'
import axios from 'axios'

export class Home extends Component {
  state = {
    loading: true,
    userConnected: {},
    account: {}
  }

  componentDidMount = async () => {
    const currentUser = await store.get('currentUser')
    console.log('currentUser in HOME component disd mount : ', currentUser)
    if (!currentUser) return this.setState({ loading: false })
    this.updateAccountState(currentUser.account)
    this.updateServerFromStorage(currentUser)
  }

  updateAccountState = account => {
    return new Promise((resolve, reject) => {
      this.setState({ account: account }, () => {
        resolve(this.state.account)
      })
    })
  }

  updateServerFromStorage = currentUser => {
    axios
      .post(
        `${config.API_URL}/api/users/${currentUser._id}`,
        {
          account: currentUser.account
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({
            loading: false,
            userConnected: {
              id: response.data._id,
              token: response.data.token
            }
          })
        }
      })
      .catch(e => {
        console.log('Error when updating user data on server :', e)
        console.log('Response :', e.response)
        this.setState({
          loading: false
        })
      })
  }

  render() {
    const { userConnected } = this.state

    return this.state.loading ? (
      <View style={[mainStyles.containerFlex, styles.centered]}>
        <ActivityIndicator />
      </View>
    ) : (
      <ScrollView style={mainStyles.containerFlex}>
        <Reservations
          updateServerFromStorage={this.updateServerFromStorage}
          updateAccountState={this.updateAccountState}
          userConnected={this.state.userConnected}
          account={this.state.account}
        />
        <Activities userConnected={userConnected} />
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
