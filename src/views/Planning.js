import React, { Component } from 'react'
import {
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  View,
  Animated,
  Easing,
  Image,
  Dimensions
} from 'react-native'
import axios from 'axios'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'
import store from 'react-native-simple-store'
import { Calendar } from '../components/calendar/Index'
import { mainStyles, BLUE } from '../mainStyle'
import { MyText } from '../components/MyText'
import { CallToAction } from '../components/buttons/callToAction'
import { FlashAlert } from '../components/FlashAlert'
import config from '../../config'
import {
  rangeDateByMonth,
  formatDate,
  startsAt,
  formatDuration,
  manageStyle
} from '../utils/utils'
const log = console.log

export class Planning extends Component {
  static navigationOptions = {
    headerTitle: (
      <Image
        style={{ width: 150, height: 30 }}
        source={require('../images/logo.png')}
      />
    )
  }

  static propTypes = {
    activityId: PropTypes.string,
    navigation: PropTypes.object
  }

  state = {
    loading: true,
    name: '',
    image: '',
    address: '',
    center: '',
    dates: [],
    firstSessionDate: '',
    duration: 0,
    scaleValue: new Animated.Value(0),
    isOpen: false,
    selectedHour: null,
    session: null,
    isHourSelected: false,
    isDayChanged: false,
    flashAlert: false,
    errorMessage: ''
  }

  // makeImgBig = () => {
  //   log('make big img')
  //   Animated.timing(this.state.scaleValue, {
  //     toValue: 1,
  //     duration: 1000,
  //     easing: Easing.easeOutBack
  //   }).start()
  // }

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

        // A REFACTO
        const { name } = response.data
        const { image } = response.data
        const { address } = response.data.center
        const center = response.data.center.name
        const sessions = response.data.sessions
        console.log('SESSIONS:', sessions)
        // format date with date fns
        const formatedDate = formatDate(sessions)
        // range each session by month, then by days, then by hours
        const newDate = rangeDateByMonth(formatedDate)

        this.setState({
          loading: false,
          name,
          image,
          address,
          center,
          dates: [...newDate],
          firstSessionDate: sessions[0].startsAt, // the first session
          duration: sessions[0].duration // the first session
        })
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
        {
          isHourSelected: true,
          selectedHour: hourId,
          session,
          isDayChanged: false
        },
        () => {
          console.log('this state', this.state)
        }
      )
    }
  }

  onSwipeDay = () => {
    console.log('on change de jour')

    this.setState({ isDayChanged: true })
  }

  bookSession = async () => {
    // ne peut booker que si il a selectionné une heure
    if (this.state.isHourSelected) {
      const currentUser = await store.get('currentUser')

      if (!currentUser) return this.props.navigation.navigate('Signup')

      axios
        .put(`${config.API_URL}/api/sessions/${this.state.session._id}`, {
          userId: currentUser._id
        })
        .then(response => {
          currentUser.account.sessions.push(this.state.session)
          store.update('currentUser', currentUser).then(res => {
            this.props.navigation.navigate('Home', {
              newCurrentUser: currentUser
            })
          })
        })
        .catch(err => {
          // si la session est déjà reservée à la même heure on affiche le FlashAlert
          if (err.response.status === 404) {
            this.setState({
              flashAlert: true,
              errorMessage: err.response.data.message
            })
          }
        })
    } else {
      // si l'heure n'est pas sélectionné, on affiche le FlashAlert
      this.setState({
        flashAlert: true,
        errorMessage: 'Veuillez selectionner un horraire'
      })
    }
  }

  //remove flash alert pop-up and make email & password inputs empty
  removeFlashAlert = () => {
    this.setState({ flashAlert: false })
  }

  renderFlashAlert = () => {
    if (this.state.flashAlert) {
      return (
        <FlashAlert
          removeFlashAlert={this.removeFlashAlert}
          message={this.state.errorMessage}
        />
      )
    }
    return null
  }

  render() {
    const {
      name,
      address,
      center,
      dates,
      image,
      loading,
      isHourSelected,
      selectedHour,
      duration,
      firstSessionDate,
      isDayChanged
    } = this.state

    console.log('Props in Planning :', this.props)

    return loading ? (
      <View style={[mainStyles.containerFlex, mainStyles.centered]}>
        <ActivityIndicator />
      </View>
    ) : (
      <View style={styles.container}>
        {this.renderFlashAlert()}
        <View style={styles.imgContainer}>
          <View style={styles.imgBorder}>
            <ImageBackground
              resizeMode="cover"
              source={{ uri: image }}
              style={[styles.img]}
            >
              <View style={styles.textImg}>
                <MyText style={[mainStyles.paragraphe]}>
                  {name} - {formatDuration(duration)}
                </MyText>
                <MyText style={[mainStyles.tagline]}>
                  Prochaine session dans {startsAt(firstSessionDate)}
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
            <Icon name="phone-square" size={40} color={BLUE} />
          </View>
        </View>

        <View style={styles.calendarContainer}>
          <Calendar
            dates={dates}
            selectHour={this.selectHour}
            selectedHour={selectedHour}
            onSwipeDay={this.onSwipeDay}
          />
        </View>

        <CallToAction
          isSelected={isHourSelected}
          isDayChanged={isDayChanged}
          onPress={this.bookSession}
        >
          Réserver
        </CallToAction>
      </View>
    )
  }
}

const { height, width } = Dimensions.get('window')
const { heightImg, fontsize } = manageStyle(height, width)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: 5,
    flexDirection: 'column'
  },
  imgContainer: {
    height: 200 - heightImg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  img: {
    height: '100%'
  },
  imgBorder: {
    borderRadius: 4,
    overflow: 'hidden'
  },
  textImg: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  infosWrapper: {
    height: 100,
    marginTop: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey'
  },
  calendarContainer: {
    marginTop: 15,
    flex: 1
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
    fontSize: 18 - fontsize,
    lineHeight: 25
  }
})
