import { Platform } from 'react-native';

export default {
  item: {
    marginBottom: 20,
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
  },

  contentItems: {
    marginTop: 20,
  },

  textArea: {
    marginLeft: -10,
  },

  input: {
    alignSelf: 'stretch',
    marginBottom: 5,
    marginHorizontal: 10,
    fontSize: 16,
  },

  header: {
    backgroundColor: '#09536F',
    color: '#fff'
  },

  headerIcon: {
    color: '#fff',
    fontSize: 20,
  },

  headerText: {
    color: '#fff',
    alignSelf: 'center'
  },

  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#FA5239'
  }
}
