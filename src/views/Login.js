import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MyText } from '../components/MyText'
import { DARKBLUE, LIGHTBLUE, BLACK, mainStyles } from '../mainStyle'
import { Input } from '../components/Input'
import { Form } from '../components/Form'
import { Button } from '../components/Button'
import axios from 'axios'
const log = console.log

export class Login extends Component {
  static navigationOptions = { header: null }

  state = {}

  handleInputs = (text, key) => {
    this.setState({ [key]: text }, () => {
      log('state', this.state)
    })
  }

  handleSubmit = () => {
    const { email, password } = this.state
    log('this.state handle submit', this.state)

    axios
      .post('http://localhost:3100/auth/log_in', { email, password })
      .then(response => {
        log('response', response)
      })
      .catch(e => log(e))
  }

  render() {
    console.log('this.props', this.props)
    return (
      <View style={mainStyles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>
            Sporti<Text style={styles.subLogo}>fy</Text>
          </Text>
          <MyText style={styles.tagline}>Renseignez vos identifiants</MyText>
        </View>
        <View style={styles.subContainer}>
          <Form>
            <Input
              noCapitalize
              handleInputs={this.handleInputs}
              data="email" //to receive key arg in handleInput
              placeholder="Email"
            />
            <Input
              handleInputs={this.handleInputs}
              data="password" //to receive key arg in handleInput
              noBorderBottom
              placeholder="Mot de passe"
              secureTextEntry
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
  logo: {
    fontSize: 70,
    color: DARKBLUE
  },
  subLogo: {
    color: LIGHTBLUE
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
