import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {horizontalScale, moderateScale} from '../../../utils/Dimensions';
import FontFamily from '../../constants/FontFamily';
import Colors from '../../styles/colors';
import styles from './styles';

const HeaderCart = ({
  image,
  title,
  titleTwo,
  menu = {},
  notification = {},
  onPress,
  home,
  search
}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'space-between', height: 40,marginHorizontal:responsiveWidth(2)}}>
        <View style={styles.logoContainer}>
          {!!home? <TouchableOpacity onPress={onPress}>
            <Image
              source={home}
              resizeMode={'contain'}
              style={styles.home}
            />
          </TouchableOpacity>:null}
           <TouchableOpacity onPress={onPress}>
            <Image
              source={image}
              resizeMode={'cover'}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={{flex: 1, marginStart: responsiveWidth(2)}}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: Colors.BLACK,
                fontFamily: FontFamily.POPPINS_REGULAR,
              }}>
              {title}
            </Text>
          </View>
          <View>
            {!!titleTwo ? (
              <View style={{marginHorizontal: responsiveWidth(4)}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    alignSelf: 'center',
                    color: Colors.BLACK,
                    marginRight: responsiveWidth(2),
                    fontFamily: FontFamily.POPPINS_REGULAR,
                  }}>
                  {title}
                </Text>
              </View>
            ) : null}
          </View>
          <View
            style={{
              width: responsiveWidth(15),
              marginEnd:responsiveWidth(5),
               flexDirection: 'row',
               justifyContent: 'space-between',
            }}>
                <Pressable>
              {!!search ? (
                <Image
                  resizeMode={'cover'}
                  source={search}
                  style={[styles.searchIcon]}
                />
              ) : null}
            </Pressable>
            <Pressable>
              {!!notification ? (
                <Image
                  resizeMode={'cover'}
                  source={notification}
                  style={[styles.notifiIcon]}
                />
              ) : null}
            </Pressable>
            <TouchableOpacity>
              {!!menu ? (
                <Image
                  resizeMode={'cover'}
                  source={menu}
                  style={[styles.backIcon]}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default HeaderCart;
