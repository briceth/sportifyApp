import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { MyText } from '../../MyText'
import { Activity } from './Activity'
import config from '../../../../config'
import { mainStyles } from '../../../mainStyle'
import axios from 'axios'
import store from 'react-native-simple-store'

export class Activities extends Component {
  state = {
    activities: null,
    favorites: [],
    currentUser: null
  }

  componentDidMount() {
    store.delete('favoriteActivities')

    // Get Current User & Favorites
    store.get('currentUser').then(res => {
      if (res) {
        this.setState(
          {
            currentUser: res
          },
          () => {
            this.getFavorites(res)
          }
        )
      }
      if (!res) this.getFavorites(false)
    })

    //Get Activitites
    axios
      .get(`${config.API_URL}/api/activities`)
      .then(response => {
        this.setState({
          activities: response.data
        })
      })
      .catch(error => {
        console.log('ERROR', error)
      })
  }

  getFavorites(user) {
    store.get('favoriteActivities').then(res => {
      console.log('RES', res)
      if (res) {
        console.log('USER has favorites', res)
        this.setState({
          favorites: res
        })
        this.updateFavoritesOnServer(res)
      }
      if (!res && user) {
        this.getFavoritesFromServer(user)
      }
    })
  }

  getFavoritesFromServer(user) {
    console.log('WARNING getFavoritesFromServer')
    axios
      .get(`${config.API_URL}/api/users/${user._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(res => {
        console.log('RES getFavoritesFromServer', res)
        if (
          res.data.account.favoriteActivities &&
          res.data.account.favoriteActivities.length > 0
        ) {
          console.log(
            'getFavoritesFromServer update store',
            res.data.account.favoriteActivities
          )
          this.setState(
            {
              favorites: res.data.account.favoriteActivities
            },
            () => {
              console.log('STATE FAVORITES', this.state.favorites)
            }
          )

          store.save('favoriteActivities', res.data.account.favoriteActivities)
        }
      })
      .catch(error => {
        console.log('ERROR', error)
      })
  }

  updateFavorites = id => {
    const index = this.state.favorites.indexOf(id)

    if (index > -1) {
      console.log('DELETE FAVORITE')
      store.get('favoriteActivities').then(res => {
        console.log('OLD favoriteActivities', res)
        const newFavorites = [...this.state.favorites]
        newFavorites.splice(index, 1)

        this.setState({ favorites: newFavorites }, () => {
          console.log('NEW STATE FAVORITES', this.state.favorites)
        })

        store.save('favoriteActivities', favorites).then(() => {
          store.get('favoriteActivities').then(res => {
            this.updateFavoritesOnServer(res)
          })
        })
      })
    }

    if (index === -1) {
      console.log('PUSH FAVORITE')
      const favorites = [...this.state.favorites, id]
      this.setState({ favorites }, () => {
        console.log('NEW STATE FAVORITES', this.state.favorites)
      })

      store.push('favoriteActivities', id).then(() => {
        store.get('favoriteActivities').then(res => {
          this.updateFavoritesOnServer(res)
        })
      })
    }
  }

  updateFavoritesOnServer(favorites) {
    const { currentUser } = this.state
    if (currentUser) {
      console.log('POST updateFavoritesOnServer', currentUser._id)
      console.log('POST updateFavoritesOnServer', currentUser.token)
      axios
        .post(
          `${config.API_URL}/api/users/${currentUser._id}`,
          {
            favorites: favorites
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser.token}`
            }
          }
        )
        .then(res => {
          console.log('RESPONSE', res)
        })
        .catch(error => {
          console.log('ERROR', error)
        })
    }
  }

  render() {
    console.log('render Home')

    const { activities, favorites } = this.state

    console.log('Favorites', favorites)
    console.log('Activities', activities)
    return (
      <View>
        <MyText style={mainStyles.title}>Les cours</MyText>

        {activities && (
          <FlatList
            data={activities}
            renderItem={({ item }) => {
              console.log('item ID', item._id)
              return (
                <Activity
                  data={item}
                  isFavorite={favorites.indexOf(item._id) > -1 ? true : false}
                  updateFavorites={this.updateFavorites}
                />
              )
            }}
          />
        )}
      </View>
    )
  }
}
