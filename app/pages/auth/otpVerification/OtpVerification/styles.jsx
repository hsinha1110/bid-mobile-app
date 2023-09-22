import {StyleSheet} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';  
import FontFamily from '../../../../constants/FontFamily';
import Colors from '../../../../styles/colors';
 const styles = StyleSheet.create({
  container: {
     justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  body: {
     width: '100%',
    justifyContent: 'center',
     alignItems: 'center',
  },
  footer: {
    width: '100%',
    height: 60,
     justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BLUE,
    borderWidth: 0.5,
    height: responsiveHeight(63),
    width: responsiveWidth(80),
    justifyContent: 'center',
    marginTop: responsiveHeight(4),
  },
  shadowProp: {
    shadowColor: '#000',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveHeight(2),
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(100),
    marginTop:responsiveHeight(6),
    // height: "100%",
    marginBottom:responsiveHeight(2)
     },
  logo: {
    resizeMode: 'contain',
    height: responsiveHeight(20),
    marginBottom:responsiveHeight(2)
  },
  loginTitle: {
    fontFamily: FontFamily.POPPINS_SEMIBOLD,
    color: Colors.BLACK,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 80,
    fontSize: responsiveFontSize(2.4),
  },
  mobileTitle: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: responsiveFontSize(1.4),
    color: Colors.BLACK,
  },
  otpTitle: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  outerContainer: {
    flex: 0.4,
    marginBottom: responsiveHeight(5),
    justifyContent: 'flex-end',
  },

  otpTitle: {
    color: Colors.NAVY_BLUE,
    fontFamily: FontFamily.POPPINS_LIGHT,
    marginStart: responsiveWidth(2),
    marginBottom: responsiveHeight(3),
    fontSize: responsiveFontSize(1.7),
  },
  titleCustomer: {
    color: Colors.BLUE,
  },
  buttonStyle: {
    marginTop: responsiveHeight(18),
    justifyContent: 'flex-end',
  },
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 20,
    color: 'black',
  },

  phoneNumberView: {
    width: responsiveWidth(70),
    height: 50,
    marginStart: responsiveWidth(4),
    alignItems: 'center',
  },
  errorText: {
    fontSize: responsiveFontSize(1.2),
    color: 'red',
    marginStart: responsiveWidth(4),
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  underlineStyleBase: {
    width: 53,
    height: 61,
    borderWidth: 0,
    marginHorizontal: 2,
    backgroundColor: '#99999926',
    borderBottomWidth: 1,
    color: '#000',
    borderRadius: 5,

  },

  underlineStyleHighLighted: {
    backgroundColor: '#99999926',
    color: '#000',
    borderRadius: 5,
  },
  otpResend: {
    fontFamily: FontFamily.POPPINS_BOLD,
    color: Colors.NAVY_BLUE,
    justifyContent: 'center',
    top: 5,
    marginStart: responsiveWidth(2),
    fontSize: responsiveFontSize(1.2),
  },
});
export default styles;