import React, { Component } from 'react'
import { FlatList, View, Dimensions } from 'react-native'
import { MyText } from '../../MyText'
import { Activity } from './Activity'
import config from '../../../../config'
import { mainStyles } from '../../../mainStyle'
import axios from 'axios'
import store from 'react-native-simple-store'

export class Activities extends Component {
  state = {
    activities: null,
    activitiesSorted: null,
    favoritesLoad: false,
    favorites: [],
    width: Dimensions.get('window').width
  }

  componentDidMount() {
    //store.delete('favoriteActivities')
    const { userConnected } = this.props

    //Get Activitites
    this.getActivities()

    // Get Favorites
    this.getFavorites(userConnected ? userConnected : false)
  }

  getFavorites(user) {
    store.get('favoriteActivities').then(res => {
      // Favoris en local storage
      if (res) {
        this.setState({
          favoritesLoad: true,
          favorites: res
        })
        return this.updateFavoritesOnServer(res)
      }
      // Favoris sur le serveur (donc user connecté)
      if (!res && user) {
        return this.getFavoritesFromServer(user)
      }
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
    console.log('getFavoritesFromServer')
    console.log('USER', user)
    axios
      .get(`${config.API_URL}/api/users/${user.id}`, {
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
      })
  }

  updateFavorites = id => {
    const index = this.state.favorites.indexOf(id)
    console.log('updateFavorites index', index)

    if (index > -1) {
      store.get('favoriteActivities').then(res => {
        const favorites = [...this.state.favorites]
        favorites.splice(index, 1)

        this.setState({ favorites })

        store.save('favoriteActivities', favorites).then(() => {
          store.get('favoriteActivities').then(res => {
            this.updateFavoritesOnServer(res)
          })
        })
      })
    }

    if (index === -1) {
      const favorites = [...this.state.favorites, id]
      this.setState({ favorites })

      store.push('favoriteActivities', id).then(() => {
        store.get('favoriteActivities').then(res => {
          this.updateFavoritesOnServer(res)
        })
      })
    }
  }

  updateFavoritesOnServer(favorites) {
    const { userConnected } = this.props
    console.log('userConnected', userConnected)
    if (userConnected) {
      axios
        .post(
          `${config.API_URL}/api/users/${userConnected.id}`,
          {
            favorites: favorites
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userConnected.token}`
            }
          }
        )
        .then(res => {
          console.log('USER FAVORITES UPDATED', res)
        })
        .catch(error => {
          console.log('ERROR', error)
        })
    }
  }

  getActivities() {
    axios
      .get(`${config.API_URL}/api/activities`)
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
      let activitiesSorted = [...activities]
      let favoriteActivities = []

      for (let i = 0; i < favorites.length; i++) {
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
        <MyText style={mainStyles.title}>Les cours</MyText>
        <FlatList
          data={activitiesSorted}
          extraData={this.state.favorites}
          renderItem={({ item }) => {
            return (
              <Activity
                width={this.state.width}
                data={item}
                isFavorite={favorites.indexOf(item._id) > -1 ? true : false}
                updateFavorites={this.updateFavorites}
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
