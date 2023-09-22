import { View, Text, TextInput, Image } from "react-native";
import React from "react";
import Colors from "../../styles/colors";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontFamily from "../../constants/FontFamily";
const Search = (props) => {
  return (
    <View
      style={{
        justifyContent: "center",
        marginHorizontal: responsiveWidth(3),
        marginTop: responsiveHeight(2),
      }}
    >
      <View
        style={{
          height: 40,
          borderColor: Colors.CARD_GREY,
          borderWidth: 1,
          flexDirection: "row",
          borderRadius: 5,
        }}
      >
        <Image
          style={{ height: 20, width: 20, top: 7, marginStart: 10 }}
          source={props.search}
        />
        <TextInput
          placeholder={props.placeholder}
          onChangeText={(e,v)=>props.onChange(e, v)}
          value={props.value}
          style={{
            width: "80%",
            borderRadius: 5,
            paddingStart: 20,
            height: 40,
            fontFamily: FontFamily.POPPINS_LIGHT,
            fontSize: responsiveFontSize(1.2),
          }}
        />
      </View>
    </View>
  );
};

export default Search;
