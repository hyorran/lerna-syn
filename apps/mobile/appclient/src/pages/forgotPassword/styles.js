import fonts from '../../styles/fonts'
import metrics from '../../styles/metrics'

export default {
  input: {
    marginBottom: 5,
    fontSize: fonts.input,
  },

  item: {
    marginBottom: 40,
  },

  text: {
    marginBottom: 30,
    fontSize: fonts.input,
  },

  contentItems: {
    flex: 1,
    alignSelf: 'center',
    marginTop: '20%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BEBEBE'
  },

  header: {
    backgroundColor: '#09536F',
    color: '#fff'
  },

  headerIcon: {
    color: '#fff',
    fontSize: metrics.iconHeaderSize,
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
    marginTop: 20,
    backgroundColor: '#FA5239'
  }
}
