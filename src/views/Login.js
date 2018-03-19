import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Animated,
  Keyboard
} from 'react-native'
import PropTypes from 'prop-types'
import axios from 'axios'
import { mainStyles } from '../mainStyle'
import { MyText } from '../components/MyText'
import { Input } from '../components/Input'
import { Form } from '../components/Form'
import { Button } from '../components/Button'
import { FlashAlert } from '../components/FlashAlert'
import config from '../../config'
import store from 'react-native-simple-store'

export class Login extends Component {
  static navigationOptions = { header: null }
  static propTypes = {
    navigation: PropTypes.object,
    navigate: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      flashAlert: false,
      email: '',
      password: ''
    }

    this.imageHeight = new Animated.Value(55)
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    )
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    )
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow = event => {
    this.setState({ keyboardShow: true })
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: 40
    }).start()
  }

  keyboardWillHide = event => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: 55
    }).start(() => {
      this.setState({ keyboardShow: false })
    })
  }

  handleInputs = (text, key) => {
    this.setState({ [key]: text })
  }

  handleSubmit = () => {
    const { email, password } = this.state
    axios
      .post(`${config.API_URL}/auth/log_in`, { email, password })
      .then(response => {
        if (response.status === 200) {
          store.save('currentUser', response.data.user)
          return this.props.navigation.navigate('Home')
        }
      })
      .catch(e => {
        if (e.response.status === 401) {
          this.setState({ flashAlert: true })
        }
      })
  }

  renderFlashAlert = () => {
    if (this.state.flashAlert) {
      return (
        <FlashAlert
          removeFlashAlert={this.removeFlashAlert}
          message="email ou mot de passe incorrect"
        />
      )
    }
    return null
  }

  //remove flash alert pop-up and make email & password inputs empty
  removeFlashAlert = () => {
    this.setState({ flashAlert: false, email: '', password: '' })
  }

  render() {
    return (
      <View style={[mainStyles.containerFlex, styles.container]}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.subContainer}>
            {this.renderFlashAlert()}
            <Animated.Image
              style={{ height: this.imageHeight }}
              resizeMode="contain"
              source={require('../images/logo.png')}
            />
          </View>
          <View style={styles.subContainer}>
            <Form>
              <Input
                noCapitalize
                handleInputs={this.handleInputs}
                data="email" //to receive key arg in handleInput
                placeholder="Email"
                autoCorrect={false}
                text={this.state.email}
              />
              <Input
                handleInputs={this.handleInputs}
                data="password" //to receive key arg in handleInput
                noBorderBottom
                placeholder="Mot de passe"
                secureTextEntry
                autoCorrect={false}
                text={this.state.password}
              />
            </Form>
          </View>
          <View style={[styles.subContainer, styles.buttonContainer]}>
            <Button handleSubmit={this.handleSubmit}>Se connecter</Button>
          </View>
        </KeyboardAvoidingView>

        <View style={[styles.subContainer, styles.footer]}>
          <MyText>Pas de compte ?</MyText>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}
          >
            <MyText style={[mainStyles.lightblueText]}>S'inscrire</MyText>
          </TouchableOpacity>
        </View>
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
    marginBottom: 55,
    justifyContent: 'space-around'
  },
  buttonContainer: {
    marginTop: 5
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 10
  }
})
