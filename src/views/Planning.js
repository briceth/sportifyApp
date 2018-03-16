import React, { Component } from 'react'
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Animated,
  Easing
} from 'react-native'
import axios from 'axios'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'
import store from 'react-native-simple-store'
import { Calendar } from '../components/calendar/Index'
import { mainStyles, DARKBLUE } from '../mainStyle'
import { MyText } from '../components/MyText'
import { CallToAction } from '../components/buttons/callToAction'
import config from '../../config'
import { rangeDateByMonth, formatDate } from '../utils/utils'
const log = console.log

export class Planning extends Component {
  static navigationOptions = { title: 'Planning' }

  static propTypes = {
    activityId: PropTypes.string,
    navigation: PropTypes.object
  }
  state = {
    name: '',
    address: '',
    center: '',
    dates: [],
    scaleValue: new Animated.Value(0),
    isOpen: false,
    selectedHour: null,
    sessionId: null,
    hour: ''
  }

  makeImgBig = () => {
    log('make big img')
    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.easeOutBack
    }).start()
  }

  toggleTab = () => {
    log('open tab')
    this.setState({ isOpen: !this.state.isOpen })
  }

  componentDidMount() {
    const { activityId } = this.props.navigation.state.params
    axios
      .get(`${config.API_URL}/api/activities/${activityId}`)
      .then(response => {
        console.log('Fetching Activity :', response.data)

        const { name } = response.data
        const { address } = response.data.center
        const center = response.data.center.name
        const sessions = response.data.sessions

        console.log('sessions', sessions)

        const formatedDate = formatDate(sessions)

        console.log('formatedDate', formatedDate)

        const newDate = rangeDateByMonth(formatedDate)
        this.setState({ name, address, center, dates: [...newDate] }, () => {
          console.log('waza', this.state)
        })
      })
      .catch(e => log(e))
  }

  selectHour = (hour, hourId, sessionId) => {
    const selectHour = this.state.selectedHour

    if (selectHour === hourId) {
      // si il existe tu le supprimes
      this.setState({ selectedHour: null })
    } else {
      // sinon tu l'ajoutes
      this.setState({ hour, selectedHour: hourId, sessionId }, () => {
        console.log('this state', this.state)
      })
    }
  }

  bookSession = async () => {
    const currentUser = await store.get('currentUser')

    console.log('currentUser', currentUser)

    console.log('sessionId', this.state.sessionId)

    console.log(`${config.API_URL}/api/sessions/${this.state.sessionId}/book`)
    // need user id, session id
    axios
      .put(`${config.API_URL}/api/sessions/${this.state.sessionId}/book`, {
        userId: currentUser._id
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(err => console.log(err))
  }

  render() {
    const { name, address, center, dates } = this.state
    console.log('Props in Planning :', this.props)

    return (
      <Animated.ScrollView
        scrollEventThrottle={1}
        style={[styles.container]}
        onScroll={this.makeImgBig}
      >
        <View>
          <ImageBackground
            resizeMode="cover"
            source={{ uri: 'https://picsum.photos/400/500/?random' }}
            style={[styles.img, this.state.imgWidth]}
          >
            <View style={styles.textImg}>
              <MyText style={[mainStyles.paragraphe]}>{name} - 1H30</MyText>
              <MyText style={[mainStyles.tagline]}>
                Prochaine session dans 20 min
              </MyText>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.infosWrapper}>
          <MyText style={[styles.center]}>Le centre</MyText>
          <View style={styles.infosContainer}>
            <View style={styles.infos}>
              <MyText style={[styles.text]}>{center}</MyText>
              <MyText style={[styles.text]}>{address}</MyText>
            </View>
            <Icon name="phone-square" size={40} color={DARKBLUE} />
          </View>
        </View>

        <Calendar
          dates={dates}
          selectHour={this.selectHour}
          selectedHour={this.state.selectedHour}
        />

        <CallToAction bookSession={this.bookSession}>Réserver</CallToAction>
      </Animated.ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    marginTop: 5
  },
  img: {
    height: 200
  },
  textImg: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  infosWrapper: {
    paddingVertical: 10
  },
  center: {
    textAlign: 'center',
    fontSize: 20
  },
  infosContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 10
  },
  infos: {
    flex: 1
  },
  text: {
    fontSize: 16,
    lineHeight: 25
  }
})
