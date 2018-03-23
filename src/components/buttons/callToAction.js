import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { MyText } from '../MyText'
import { ZEBLUE, mainStyles } from '../../mainStyle'
import PropTypes from 'prop-types'

export class CallToAction extends Component {
  static propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func
  }

  render() {
    return (
      <TouchableOpacity
        style={mainStyles.blueShaddow}
        onPress={this.props.onPress}
      >
        <View style={styles.containerText}>
          <MyText style={[styles.button]}>{this.props.children}</MyText>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  containerText: {
    borderRadius: 5,
    overflow: 'hidden'
  },
  button: {
    paddingVertical: 15,
    backgroundColor: ZEBLUE,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: '600'
  }
})
