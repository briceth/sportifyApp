import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  Dimensions
} from 'react-native'
import { mainStyles } from '../../../mainStyle'
import { Reservation } from './Reservation'
import { MyText } from '../../MyText'
import Modal from 'react-native-modal'
import PropTypes from 'prop-types'
import store from 'react-native-simple-store'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import { formatDuration, deleteWhere } from '../../../utils/utils'
import { SwipeListView } from 'react-native-swipe-list-view'
import QRCode from 'react-native-qrcode'

const { width } = Dimensions.get('window')
const deleteBtnWidth = 150

export class Reservations extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.array,
    account: PropTypes.object,
    userConnected: PropTypes.object,
    updateAccountState: PropTypes.func,
    updateServerFromStorage: PropTypes.func
  }

  state = {
    // reservations: [],
    isQrCodeVisible: false,
    qrData: {}
  }

  toggleQrCode = (sessionInfos = {}) =>
    this.setState({
      isQrCodeVisible: !this.state.isQrCodeVisible,
      qrData: sessionInfos
    })

  // componentDidMount = async () => {
  //   const currentUser = await store.get('currentUser')
  //   if (!currentUser)
  //     return this.setState({
  //       userConnected: null
  //     })
  //   return this.setState({
  //     reservations: currentUser.account.sessions,
  //     userConnected: true
  //   })
  // }

  openRow = rowRef => {
    // Use an internal method to manually swipe the row open to whatever value you pass
    rowRef.manuallySwipeRow(-deleteBtnWidth)
  }

  deleteReservation = sessionId => {
    console.log('Deleting session : ', sessionId)
    const newAccount = { ...this.props.account }
    newAccount.sessions = deleteWhere({ ...this.props.account }.sessions, {
      _id: sessionId
    })
    this.props.updateAccountState(newAccount).then(acc => {
      console.log('About to update storage')
      store.update('account', acc).then(res => {
        this.props.updateServerFromStorage(acc)
      })
    })
  }

  renderReservations = () => {
    const reservations = this.props.account.sessions
    console.log('Reservations state : ', reservations)
    if (reservations.length === 0) {
      return (
        <MyText style={[styles.centerText]} key="noRes">
          Vous n'avez pas encore de réservations
        </MyText>
      )
    }
    return (
      <SwipeListView
        useFlatList
        disableRightSwipe
        keyExtractor={(item, index) => item._id}
        data={reservations}
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
                      onPress: () => rowMap[rowData.item._id].closeRow(),
                      style: 'cancel'
                    },
                    {
                      text: 'Supprimer',
                      onPress: () => this.deleteReservation(rowData.item._id),
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
  }

  render() {
    console.log('Rendering reservation with state : ', this.state)
    return (
      <View key="view" style={this.props.style}>
        {this.props.userConnected && [
          <MyText key="title" style={[mainStyles.title]}>
            Mes réservations
          </MyText>,
          this.renderReservations()
        ]}
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

          <QRCode
            value={this.state.qrData.sessionId}
            size={width * 0.75}
            bgColor="white"
            fgColor="black"
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
    width: width * 0.75,
    marginBottom: 20
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
