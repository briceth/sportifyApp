import Reactotron from 'reactotron-react-native'

Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

console.tron = Reactotron

// console.tron.log('HELLLO WORLD')

//     Reactotron.log('Rendering Home')
//     Reactotron.log({ currentUser: this.state.currentUser })
//     Reactotron.display({
//       name: 'KNOCK KNOCK',
//       preview: "Who's there?",
//       value: 'Orange.'
//     })
//     console.tron.display({
//       name: 'CurrentUser',
//       preview: 'The preview',
//       value: this.state.currentUser,
//       important: true
//     })
//     console.tron.display({
//       name: 'Not important',
//       preview: 'The preview',
//       value: 'Lalalala'
//     })
