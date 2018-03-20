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
const deleteBtnWidth = 120

export class Reservations extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.array,
    currentUser: PropTypes.object,
    updateCurrentUserState: PropTypes.func,
    updateServerFromStorage: PropTypes.func,
    navigation: PropTypes.object
  }

  state = {
    isQrCodeVisible: false,
    qrData: {}
  }

  toggleQrCode = (sessionInfos = {}) =>
    this.setState({
      isQrCodeVisible: !this.state.isQrCodeVisible,
      qrData: sessionInfos
    })

  openRow = rowRef => {
    // Use an internal method to manually swipe the row open to whatever value you pass
    rowRef.manuallySwipeRow(-deleteBtnWidth)
  }

  deleteReservation = (session, rowMap) => {
    rowMap[session.key].closeRow()
    const sessionId = session._id
    const newCurrentUser = { ...this.props.currentUser }
    const newAccount = { ...newCurrentUser.account }
    newAccount.sessions = deleteWhere(newAccount.sessions, {
      _id: sessionId
    })
    console.log(
      'currentUser sessions before deleting',
      newCurrentUser.account.sessions
    )
    newCurrentUser.account = newAccount
    console.log(
      'currentUser sessions about to be saved : ',
      newCurrentUser.account.sessions
    )

    this.props.updateCurrentUserState(newCurrentUser).then(user => {
      store.save('currentUser', newCurrentUser).then(async res => {
        const userStored = await store.get('currentUser')
        console.log(
          'currentUser sessions after deleting',
          userStored.account.sessions
        )
        this.props.updateServerFromStorage(newCurrentUser)
      })
    })
  }

  renderSessions = () => {
    const { currentUser, navigation } = this.props
    const { sessions } = currentUser.account

    const reservations = sessions.map((session, index) => {
      session.key = index.toString()
      return session
    })

    console.log('Reservations data', reservations)
    if (reservations.length === 0) {
      return (
        <MyText style={[styles.centerText]} key="noRes">
          Vous n'avez pas encore de réservations
        </MyText>
      )
    }
    return (
      <SwipeListView
        key="reservationsList"
        useFlatList
        disableRightSwipe
        previewRowKey={'0'}
        previewOpenValue={-50}
        data={reservations}
        renderItem={(rowData, rowMap) => (
          <Reservation
            navigation={navigation}
            style={[styles.reservation, mainStyles.shadow]}
            session={rowData.item}
            currentUser={currentUser}
            toggleQrCode={this.toggleQrCode}
            openRow={() => this.openRow(rowMap[rowData.item.key])}
          />
        )}
        renderHiddenItem={(rowData, rowMap) => (
          <View style={styles.deleteBtnContainer}>
            <View key="spacer" style={styles.deleteBtnSpacer} />
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() =>
                Alert.alert(
                  'Confirmation',
                  'Etes vous sûr de vouloir supprimer cette réservation ?',
                  [
                    {
                      text: 'Annuler',
                      onPress: () => rowMap[rowData.item.key].closeRow(),
                      style: 'cancel'
                    },
                    {
                      text: 'Supprimer',
                      onPress: () =>
                        this.deleteReservation(rowData.item, rowMap),
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

  renderTitle = () => {
    const { role } = this.props.currentUser.account

    return role === 'teacher' ? (
      <MyText key="title" style={[mainStyles.title]}>
        Mes cours à venir
      </MyText>
    ) : (
      <MyText key="title" style={[mainStyles.title]}>
        Mes réservations
      </MyText>
    )
  }

  render() {
    const { currentUser, style } = this.props

    return (
      <View key="view" style={style}>
        {currentUser && [this.renderTitle(), this.renderSessions()]}
        {this.renderQrModal()}
      </View>
    )
  }

  renderQrModal = () => {
    const {
      isQrCodeVisible,
      activity,
      center,
      teacher,
      startsAt,
      duration,
      sessionId
    } = this.state.qrData

    return (
      <Modal
        key="qrModal"
        isVisible={isQrCodeVisible}
        onBackdropPress={() => this.setState({ isQrCodeVisible: false })}
        onSwipe={() => this.setState({ isQrCodeVisible: false })}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={[styles.modalContent]}>
          <View style={styles.infos}>
            <MyText style={[mainStyles.boldText]}>{activity}</MyText>
            <MyText style={[mainStyles.boldText]}>{center}</MyText>
            <View style={[styles.infoLine, { paddingTop: 20 }]}>
              <Text style={styles.label}>Prof : </Text>
              <MyText>{teacher}</MyText>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.label}>Date : </Text>
              <MyText>
                {format(startsAt, 'ddd DD MMM', {
                  locale: fr
                })}
              </MyText>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.label}>Heure : </Text>
              <MyText>
                {format(startsAt, 'HH:mm', {
                  locale: fr
                })}
              </MyText>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.label}>Durée : </Text>
              <MyText>{formatDuration(duration)}</MyText>
            </View>
          </View>

          <QRCode
            value={sessionId}
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
    marginBottom: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
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
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'red',
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
    flex: 1
  },
  deleteBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%'
  }
})
