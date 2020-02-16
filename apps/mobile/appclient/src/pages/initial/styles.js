import { Platform } from 'react-native'

export default {
  content: {
    marginTop: '20%',
  },

  item: {
    borderWidth: 1,
    borderColor: '#FA5239',
    borderRadius: 3,
    paddingLeft: 5,
    paddingTop: 5,
    marginBottom: 15
  },

  picker: {
    marginLeft: Platform.OS === 'ios' ? -15 : -8,
    width: undefined,
  },

  text: {
    color: '#FA5239',
  },

  label: {
    alignSelf: 'center',
    color: '#FA5239',
    fontSize: 35,
    marginBottom: 50
  },

  placeholder: {
    color: '#bfc6ea',
  }
}
