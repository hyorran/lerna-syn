import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation'
import Login from './pages/login'
import Home from './pages/home'
import Intro from './pages/intro'
import Profile from './pages/profile'
import Auth from './services/auth'
import LeviesAndPayments from './pages/leviesAndPayments'
import Notes from './pages/notes'
import Solicitation from './pages/solicitation'
import SolicitationNew from './pages/solicitation/new'
import SolicitationDetail from './pages/solicitation/detail'
import Contact from './pages/contact'
import Initial from './pages/initial'
import ForgotPassword from './pages/forgotPassword'
import Notification from './pages/notification'

const MainStack = createStackNavigator({
  Home,
  Intro,
  Profile,
  LeviesAndPayments,
  Notes,
  Solicitation,
  SolicitationNew,
  SolicitationDetail,
  Contact,
  Notification,
});

const LoginStack = createStackNavigator({
  Login,
  ForgotPassword,
});

const InitialStack = createStackNavigator({
  Initial,
})

export default createAppContainer(createSwitchNavigator({
  Auth,
  Main: MainStack,
  Login: LoginStack,
  Initial: InitialStack
}, {
  initialRouteName: 'Main',
}));
