import { StyleSheet } from 'react-native'

export const DARKBLUE = '#1C79C0'
export const LIGHTBLUE = '#0DD3FF'
export const BLUE = '#0389FF'
export const BLACK = '#171717'
export const LINEGREY = '#D5D5D5'

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  lightblueText: {
    color: LIGHTBLUE,
    fontWeight: 'bold',
    lineHeight: 25,
    textDecorationLine: 'underline'
  }
})
