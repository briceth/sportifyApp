import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivitiesComponent } from '../components/ActivitiesComponent'

export class Activities extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivitiesComponent />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
