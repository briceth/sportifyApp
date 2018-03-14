import React, { Component } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { MyText } from '../../MyText'
import { Activity } from './Activity'
import config from '../../../../config'
import { mainStyles } from '../../../mainStyle'
import axios from 'axios'

export class Activities extends Component {
  state = {
    activities: []
  }

  componentDidMount() {
    axios
      .get(`${config.API_URL}/api/activities`)
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
        <MyText style={[mainStyles.title]}>Les cours</MyText>

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
