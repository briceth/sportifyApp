import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MyText } from '../components/MyText'
import { DARKBLUE, LIGHTBLUE, BLACK, mainStyles } from '../mainStyle'
import { Input } from '../components/Input'
import { Form } from '../components/Form'
import { Button } from '../components/Button'
import { RadioInput } from '../components/RadioInput'
import axios from 'axios'

export class Signup extends Component {
  static navigationOptions = { header: null }

  state = {
    gender: 'Male'
  }

  handleInputs = (text, key) => {
    this.setState({ [key]: text })
  }

  signup = () => {
    axios
      .post('')
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <View style={mainStyles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>
            Sporti<Text style={styles.subLogo}>fy</Text>
          </Text>
          <MyText style={styles.tagline}>Bienvenue jeune padawan !</MyText>
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
              handleInputs={this.handleInputs}
            />
            <Input
              secureTextEntry
              noCapitalize
              data="password"
              noBorderBottom
              placeholder="Mot de passe"
              handleInputs={this.handleInputs}
            />
          </Form>
        </View>
        <View style={styles.subContainer}>
          <Button onPress={() => this.signup()}>S'inscrire</Button>
        </View>

        <View style={[styles.subContainer, styles.footer]}>
          <MyText>Déjà inscrit ?</MyText>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <MyText style={mainStyles.lightblueText}>Se connecter</MyText>
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
    marginTop: 50,
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
