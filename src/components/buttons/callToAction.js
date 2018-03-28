import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { MyText } from '../MyText'
import { BLUE, mainStyles } from '../../mainStyle'
import PropTypes from 'prop-types'

export class CallToAction extends Component {
  static propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func,
    isSelected: PropTypes.bool,
    isDayChanged: PropTypes.bool,
    teacher: PropTypes.bool
  }

  render() {
    const { isSelected, onPress, children, isDayChanged, teacher } = this.props
    return (
      //si le jour n'a pas été changé (swip) et si l'heure est selectionnée, tu le mets en bleu
      <TouchableOpacity
        style={[
          !isDayChanged && isSelected ? mainStyles.blueShaddow : null,
          teacher && mainStyles.blueShaddow // pour le teacher qui doit scanner ses élèves, le mettre en bleu par défaut
        ]}
        onPress={onPress}
      >
        <View style={styles.containerText}>
          <MyText
            style={[
              styles.button,
              !isDayChanged && isSelected ? styles.selected : null,
              teacher && styles.selected
            ]}
          >
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
