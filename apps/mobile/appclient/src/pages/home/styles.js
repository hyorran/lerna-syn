import { Platform } from 'react-native'
import metrics from '../../styles/metrics'

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  tabBar: {
    backgroundColor: '#09536F',
    borderTopColor: '#d2d2d2',
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 20 : 5
  },

  view: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 180,
  },

  text: {
    color: '#fff',
  },

  icon: {
    color: '#fff',
    fontSize: metrics.iconHeaderSize
  },

  header: {
    backgroundColor: '#09536F',
  }
}
