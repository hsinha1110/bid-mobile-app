import {StyleSheet} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
 import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Dimensions';
import Colors from '../../styles/colors';
 
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
     backgroundColor: Colors.WHITE,
  },
  safeAreaView: {
    flex:1,
     backgroundColor:Colors.WHITE
  },
  logoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: verticalScale(40),
    backgroundColor: Colors.WHITE,
    marginHorizontal: horizontalScale(10),
    alignItems: 'center',

  },
  backIcon: {
    width: horizontalScale(20),
    height: horizontalScale(20),
   },
  searchIcon: {
    width: horizontalScale(20),
    height: horizontalScale(20),
    marginEnd:responsiveWidth(2)
  },
  notifiIcon: {
    width: horizontalScale(20),
    height: horizontalScale(20),
    marginEnd:responsiveWidth(2)
  },
  radioStyle: {
    width: '83%',
    flexDirection: 'row',
  },
  viewStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:Colors.WHITE,
    marginHorizontal:responsiveWidth(2)
  },home:{
    height:50,
    width:50,
    marginTop:responsiveHeight(3)
   }
});
export default styles;
