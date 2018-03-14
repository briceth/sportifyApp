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
import { Calendar } from '../components/calendar/Index'
import { Title } from '../components/Title'
import { mainStyles, DARKBLUE } from '../mainStyle'
import { MyText } from '../components/MyText'
import { CallToAction } from '../components/buttons/callToAction'
import config from '../../config'
const log = console.log

export class Planning extends Component {
  static navigationOptions = { header: null }

  state = {
    name: '',
    address: '',
    sessions: [],
    center: '',
    scaleValue: new Animated.Value(0),
    isOpen: false
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

  // renderTab = () => {
  //   return this.state.isOpen ? <Hours /> : null
  // }
  componentDidMount() {
    //const { activityId } = this.props
    axios
      .get(`${config.API_URL}/api/activities/5aa7a17c08e0a71fab3c1273`)
      .then(response => {
        log(response.data)
        const { name } = response.data
        const { address } = response.data.center
        const center = response.data.center.name
        const { sessions } = response.data

        this.setState(
          { name, address, sessions: [...sessions], center },
          () => {
            log('state', this.state)
          }
        )
      })
      .catch(e => log(e))
  }

  render() {
    // const nearFar = this.state.scaleValue.interpolate({
    //   inputRange: [0, 0.5, 1],
    //   outputRange: [1, 7, 1]
    // })
    const { name, address, center, sessions } = this.state
    return (
      <Animated.ScrollView
        scrollEventThrottle={1}
        style={[styles.container]}
        onScroll={this.makeImgBig}
      >
        <Title fontSize="10" />
        <View>
          {/* <Animated.Image
            style={[
              styles.img,
              {
                transform: [{ scale: nearFar }]
              }
            ]}
            resizeMode="cover"
            source={{ uri: 'https://picsum.photos/400/500/?random' }}
          /> */}

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
              {/* <MyText style={[styles.text]}>75011 - Paris</MyText> */}
            </View>
            <Icon name="phone-square" size={40} color={DARKBLUE} />
          </View>
        </View>

        <Calendar sessions={sessions} />

        <CallToAction>Réserver</CallToAction>

        {/* <TouchableOpacity style={styles.panel} onPress={this.toggleTab}>
          <MyText style={styles.titlePanel}>Aujourd'hui</MyText>
          <Icon name="angle-right" size={30} color={'white'} />
        </TouchableOpacity> */}
        {/* {this.renderTab()} */}
        <View />
        <View />
      </Animated.ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
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
