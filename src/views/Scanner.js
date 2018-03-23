import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native'
import axios from 'axios'
import { NavigationActions } from 'react-navigation'
import QRCodeScanner from 'react-native-qrcode-scanner'
import config from '../../config'

export class Scanner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      session: this.props.navigation.state.params.session
    }
  }

  static navigationOptions = { header: null }

  onSuccess = event => {
    const userId = event.data
    const peoplePresent = this.state.session.peoplePresent.map(s => s._id)
    const bookedBy = this.state.session.bookedBy.map(s => s._id)

    if (!bookedBy.includes(userId)) {
      if (peoplePresent.includes(userId)) {
        return this.alert('La personne a déjà été enregistrée')
      }
      return this.alert("La personne n'est pas inscrite au cours")
    }

    axios
      .put(`${config.API_URL}/api/sessions/${this.state.session._id}/present`, {
        userId
      })
      .then(response => {
        const { navigation } = this.props
        navigation.goBack()
        navigation.state.params.onSelect({ session: response.data.session })
      })
      .catch(error => {
        this.alert('Problème de connexion')
        console.log(error)
      })
  }

  alert(message) {
    return Alert.alert(
      'Alerte',
      message,
      [
        {
          text: 'Ok',
          style: 'default'
        }
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          cameraStyle={styles.cameraContainer}
        />
        <View
          style={[styles.container, styles.containerTB, styles.containerTop]}
        >
          <Text style={styles.text}>En attente d'un QR Code ...</Text>
        </View>
        <View
          style={[styles.container, styles.containerLR, styles.containerLeft]}
        />
        <View
          style={[styles.container, styles.containerLR, styles.containerRight]}
        />
        <View
          style={[styles.container, styles.containerTB, styles.containerBottom]}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.dispatch(this.resetAction())}
          >
            {' '}
            //this.props.navigation.goBack()}>
            <Text style={styles.text}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const widthSide = width * 0.1
const heightSide = width * 0.8
const heightTop = (height - heightSide) / 2

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  containerTB: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightTop,
    right: 0,
    left: 0
  },
  containerTop: {
    top: 0
  },
  containerBottom: {
    bottom: 0
  },
  containerLR: {
    top: heightTop,
    width: widthSide,
    height: heightSide
  },
  containerLeft: {
    left: 0
  },
  containerRight: {
    right: 0
  },
  cameraContainer: {
    height: Dimensions.get('window').height
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  }
})
