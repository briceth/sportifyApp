import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { LINEGREY } from '../mainStyle'
import { LIGHTBLUE } from '../mainStyle'
import { GREY } from '../mainStyle'

export class RadioInput extends Component {
  render() {
    const radioMale = this.props.gender === 'Male' ? styles.active : {}
    const textMale = this.props.gender === 'Male' ? styles.textActive : {}
    const radioFemale = this.props.gender === 'Female' ? styles.active : {}
    const textFemale = this.props.gender === 'Female' ? styles.textActive : {}

    return (
      <View style={styles.input}>
        <TouchableOpacity
          style={[styles.radio, radioMale]}
          onPress={() => this.props.handleInputs('Male', this.props.data)}
        >
          <Text style={[styles.radioText, textMale]}>Homme</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radio, radioFemale]}
          onPress={() => this.props.handleInputs('Female', this.props.data)}
        >
          <Text style={[styles.radioText, textFemale]}>Femme</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 55,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: LINEGREY
  },
  radio: {
    flex: 1,
    justifyContent: 'center'
  },
  active: {
    backgroundColor: LIGHTBLUE
  },
  radioText: {
    color: GREY,
    textAlign: 'center',
    fontSize: 18
  },
  textActive: {
    color: 'white'
  }
})
