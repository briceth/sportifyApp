import config from '../../config'
import React, { Component } from 'react'
import {
  ScrollView,
  ActivityIndicator,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
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
        <View
          style={{
            flex: 1,
            alignItems: 'center'
          }}
        >
          <Image
            style={{ width: 150, height: 30 }}
            source={require('../images/logo.png')}
          />
        </View>
      ),
      headerRight: renderRight(params),
      headerLeft: <View />,
      gesturesEnabled: false
    }
  }

  state = {
    loading: true,
    currentUser: null,
    imagePos: new Animated.Value(0)
  }

  componentDidMount = async () => {
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
        'Etes vous sûr de vouloir vous déconnecter ?',
        [
          {
            text: 'Annuler',
            style: 'cancel'
          },
          {
            text: 'Déconnexion',
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
    if (!data) throw Error('No data given')
    const key = Object.keys(data)[0]
    const dataToUpdate = data[key]
    axios
      .put(
        `${config.API_URL}/api/users/${currentUser._id}`,
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
        this.setState({
          loading: false
        })
      })
      .catch(err => console.tron.log(err))
  }

  scroll = e => {
    //console.log('scroll !', e.nativeEvent.contentOffset.y)
    this.state.imagePos.setValue(0)
    Animated.timing(this.state.imagePos, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start()
  }

  scrollEnd = e => {
    Animated.timing(this.state.imagePos, {
      toValue: 0,
      duration: 1000,
      easing: Easing.linear
    }).start()
  }

  render() {
    const { currentUser, loading } = this.state
    const { navigation } = this.props
    return loading ? (
      <View style={[mainStyles.containerFlex, mainStyles.centered]}>
        <ActivityIndicator />
      </View>
    ) : (
      <ScrollView
        style={mainStyles.containerFlex}
        onScrollBeginDrag={this.scroll}
        scrollEventThrottle={16}
      >
        {currentUser && (
          <Reservations
            navigation={navigation}
            updateServerFromStorage={this.updateServerFromStorage}
            updateCurrentUserState={this.updateCurrentUserState}
            currentUser={currentUser}
          />
        )}
        {!currentUser || currentUser.account.role === 'user' ? (
          <Activities
            imagePos={this.state.imagePos}
            updateServerFromStorage={this.updateServerFromStorage}
            currentUser={currentUser}
            goToPlanning={this.goToPlanning}
          />
        ) : null}
      </ScrollView>
    )
  }
}

function renderRight(params) {
  const { user } = params || 0
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
