import { StackNavigator } from 'react-navigation'
import { Login } from './src/views/Login'
import { Activities } from './src/views/Activities'
import { Planning } from './src/views/Planning'

console.ignoredYellowBox = ['Warning: componentWill', 'Remote debugger']

export const App = StackNavigator(
  {
    Login: { screen: Login },
    Activities: { screen: Activities },
    Planning: { screen: Planning }
  },
  {
    initialRouteName: 'Login'
  }
)
