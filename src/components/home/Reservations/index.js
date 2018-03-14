import config from '../../../../config'
import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { mainStyles } from '../../../mainStyle'
import { Reservation } from './Reservation'
import { MyText } from '../../MyText'
import { SwipeListView } from 'react-native-swipe-list-view'
import PropTypes from 'prop-types'
import axios from 'axios'
import store from 'react-native-simple-store'

const deleteBtnWidth = 150

export class Reservations extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.array
  }

  state = {
    loading: true,
    reservations: [],
    listViewData: ['Test 1', 'Test 2', 'Test 3']
  }

  componentDidMount = async () => {
    const currentUser = await store.get('currentUser')
    console.log('user after async ', currentUser)
    axios
      .get(`${config.API_URL}/api/users/${currentUser._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState(
            { reservations: response.data.account.sessions },
            () => {
              console.log('State reservations : ', this.state.reservations)
            }
          )
        }
      })
      .catch(e => {
        console.log('Error when fetching sessions of the user :', e)
        console.log('Response :', e.response)
        if (e.response.status === 401) {
          this.setState({ flashAlert: true })
        }
      })
    this.setState({ loading: false })
  }

  renderReservations = () => {
    if (this.state.loading) return <MyText>'loading...'</MyText>
    // let reservations = this.state.reservations.map((session, index) => {
    //   console.log(session)
    //   return (
    //     <Reservation
    //       key={index}
    //       style={[styles.reservation, mainStyles.shadow]}
    //       session={session}
    //     />
    //   )
    // })
    let reservations = (
      <SwipeListView
        key="swipeList"
        useFlatList
        disableRightSwipe
        // closeOnRowPress
        closeOnRowBeginSwipe
        data={this.state.reservations}
        renderItem={(data, rowMap) => (
          <Reservation
            key={`res ${data.item._id}`}
            style={[styles.reservation, mainStyles.shadow]}
            session={data.item}
          />
        )}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity
            key={`hidden ${data.item._id}`}
            style={styles.deleteBtn}
            onPress={() =>
              Alert.alert(
                'Confirmation',
                'Etes vous sûr de vouloir supprimer cette réservation ?',
                [
                  {
                    text: 'Annuler',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                  },
                  {
                    text: 'Supprimer',
                    onPress: () => console.log('OK Pressed'),
                    style: 'destructive'
                  }
                ],
                { cancelable: false }
              )
            }
          >
            <MyText style={[styles.deleteBtnText]}>Supprimer</MyText>
          </TouchableOpacity>
        )}
        rightOpenValue={-deleteBtnWidth}
      />
    )
    if (this.state.reservations.length === 0) {
      reservations = (
        <MyText style={[styles.centerText]} key="no-res">
          Vous n'avez pas encore de réservations
        </MyText>
      )
    }

    return [
      <MyText key="title" style={[mainStyles.title]}>
        Mes réservations
      </MyText>,
      reservations
    ]
  }

  render() {
    return (
      <View key="view" style={this.props.style}>
        {this.renderReservations()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  reservation: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderColor: 'grey'
  },

  centerText: {
    textAlign: 'center',
    paddingBottom: 20
  },
  deleteBtn: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  deleteBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    width: deleteBtnWidth
  }
})
