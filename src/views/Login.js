import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MyText } from '../components/MyText'
import { DARKBLUE, LIGHTBLUE, BLACK, mainStyles } from '../mainStyle'
import { Input } from '../components/Input'
import { Form } from '../components/Form'
import { Button } from '../components/Button'

export class Login extends Component {
  static navigationOptions = { header: null }
  render() {
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
            <Input placeholder="Email" />
            <Input noBorderBottom placeholder="Mot de passe" />
          </Form>
        </View>
        <View style={styles.subContainer}>
          <Button>Se connecter</Button>
        </View>

        <View style={[styles.subContainer, styles.footer]}>
          <MyText>Pas de compte ?</MyText>
          <TouchableOpacity>
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
