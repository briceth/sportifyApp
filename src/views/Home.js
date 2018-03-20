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

    // Recupération du user du store:
    const currentUser = await store.get('currentUser')
    this.props.navigation.setParams({
      user: currentUser ? 'connected' : 'disconnected',
      handleHeaderRight: this._handleHeaderRight.bind(this)
    })
    if (!currentUser) return this.setState({ loading: false })
    // mise dans le state :
    this.updateCurrentUserState(currentUser)
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

  updateCurrentUserState = async currentUser =>
    this.setState({
      currentUser,
      loading: false
    })

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
      <View style={[mainStyles.containerFlex, mainStyles.centered]}>
        <ActivityIndicator />
      </View>
    ) : (
      <ScrollView style={[mainStyles.containerFlex]}>
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
