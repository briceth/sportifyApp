import './ReactotronConfig'
import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import { Login } from './src/views/Login'
import { Home } from './src/views/Home'
import { Planning } from './src/views/Planning'
import { Signup } from './src/views/Signup'
import { Session } from './src/views/Session'
import { Scanner } from './src/views/Scanner'

import SplashScreen from 'react-native-splash-screen'

console.ignoredYellowBox = ['Warning: componentWill', 'Remote debugger']

const RootStack = StackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    Home: { screen: Home },
    Planning: { screen: Planning },
    Session: { screen: Session },
    Scanner: { screen: Scanner }
  },
  {
    initialRouteName: 'Home'
  }
)

export class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return <RootStack />
  }
}
