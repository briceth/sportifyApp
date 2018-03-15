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
    userConnected: null
  }

  componentDidMount = async () => {
    const currentUser = await store.get('currentUser')
    if (!currentUser) return this.setState({ loading: false })
    axios
      .get(`${config.API_URL}/api/users/${currentUser._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            loading: false,
            userConnected: {
              id: response.data.id,
              token: response.data.token
            }
          })
        }
      })
      .catch(e => {
        console.log('Error when fetching user data :', e)
        console.log('Response :', e.response)
      })
  }

  render() {
    return this.state.loading ? (
      <View style={[mainStyles.containerFlex, styles.centered]}>
        <ActivityIndicator />
      </View>
    ) : (
      <ScrollView style={mainStyles.containerFlex}>
        <Reservations />
        <Activities />
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
