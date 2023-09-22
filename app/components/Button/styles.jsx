import {StyleSheet} from 'react-native';

import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import FontFamily from '../../constants/FontFamily';
 import Colors from '../../styles/colors';
  
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    backgroundColor: Colors.BLUE,
    height: responsiveHeight(6),
    borderRadius:5
  },
  buttonTitle: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 14,
  },
  loginTitle: {
    color: Colors.BLACK,
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
  otpTitle: {
    color: Colors.BLACK,
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
  mobileTitle: {
    color: Colors.BLUE,
    fontSize: responsiveFontSize(9),
    fontWeight: '600',
  },

  titleMain: {
    fontSize: responsiveFontSize(1.8),
    color: '#000',
    marginTop: responsiveHeight(2),
  },
  titleNote: {
    fontSize: responsiveFontSize(1.8),
    color: '#E02020',
  },
});

export default styles;
