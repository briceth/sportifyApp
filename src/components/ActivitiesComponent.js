import React, { Component } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { MyText } from './MyText'
import { Activity } from './Activity'
import axios from 'axios'

export class ActivitiesComponent extends Component {
  state = {
    activities: []
  }

  componentDidMount() {
    axios
      .get('http://localhost:3100/api/activities')
      .then(response => {
        console.log('RESPONSE.data', response.data)
        this.setState({
          activities: response.data
        })
      })
      .catch(error => {
        console.log('ERROR', error)
      })
  }

  render() {
    return (
      <View>
        <MyText style={styles.title}>Les cours</MyText>

        <FlatList
          data={this.state.activities}
          renderItem={({ item }) => <Activity data={item} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center'
  }
})
