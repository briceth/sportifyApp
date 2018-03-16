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
import { parse, format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import { Calendar } from '../components/calendar/Index'
import { mainStyles, DARKBLUE } from '../mainStyle'
import { MyText } from '../components/MyText'
import { CallToAction } from '../components/buttons/callToAction'
import config from '../../config'
import { rangeDateByMonth, generateId } from '../utils/utils'
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
    dates: [
      // {
      //   month: '',
      //   days: [{ letter: '', num: '', id: '', hours: [{ hour: '', id: '' }] }]
      // }
    ],
    scaleValue: new Animated.Value(0),
    isOpen: false
  }

  formatDate = dates => {
    return dates.map(date => {
      const dayId = generateId(date)

      const dates = {
        month: format(parse(date), 'MMMM', { locale: fr }), //March, April
        days: [
          {
            letter: format(parse(date), 'ddd', { locale: fr }), //SUN, MON, TUE
            num: format(parse(date), 'DD'), //07, 08, 09
            id: dayId,
            hours: [
              {
                hour: format(parse(date), 'HH:MM'),
                id: generateId(date, true),
                _dayId: dayId
              }
            ]
          }
        ]
      }

      return dates
    })
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

        const formatedDate = this.formatDate(
          sessions.map(session => session.startsAt)
        )
        console.log('formatedDate', formatedDate)

        const newDate = rangeDateByMonth(formatedDate)
        this.setState({ name, address, center, dates: [...newDate] }, () => {
          console.log('waza', this.state)
        })
      })
      .catch(e => log(e))
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

        <Calendar dates={dates} />

        <CallToAction>Réserver</CallToAction>

        {/* <TouchableOpacity style={styles.panel} onPress={this.toggleTab}>
          <MyText style={styles.titlePanel}>Aujourd'hui</MyText>
          <Icon name="angle-right" size={30} color={'white'} />
        </TouchableOpacity> */}
        {/* {this.renderTab()} */}
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
