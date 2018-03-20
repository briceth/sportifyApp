import React, { Component } from 'react'
import { FlatList, View, Dimensions } from 'react-native'
import { MyText } from '../../MyText'
import { Activity } from './Activity'
import config from '../../../../config'
import { mainStyles } from '../../../mainStyle'
import axios from 'axios'
import store from 'react-native-simple-store'
import PropTypes from 'prop-types'

export class Activities extends Component {
  static propTypes = {
    goToPlanning: PropTypes.func,
    updateServerFromStorage: PropTypes.func,
    currentUser: PropTypes.object
  }

  state = {
    activities: null,
    activitiesSorted: null,
    favoritesLoad: false,
    favorites: [],
    width: Dimensions.get('window').width,
    geolocation: null
  }

  componentDidMount() {
    //store.delete('favoriteActivities')
    const { currentUser } = this.props
    this.geoLocation()
    this.getFavorites(currentUser ? currentUser : false) // Get Favorites
  }

  getFavorites(user) {
    store.get('favoriteActivities').then(res => {
      // Favoris en local storage
      if (res) {
        this.setState({
          favoritesLoad: true,
          favorites: res
        })
        if (this.props.currentUser)
          return this.props.updateServerFromStorage(this.props.currentUser, {
            dataToAdd: { favoriteActivities: res }
          })
      }
      // Favoris sur le serveur (donc user connecté)
      if (user) return this.getFavoritesFromServer(user)

      // Pas de favoris
      this.setState(
        {
          favoritesLoad: true
        },
        () => {
          this.sortActivities()
        }
      )
    })
  }

  getFavoritesFromServer(user) {
    axios
      .get(`${config.API_URL}/api/users/${user._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(res => {
        this.setState(
          {
            favoritesLoad: true,
            favorites: res.data.account.favoriteActivities
          },
          () => {
            this.sortActivities()
          }
        )

        store.save('favoriteActivities', res.data.account.favoriteActivities)
      })
      .catch(error => {
        console.log('ERROR', error)
        this.setState({ favoritesLoad: true }, () => {
          this.sortActivities()
        })
      })
  }

  updateFavorites = id => {
    const index = this.state.favorites.indexOf(id)

    if (index > -1) {
      store.get('favoriteActivities').then(res => {
        const favorites = [...this.state.favorites]
        favorites.splice(index, 1)

        this.setState({ favorites })

        store.save('favoriteActivities', favorites).then(() => {
          store.get('favoriteActivities').then(res => {
            if (this.props.currentUser)
              return this.props.updateServerFromStorage(
                this.props.currentUser,
                {
                  dataToRemove: { favoriteActivities: [id] }
                }
              )
          })
        })
      })
    }

    if (index === -1) {
      const favorites = [...this.state.favorites, id]
      this.setState({ favorites })

      store.push('favoriteActivities', id).then(() => {
        store.get('favoriteActivities').then(res => {
          if (this.props.currentUser)
            return this.props.updateServerFromStorage(this.props.currentUser, {
              dataToAdd: { favoriteActivities: [id] }
            })
        })
      })
    }
  }

<<<<<<< HEAD
=======
  updateFavoritesOnServer(favorites) {
    const { currentUser } = this.props
    if (currentUser) {
      currentUser.account.favoriteActivities = favorites
      this.props.updateServerFromStorage(currentUser)
    }
  }

  geoLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          {
            geolocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          },
          () => {
            this.getActivities() //Get Activitites
          }
        )
      },
      error => {
        this.getActivities()
        console.log(error.message)
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    )
  }

>>>>>>> b5c492d32a86d56981145834243fd2deac0e0d1b
  getActivities() {
    const { geolocation } = this.state
    const long = geolocation ? geolocation.longitude : 0
    const lat = geolocation ? geolocation.latitude : 0

    axios
      .get(`${config.API_URL}/api/activities?long=${long}&lat=${lat}`)
      .then(response => {
        this.setState({
          activities: response.data
        })
        this.sortActivities()
      })
      .catch(error => {
        console.log('ERROR', error)
      })
  }

  sortActivities() {
    const { activities, favoritesLoad, favorites } = this.state

    if (activities && favoritesLoad) {
      let activitiesSorted = []
      let favoriteActivities = []

      activities.map(activity => {
        activitiesSorted.push({ ...activity, key: activity._id })
      })

      for (let i = favorites.length; i > -1; i--) {
        const index = activitiesSorted.findIndex(x => x._id === favorites[i])
        if (index > -1) {
          favoriteActivities.push(activitiesSorted[index])
          activitiesSorted.splice(index, 1)
        }
      }

      activitiesSorted = favoriteActivities.concat(activitiesSorted)
      this.setState({ activitiesSorted })
    }
  }

  render() {
    const { activitiesSorted, favorites } = this.state
    return activitiesSorted ? (
      <View>
        <MyText style={[mainStyles.title]}>Les cours</MyText>
        <FlatList
          data={activitiesSorted}
          extraData={[this.state.favorites, this.state.geolocation]}
          renderItem={({ item }) => {
            return (
              <Activity
                geolocation={this.state.geolocation}
                width={this.state.width}
                data={item}
                isFavorite={favorites.indexOf(item._id) > -1 ? true : false}
                updateFavorites={this.updateFavorites}
                goToPlanning={this.props.goToPlanning}
              />
            )
          }}
        />
      </View>
    ) : (
      <View />
    )
  }
}
