import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { MyText } from '../MyText'
import { DARKBLUE } from '../../mainStyle'
import PropTypes from 'prop-types'

export class CallToAction extends Component {
  static propTypes = {
    children: PropTypes.node,
    bookSession: PropTypes.func
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.bookSession}
      >
        <View style={styles.containerText}>
          <MyText style={[styles.button]}>{this.props.children}</MyText>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  containerText: {
    borderRadius: 5,
    overflow: 'hidden'
  },
  button: {
    paddingVertical: 15,
    backgroundColor: DARKBLUE,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: '600'
  }
})
