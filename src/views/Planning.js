import React, { Component } from 'react'
import {
  StyleSheet,
  ImageBackground,
  View,
  Animated,
  Easing
} from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import { parse, format } from 'date-fns'
import { Calendar } from '../components/calendar/Index'
import { Title } from '../components/Title'
import { mainStyles, DARKBLUE } from '../mainStyle'
import { MyText } from '../components/MyText'
import { CallToAction } from '../components/buttons/callToAction'
import config from '../../config'
import { rangeDateByMonth } from '../utils/utils'
const log = console.log

export class Planning extends Component {
  static navigationOptions = { header: null }

  state = {
    name: '',
    address: '',
    center: '',
    dates: [
      { month: '', days: [{ letter: '', num: '', hours: [{ hour: '' }] }] }
    ],
    scaleValue: new Animated.Value(0),
    isOpen: false
  }

  formatDate = dates => {
    return dates.map(date => {
      const dates = {
        month: format(parse(date), 'MMMM'), //March, April
        days: [
          {
            letter: format(parse(date), 'ddd'), //SUN, MON, TUE
            num: format(parse(date), 'DD'), //07, 08, 09
            hours: [{ hour: format(parse(date), 'HH:MM') }]
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
    //const { activityId } = this.props
    axios
      .get(`${config.API_URL}/api/activities/5aaa31249b9759b460611a08`)
      .then(response => {
        const { name } = response.data[0]
        const { address } = response.data[0].center_doc
        const center = response.data[0].center_doc.name
        const sessions = response.data[0].sessions_docs

        const formatedDate = this.formatDate(
          sessions.map(session => session.startsAt)
        )
        const newDate = rangeDateByMonth(formatedDate)
        this.setState({ name, address, center, dates: [...newDate] }, () => {
          console.log(this.state)
        })
      })
      .catch(e => log(e))
  }

  render() {
    const { name, address, center, dates } = this.state
    return (
      <Animated.ScrollView
        scrollEventThrottle={1}
        style={[styles.container]}
        onScroll={this.makeImgBig}
      >
        <Title fontSize="10" />
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
    backgroundColor: 'white',
    paddingHorizontal: 5
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
