import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import axios from 'axios'
import { DARKBLUE, LIGHTBLUE, BLACK, mainStyles } from '../mainStyle'
import { MyText } from '../components/MyText'
import { Input } from '../components/Input'
import { Form } from '../components/Form'
import { Button } from '../components/Button'
import { FlashAlert } from '../components/FlashAlert'
import { Title } from '../components/Title'
const log = console.log

export class Login extends Component {
  static navigationOptions = { header: null }
  static propTypes = {
    navigation: PropTypes.object,
    navigate: PropTypes.func
  }

  state = {
    flashAlert: false,
    email: '',
    password: ''
  }

  handleInputs = (text, key) => {
    this.setState({ [key]: text }, () => {
      log('state', this.state)
    })
  }

  handleSubmit = () => {
    const { email, password } = this.state

    axios
      .post('http://localhost:3100/auth/log_in', { email, password })
      .then(response => {
        if (response.status === 200) {
          return this.props.navigation.navigate('Activities')
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
      <View style={mainStyles.container}>
        <View style={styles.logoContainer}>
          {this.renderFlashAlert()}
          <Title />
          {/* <Text style={styles.logo}>
            Sporti<Text style={styles.subLogo}>fy</Text>
          </Text> */}
          <MyText style={styles.tagline}>Renseignez vos identifiants</MyText>
        </View>
        <View style={styles.subContainer}>
          <Form>
            <Input
              noCapitalize
              handleInputs={this.handleInputs}
              data="email" //to receive key arg in handleInput
              placeholder="Email"
              text={this.state.email}
            />
            <Input
              handleInputs={this.handleInputs}
              data="password" //to receive key arg in handleInput
              noBorderBottom
              placeholder="Mot de passe"
              secureTextEntry
              text={this.state.password}
            />
          </Form>
        </View>
        <View style={styles.subContainer}>
          <Button handleSubmit={this.handleSubmit}>Se connecter</Button>
        </View>

        <View style={[styles.subContainer, styles.footer]}>
          <MyText>Pas de compte ?</MyText>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}
          >
            <MyText style={mainStyles.lightblueText}>S'inscrire</MyText>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center'
  },
  logoContainer: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagline: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 17,
    color: BLACK
  },
  footer: {
    marginBottom: 20
  }
})
