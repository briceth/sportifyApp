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
import { SwipeListView } from 'react-native-swipe-list-view'
import Modal from 'react-native-modal'
import PropTypes from 'prop-types'
import axios from 'axios'
import store from 'react-native-simple-store'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import { formatDuration } from '../../../utils/utils'

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
    qrData: {},
    flatListData: [{ key: 1, text: 'Salut' }, { key: 1, text: 'Hello' }]
  }

  toggleQrCode = (sessionInfos = {}) =>
    this.setState({
      isQrCodeVisible: !this.state.isQrCodeVisible,
      qrData: sessionInfos
    })

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
    let reservations = (
      <SwipeListView
        key="swipeList"
        useFlatList
        disableRightSwipe
        // previewOpenValue={0}
        data={this.state.reservations}
        renderItem={(data, rowMap) => (
          <Reservation
            key={`res ${data.item._id}`}
            style={[styles.reservation, mainStyles.shadow]}
            session={data.item}
            toggleQrCode={this.toggleQrCode}
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
        {this.renderReservations()},
        <Modal
          isVisible={this.state.isQrCodeVisible}
          // onBackdropPress={() => this.setState({ isVisible: false })}
          onSwipe={() => this.setState({ isVisible: false })}
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
              <MyText>Prof: {this.state.qrData.teacher}</MyText>
              <MyText>
                Date :{' '}
                {format(this.state.qrData.startsAt, 'ddd DD MMM', {
                  locale: fr
                })}
              </MyText>
              <MyText>
                Heure :{' '}
                {format(this.state.qrData.startsAt, 'HH:mm', {
                  locale: fr
                })}
              </MyText>
              <MyText>
                Durée: {formatDuration(this.state.qrData.duration)}
              </MyText>

              <TouchableOpacity onPress={this.toggleQrCode}>
                <MyText>Hide me! width : {width}</MyText>
              </TouchableOpacity>
            </View>

            <Image
              style={styles.qrImage}
              source={require('../../../images/QRExemple.png')}
            />
          </View>
        </Modal>
      </View>
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
