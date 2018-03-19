import { StackNavigator } from 'react-navigation'
import { Login } from './src/views/Login'
import { Home } from './src/views/Home'
import { Planning } from './src/views/Planning'
import { Signup } from './src/views/Signup'

console.ignoredYellowBox = ['Warning: componentWill', 'Remote debugger']

export const App = StackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    Home: { screen: Home },
    Planning: { screen: Planning }
  },
  {
    initialRouteName: 'Home'
  }
)
