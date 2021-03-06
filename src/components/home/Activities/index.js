import React, { Component } from 'react'
import { FlatList, View, Dimensions, ActivityIndicator } from 'react-native'
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
    currentUser: PropTypes.object,
    imagePos: PropTypes.object,
    updateServerFromStorage: PropTypes.func
  }

  state = {
    activities: null,
    activitiesSorted: null,
    favoritesLoad: false,
    favorites: [],
    width: Dimensions.get('window').width,
    geolocation: {
      latitude: null,
      longitude: null
    }
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
        if (this.props.currentUser) {
          return this.props.updateServerFromStorage(this.props.currentUser, {
            dataToReplace: { favoriteActivities: res }
          })
        }
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
        this.getActivities() //Get Activitites
        console.log(error.message)
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    )
  }

  getActivities() {
    const { geolocation } = this.state

    axios
      .get(
        `${config.API_URL}/api/activities?long=${geolocation.longitude}&lat=${
          geolocation.latitude
        }`
      )
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
    const { activitiesSorted, favorites, width, geolocation } = this.state
    const { imagePos, goToPlanning } = this.props

    return activitiesSorted ? (
      <View>
        <MyText style={[mainStyles.title]}>Les cours</MyText>

        <FlatList
          data={activitiesSorted}
          extraData={[favorites, geolocation]}
          renderItem={({ item }) => {
            return (
              <Activity
                imagePos={imagePos}
                geolocation={geolocation}
                width={width}
                data={item}
                isFavorite={favorites.indexOf(item._id) > -1 ? true : false}
                updateFavorites={this.updateFavorites}
                goToPlanning={goToPlanning}
              />
            )
          }}
        />
      </View>
    ) : (
      <View>
        <ActivityIndicator />
      </View>
    )
  }
}
