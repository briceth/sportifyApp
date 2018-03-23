import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { MyText } from '../MyText'
import { BLUE, mainStyles } from '../../mainStyle'
import PropTypes from 'prop-types'

export class CallToAction extends Component {
  static propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func,
    isSelected: PropTypes.bool
  }

  render() {
    const { isSelected, onPress, children } = this.props
    return (
      <TouchableOpacity
        style={isSelected && mainStyles.blueShaddow}
        onPress={onPress}
      >
        <View style={styles.containerText}>
          <MyText style={[styles.button, isSelected && styles.selected]}>
            {children}
          </MyText>
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
    backgroundColor: 'grey',
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: '600'
  },
  selected: {
    backgroundColor: BLUE
  }
})
