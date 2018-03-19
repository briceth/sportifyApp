import React, { Component } from 'react'
import { Animated, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { MyText } from './MyText'
import { DARKBLUE } from '../mainStyle'

export class FlashAlert extends Component {
  static propTypes = {
    message: PropTypes.string,
    removeFlashAlert: PropTypes.func
  }

  state = {
    moveToCenter: new Animated.Value(-350)
  }

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.moveToCenter, // The animated value to drive
      {
        toValue: 0, // Animate to right: 0
        duration: 100 // Make it take a while
      }
    ).start() // Starts the animation
  }

  render() {
    const { moveToCenter } = this.state
    return (
      <Animated.View style={[styles.container, { right: moveToCenter }]}>
        <MyText style={[styles.text]}>{this.props.message}</MyText>
        <TouchableOpacity
          onPress={this.props.removeFlashAlert}
          style={styles.button}
        >
          <MyText style={[styles.textInput]}>Ré-essayer</MyText>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: 'white',
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'red',
    fontSize: 20
  },
  button: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: DARKBLUE,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 15
  },
  textInput: {
    color: DARKBLUE
  }
})
