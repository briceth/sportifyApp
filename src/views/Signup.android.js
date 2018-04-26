import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Keyboard
} from 'react-native'
import { RkAvoidKeyboard } from 'react-native-ui-kitten'
import { MyText } from '../components/MyText'
import { mainStyles } from '../mainStyle'
import { Input } from '../components/Input'
import { Form } from '../components/Form'
import { Button } from '../components/Button'
import { RadioInput } from '../components/RadioInput'
import config from '../../config'
import store from 'react-native-simple-store'
import axios from 'axios'
import PropTypes from 'prop-types'

export class Signup extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  static navigationOptions = { header: null }

  constructor(props) {
    super(props)

    this.state = {
      gender: 'Male',
      keyboardShow: false
    }

    this.imageHeight = new Animated.Value(55)
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    )
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = event => {
    this.setState({ keyboardShow: true })
    Animated.timing(this.imageHeight, {
      duration: 0,
      toValue: 25
    }).start()
  }

  keyboardDidHide = event => {
    Animated.timing(this.imageHeight, {
      duration: 0,
      toValue: 55
    }).start(() => {
      this.setState({ keyboardShow: false })
    })
  }

  handleInputs = (text, key) => {
    this.setState({ [key]: text })
  }

  signup = () => {
    axios
      .post(`${config.API_URL}/auth/sign_up`, this.state)
      .then(response => {
        store.save('currentUser', response.data.user)
        this.props.navigation.navigate('Home')
      })
      .catch(error => {
        console.log('ERROR', error.response)
      })
  }

  render() {
    console.log('render Signup')
    return (
      <View style={[mainStyles.containerFlex, styles.container]}>
        <RkAvoidKeyboard style={styles.keyboardAvoidingView}>
          <View style={[styles.subContainer, styles.logoContainer]}>
            <Animated.Image
              style={{ height: this.imageHeight }}
              resizeMode="contain"
              source={require('../images/logo.png')}
            />
          </View>
          <View style={styles.subContainer}>
            <Form>
              <Input
                data="firstName"
                placeholder="Prénom"
                handleInputs={this.handleInputs}
              />
              <Input
                data="lastName"
                placeholder="Nom"
                handleInputs={this.handleInputs}
              />
              <RadioInput
                data="gender"
                gender={this.state.gender}
                handleInputs={this.handleInputs}
              />
              <Input
                noCapitalize
                data="email"
                placeholder="Email"
                autoCorrect={false}
                handleInputs={this.handleInputs}
              />
              <Input
                secureTextEntry
                noCapitalize
                data="password"
                noBorderBottom
                placeholder="Mot de passe"
                autoCorrect={false}
                handleInputs={this.handleInputs}
              />
            </Form>
          </View>
          <View style={[styles.subContainer, styles.buttonContainer]}>
            <Button handleSubmit={this.signup}>S'inscrire</Button>
          </View>

          {console.tron.log(typeof this.imageHeight)}
        </RkAvoidKeyboard>

        {!this.state.keyboardShow && (
          <View style={[styles.subContainer, styles.footer]}>
            <MyText>Déjà inscrit ?</MyText>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <MyText style={[mainStyles.lightblueText]}>Se connecter</MyText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 25
  },
  subContainer: {
    alignItems: 'center'
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'space-between'
  },
  buttonContainer: {
    marginBottom: 10
  },
  footer: {
    alignItems: 'center',
    marginBottom: 10
  }
})
