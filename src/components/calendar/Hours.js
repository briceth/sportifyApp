import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { MyText } from './MyText'

export class Hours extends Component {
  state = {
    isSelected: null,
    hours: ''
  }

  selectHour = (hour, index) => {
    this.setState({ hour, isSelected: index }, () => {
      console.log('this state', this.state)
    })
  }

  render() {
    const { isSelected } = this.state
    return (
      <ScrollView horizontal contentContainerStyle={styles.content}>
        <View style={styles.container}>
          {['11h30', '14h00', '15h30', '17h30'].map((hour, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.selectHour(hour, index)}
              >
                <MyText
                  style={[
                    styles.pan,
                    index === isSelected && styles.selectedPan
                  ]}
                >
                  {hour}
                </MyText>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  container: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  pan: {
    fontSize: 16,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  selectedPan: {
    borderColor: 'red',
    borderWidth: 1
  }
})
