import './ReactotronConfig'
import { StackNavigator } from 'react-navigation'
import { Login } from './src/views/Login'
import { Home } from './src/views/Home'
import { Planning } from './src/views/Planning'
import { Signup } from './src/views/Signup'
import { Session } from './src/views/Session'

console.ignoredYellowBox = ['Warning: componentWill', 'Remote debugger']

export const App = StackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    Home: { screen: Home },
    Planning: { screen: Planning },
    Session: { screen: Session }
  },
  {
    initialRouteName: 'Home'
  }
)
