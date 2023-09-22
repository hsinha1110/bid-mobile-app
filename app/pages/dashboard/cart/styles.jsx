import {StyleSheet} from 'react-native';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import FontFamily from '../../../constants/FontFamily';
import Colors from '../../../styles/colors';
import { horizontalScale, verticalScale } from '../../../utils/Dimensions';
 
const styles = StyleSheet.create({
  container: {
   //  justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    margin: 5,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  logoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: verticalScale(40),
    backgroundColor: Colors.WHITE,
    marginHorizontal: horizontalScale(18),
   //  alignItems: 'center',
  },
  backIcon: {
    width: horizontalScale(18),
    height: horizontalScale(20),
  },
  radioStyle: {
    width: '83%',
    flexDirection: 'row',
  },
  viewStyle: {
    flexDirection: 'row',
   //  justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    marginHorizontal: responsiveWidth(2),
  },

  //.......................Card Details 
  box: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BLUE,
    borderWidth: 0.5,
    width: responsiveWidth(78),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
    
  },
  boxHeight: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BLUE,
    borderWidth: 0.5,
    width: responsiveWidth(78),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:responsiveHeight(15),
    paddingVertical: responsiveHeight(6),
    
  },
  shadowProp: {
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  innerContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
   paddingVertical: 30,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(100),
    marginTop:responsiveHeight(4),
    // height: "100%",
    marginBottom:responsiveHeight(2)
     },
  logo: {
    resizeMode: 'contain',
    height: responsiveHeight(18),
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
    flex: 1,
    marginBottom: responsiveHeight(4),
    justifyContent: 'flex-end',
  },

  otpTitle: {
    color: Colors.NAVY_BLUE,
    fontFamily: FontFamily.POPPINS_LIGHT,
    marginBottom: responsiveHeight(3),
    fontSize: responsiveFontSize(1.2),
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
    alignItems: 'center',
    width: '88%',
    height: 60,
    justifyContent: 'center',
    marginStart: responsiveWidth(0.1),
    borderBottomWidth:responsiveWidth(0.3),
    borderColor:Colors.BORDER_GREY,
   
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
    width: 44,
    height: 40,
    borderWidth: 0,
    marginHorizontal: 2,
    backgroundColor: '#99999926',
    borderBottomWidth: 1,
    color: '#000',
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
  container: {
    flex: 1,
    backgroundColor:Colors.WHITE
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }

});
export default styles;