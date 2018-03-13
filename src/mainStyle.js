import { StyleSheet } from 'react-native'

export const DARKBLUE = '#1C79C0'
export const LIGHTBLUE = '#0DD3FF'
export const BLUE = '#0389FF'
export const BLACK = '#171717'
export const GREY = '#BBBBC3'
export const LINEGREY = '#D5D5D5'

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  containerFlex: {
    flex: 1,
  },
  lightblueText: {
    color: LIGHTBLUE,
    fontWeight: 'bold',
    lineHeight: 25,
    textDecorationLine: 'underline'
  },
  shadow: {
    shadowColor: '#3e3e3e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 1
  },
  title: {
    color: BLUE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 10
  },
  boldText: {
    color: BLACK,
    fontWeight: 'bold',
    fontSize: 16
  }
})
