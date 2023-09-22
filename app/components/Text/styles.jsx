import {StyleSheet} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Colors from '../../styles/colors';
  
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(60),
    backgroundColor: Colors.BLUE,
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(1),
  },
  buttonTitle: {
    color: Colors.WHITE,
    fontSize: responsiveFontSize(2),
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
  titleCustomer:{
    color:Colors.BLUE
  }
});

export default styles;
