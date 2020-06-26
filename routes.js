import React from 'react';
import Home from './components/home'
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import List from './components/list';
import Timing from './components/timing';
import Receive from './components/receive';
import Snap from './components/snap';
import ModalScreen from './components/modal';
import Delet from './components/delet';
import { Router, Scene } from 'react-native-router-flux'


const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene key="login" component={LoginForm} title="My Snapi - Connexion" initial />
      <Scene key="register" component={RegisterForm} title="My Snapi - Register" />
      <Scene type="reset" key="home" component={Home} title="My Snapi - Home"/>
      <Scene key="list" component={List} title="My Snapi - Send to"/>
      <Scene key="timing" component={Timing} title="My Snapi - Timing"/>
      <Scene key="receive" component={Receive} title="My Snapi - Receive"/>
      <Scene key="snap" component={Snap} title="My Snapi - Snap"/>
      <Scene key="modal" component={ModalScreen} title="My snapi - Modal" />
      <Scene key="delet" component={Delet} title="My Snapi - End"/>
    </Scene>
  </Router>
)

export default Routes