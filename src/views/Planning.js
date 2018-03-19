import React, { Component } from 'react'
import {
  StyleSheet,
  ImageBackground,
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
    image: '',
    address: '',
    center: '',
    dates: [],
    scaleValue: new Animated.Value(0),
    isOpen: false,
    selectedHour: null,
    session: null,
    isHourSelected: false
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
        const { image } = response.data
        const { address } = response.data.center
        const center = response.data.center.name
        const sessions = response.data.sessions
        //console.log(sessions)

        const formatedDate = formatDate(sessions)

        const newDate = rangeDateByMonth(formatedDate)

        this.setState({ name, image, address, center, dates: [...newDate] })
      })
      .catch(e => log(e))
  }

  selectHour = (hour, hourId, session) => {
    const selectHour = this.state.selectedHour

    if (selectHour === hourId) {
      // si il existe tu le supprimes
      this.setState({
        selectedHour: null,
        isHourSelected: false,
        session: null
      })
    } else {
      // sinon tu l'ajoutes
      this.setState(
        { isHourSelected: true, selectedHour: hourId, session },
        () => {
          console.log('this state', this.state)
        }
      )
    }
  }

  bookSession = async () => {
    const currentUser = await store.get('currentUser')
    console.log('current user : ', currentUser.account.sessions)
    currentUser.account.sessions.push(this.state.session)
    console.log('current user updated : ', currentUser.account.sessions)

    console.log('currentUser', currentUser)

    console.log('sessionId', this.state.session)

    console.log(`${config.API_URL}/api/sessions/${this.state.session._id}/book`)
    // need user id, session id
    store.update('currentUser', currentUser).then(res => {
      this.props.navigation.navigate('Home', {
        newCurrentUser: currentUser
      })
      axios
        .put(`${config.API_URL}/api/sessions/${this.state.session._id}/book`, {
          userId: currentUser._id
        })
        .then(response => {
          console.log(response.data)
        })
        .catch(err => console.log(err))
    })
  }

  renderButton = () => {
    if (this.state.isHourSelected) {
      return (
        <CallToAction bookSession={this.bookSession}>Réserver</CallToAction>
      )
    }
    return null
  }

  render() {
    const { name, address, center, dates, image } = this.state
    console.log('Props in Planning :', this.props)

    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <View style={styles.imgBorder}>
            <ImageBackground
              resizeMode="cover"
              source={{ uri: image }}
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
        <Animated.ScrollView
          scrollEventThrottle={1}
          style={[styles.calendarContainer]}
          onScroll={this.makeImgBig}
        >
          <Calendar
            dates={dates}
            selectHour={this.selectHour}
            selectedHour={this.state.selectedHour}
          />
        </Animated.ScrollView>

        {this.renderButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    marginTop: 5,
    flex: 1
  },
  imgContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  imgBorder: {
    borderRadius: 4,
    overflow: 'hidden'
  },
  calendarContainer: {
    paddingHorizontal: 5,
    marginTop: 5,
    flex: 1
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
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey'
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
