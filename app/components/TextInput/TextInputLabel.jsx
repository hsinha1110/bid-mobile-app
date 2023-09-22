import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions'; 
import Colors from '../../styles/colors';
import FontFamily from '../../constants/FontFamily';

const TextInputLabel = ({label, placeholder}) => {
  return (
    <View
      style={{
         height: responsiveHeight(5),
        justifyContent: 'space-between',
      }}>
      <Text style={{fontSize:responsiveFontSize(1.4),color:Colors.BLACK,fontFamily:FontFamily.POPPINS_REGULAR}}>{label}</Text>
      <TextInput
        style={{
          width: '100%',
          borderBottomColor: Colors.CARD_GREY,
          borderBottomWidth: 1,
          backgroundColor: Colors.WHITE,
        }}
        placeholder={placeholder}
      />
    </View>
  );
};

export default TextInputLabel;
