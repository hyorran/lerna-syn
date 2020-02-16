import metrics from './metrics';
import { Colors } from '@syntesis/c-styles';
import fonts from './fonts';

const general = {
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  section: {
    margin: metrics.doubleBaseMargin,
  },

  sectionTitle: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: fonts.input,
    alignSelf: 'center',
    marginBottom: metrics.doubleBaseMargin,
  },

  sectionTextCenter: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: fonts.large,
    alignSelf: 'center',
  },

  alignHorizontal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  alignVertical: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  accordionText: {
    padding: 10,
  },

  accordionHeaderIcon: {
    fontSize: metrics.iconHeaderSize,
  },

  accordionHeader: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: 'grey',
    borderRadius: 5,
  },

  accordionContent: {
    backgroundColor: '#09536F20',
  }
};

export default general;
