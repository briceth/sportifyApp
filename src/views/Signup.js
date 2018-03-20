import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'
import { MyText } from '../components/MyText'
import { mainStyles } from '../mainStyle'
import { Input } from '../components/Input'
import { Form } from '../components/Form'
import { Button } from '../components/Button'
import { RadioInput } from '../components/RadioInput'
import axios from 'axios'

export class Signup extends Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props)

    this.state = {
      gender: 'Male',
      keyboardShow: false
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
      toValue: 25
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

  signup = () => {
    console.log('STATE', this.state)
    axios
      .post('http://localhost:3100/auth/sign_up', this.state)
      .then(response => {
        this.props.navigation.navigate('Planning')
      })
      .catch(error => {
        console.log('ERROR', error.response)
      })
  }

  render() {
    console.tron.log(parseInt(this.imageHeight))
    return (
      <View style={[mainStyles.containerFlex, styles.container]}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.keyboardAvoidingView}
        >
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
                autoCorrect={false}
                handleInputs={this.handleInputs}
              />
              <Input
                data="lastName"
                placeholder="Nom"
                autoCorrect={false}
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
        </KeyboardAvoidingView>

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
