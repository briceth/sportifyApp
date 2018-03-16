import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
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
      <TouchableOpacity style={styles.button} onPress={this.props.bookSession}>
        <MyText style={styles.text}>{this.props.children}</MyText>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 103,
    backgroundColor: DARKBLUE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 15,
    borderRadius: 5
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600'
  }
})
