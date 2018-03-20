import config from '../../config'
import React, { Component } from 'react'
import {
  ScrollView,
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Reservations } from '../components/home/Reservations'
import { Activities } from '../components/home/Activities'
import { mainStyles } from '../mainStyle'
import store from 'react-native-simple-store'
import axios from 'axios'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'
import { BLUE } from '../mainStyle'

export class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerTitle: (
        <Image
          style={{ width: 150, height: 30 }}
          source={require('../images/logo.png')}
        />
      ),
      headerRight: renderRight(params)
    }
  }

  state = {
    loading: true,
    currentUser: null
  }

  componentDidMount = async () => {
    //setParams to navbar to dertermine right icon

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

    this.props.navigation.setParams({
      user: currentUser ? 'connected' : 'disconnected',
      handleHeaderRight: this._handleHeaderRight.bind(this)
    })

    if (!currentUser) return this.setState({ loading: false })

    this.updateCurrentUserState(currentUser)
    // this.updateServerFromStorage(currentUser)
  }

  _handleHeaderRight() {
    if (this.state.currentUser) {
      Alert.alert(
        'Confirmation',
        'Etes vous sûr de vouloir vous déconnectez ?',
        [
          {
            text: 'Annuler',
            style: 'cancel'
          },
          {
            text: 'Se déconnecter',
            onPress: () => {
              store.delete('currentUser')
              this.setState({ currentUser: null })
              this.props.navigation.setParams({ user: 'disconnected' })
            },
            style: 'destructive'
          }
        ],
        { cancelable: false }
      )
    } else {
      this.props.navigation.navigate('Signup')
    }
  }

  goToPlanning = activityId =>
    this.props.navigation.navigate('Planning', {
      activityId
    })

  updateCurrentUserState = currentUser => {
    return new Promise((resolve, reject) => {
      this.setState(
        {
          currentUser,
          loading: false
        },
        () => {
          resolve(this.state.currentUser)
        }
      )
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
            loading: false
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
    const { currentUser } = this.state

    return this.state.loading ? (
      <View style={[mainStyles.containerFlex, styles.centered]}>
        <ActivityIndicator />
      </View>
    ) : (
      <ScrollView style={[mainStyles.containerFlex, styles.mainContainer]}>
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

function renderRight(params) {
  const { user } = params || 0
  console.tron.log(user)
  if (!user) return
  return (
    <TouchableOpacity
      onPress={() => params.handleHeaderRight()}
      style={{ paddingHorizontal: 15, paddingVertical: 5 }}
    >
      <Icon
        name={user === 'connected' ? 'sign-out' : 'user'}
        size={30}
        color={BLUE}
      />
    </TouchableOpacity>
  )
}
