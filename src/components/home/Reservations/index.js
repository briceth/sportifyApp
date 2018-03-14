import config from '../../../../config'
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  Image,
  Dimensions
} from 'react-native'
import { mainStyles } from '../../../mainStyle'
import { Reservation } from './Reservation'
import { MyText } from '../../MyText'
import Modal from 'react-native-modal'
import PropTypes from 'prop-types'
import axios from 'axios'
import store from 'react-native-simple-store'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import { formatDuration } from '../../../utils/utils'
import { SwipeListView } from 'react-native-swipe-list-view'

const { width } = Dimensions.get('window')
const deleteBtnWidth = 150

export class Reservations extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.array
  }

  state = {
    loading: true,
    reservations: [],
    isQrCodeVisible: false,
    qrData: {}
  }

  toggleQrCode = (sessionInfos = {}) =>
    this.setState({
      isQrCodeVisible: !this.state.isQrCodeVisible,
      qrData: sessionInfos
    })

  componentDidMount = async () => {
    const currentUser = await store.get('currentUser')
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
            reservations: response.data.account.sessions,
            loading: false
          })
        }
      })
      .catch(e => {
        console.log('Error when fetching sessions of the user :', e)
        console.log('Response :', e.response)
        if (e.response.status === 401) {
          this.setState({ flashAlert: true })
        }
      })
  }

  openRow = rowRef => {
    // Use an internal method to manually swipe the row open to whatever value you pass
    rowRef.manuallySwipeRow(-deleteBtnWidth)
  }

  renderReservations = () => {
    if (this.state.loading) return <MyText>'loading...'</MyText>

    console.log('Reservations state : ', this.state.reservations)
    let reservations = (
      <SwipeListView
        useFlatList
        disableRightSwipe
        keyExtractor={item => item._id}
        data={this.state.reservations}
        renderItem={(rowData, rowMap) => (
          <Reservation
            key={`${rowData.item._id}`}
            style={[styles.reservation, mainStyles.shadow]}
            session={rowData.item}
            toggleQrCode={this.toggleQrCode}
            openRow={() => this.openRow(rowMap[rowData.item._id])}
          />
        )}
        renderHiddenItem={(rowData, rowMap) => (
          <View
            style={styles.deleteBtnContainer}
            key={`hidden${rowData.item._id}`}
          >
            <View style={styles.deleteBtnSpacer} />
            <TouchableOpacity
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
          </View>
        )}
        rightOpenValue={-deleteBtnWidth}
      />
    )
    if (this.state.reservations.length === 0) {
      reservations = (
        <MyText style={[styles.centerText]} key="noRes">
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
    console.log('Rendering reservation with state : ', this.state)
    return (
      <View key="view" style={this.props.style}>
        {this.renderReservations()}
        {this.renderQrModal()}
      </View>
    )
  }

  renderQrModal = () => {
    return (
      <Modal
        key="qrModal"
        isVisible={this.state.isQrCodeVisible}
        onBackdropPress={() => this.setState({ isQrCodeVisible: false })}
        onSwipe={() => this.setState({ isQrCodeVisible: false })}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={[styles.modalContent]}>
          <View style={styles.infos}>
            <MyText style={[mainStyles.boldText]}>
              {this.state.qrData.activity}
            </MyText>
            <MyText style={[mainStyles.boldText]}>
              {this.state.qrData.center}
            </MyText>
            <View style={[styles.infoLine, { paddingTop: 20 }]}>
              <Text style={styles.label}>Prof : </Text>
              <MyText>{this.state.qrData.teacher}</MyText>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.label}>Date : </Text>
              <MyText>
                {format(this.state.qrData.startsAt, 'ddd DD MMM', {
                  locale: fr
                })}
              </MyText>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.label}>Heure : </Text>
              <MyText>
                {format(this.state.qrData.startsAt, 'HH:mm', {
                  locale: fr
                })}
              </MyText>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.label}>Durée : </Text>
              <MyText>{formatDuration(this.state.qrData.duration)}</MyText>
            </View>
          </View>

          <Image
            style={styles.qrImage}
            source={require('../../../images/QRExemple.png')}
          />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    marginHorizontal: 10
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  infos: {
    // backgroundColor: 'blue',
    width: width * 0.75
  },
  qrImage: {
    marginTop: 20,
    width: width * 0.75,
    height: width * 0.75
  },
  infoLine: {
    flexDirection: 'row'
  },
  label: {
    width: 60
  },
  reservation: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderColor: '#C6C6C7'
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
  },
  deleteBtnSpacer: {
    backgroundColor: 'white',
    flex: 1
  },
  deleteBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%'
  }
})
