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
    //store.delete('favoriteActivities')

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
      if (res) {
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
    axios
      .get(`${config.API_URL}/api/users/${user._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(res => {
        if (
          res.data.account.favoriteActivities &&
          res.data.account.favoriteActivities.length > 0
        ) {
          this.setState({
            favorites: res.data.account.favoriteActivities
          })

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
    const { currentUser } = this.state
    if (currentUser) {
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
          console.log('USER FAVORITES UPDATED', res)
        })
        .catch(error => {
          console.log('ERROR', error)
        })
    }
  }

  render() {
    const { activities, favorites } = this.state

    return (
      <View>
        {activities && (
          <View>
            <MyText style={mainStyles.title}>Les cours</MyText>
            <FlatList
              data={activities}
              extraData={this.state.favorites}
              renderItem={({ item }) => {
                return (
                  <Activity
                    data={item}
                    isFavorite={favorites.indexOf(item._id) > -1 ? true : false}
                    updateFavorites={this.updateFavorites}
                  />
                )
              }}
            />
          </View>
        )}
      </View>
    )
  }
}
