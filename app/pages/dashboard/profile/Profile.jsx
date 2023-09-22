import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useState } from "react";
import imagePath from "../../../constants/imagePath";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utils/Dimensions";
import Colors from "../../../styles/colors";
import ToggleSwitch from "toggle-switch-react-native";
import styles from "../profile/styles";
import FontFamily from "../../../constants/FontFamily";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Header from "../../../components/Header/Header";
import navigationPath from "../../../constants/navigationPath";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/auth.slice";
const Profile = () => {
  const { email, last_name, first_name, mobile_number } = useSelector(
    (state) => state.auth?.user
  );
  const dispatch = useDispatch();
  
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{height:40,backgroundColor:Colors.WHITE}}>
        <Header
          onPress={() => navigation.goBack()}
          image={imagePath.LEFT}
          title="Profile"
          notification={imagePath.NOTIFICATION}
        />
      </View>
      <View
          style={{
            marginHorizontal: moderateScale(14),
             flexDirection: "row",
            marginTop:47,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.GREY,
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: responsiveWidth(2),
              flexDirection: "row",
              borderRadius: responsiveWidth(2),
            }}
          >
            <View style={{ position: "absolute" }}>
              <View
                style={{
                  borderRadius: 30,
                  width: 60,
                  height: 61,
                  borderColor: Colors.BLUE,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  top: 10,
                  backgroundColor: Colors.CARD_HEADER,
                }}
              >
                <TouchableOpacity>
                  <Image
                    source={imagePath.ACCOUNT}
                    style={{ width: 12.95, height: 15.31, tintColor: Colors.BLUE }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.DARK_GREY,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  bottom: 15,
                  left: 45,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={imagePath.CAMERA}
                  style={{
                    width: 10,
                    height: 10,
                    tintColor: Colors.WHITE,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginStart: horizontalScale(20), width: "75.5%" }}>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_BOLD,
                  fontSize: responsiveFontSize(1.4),
                  color: Colors.BLACK,
                }}
              >
                {first_name} {last_name}
               
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={imagePath.EMAIL}
              />

              <Text
                style={{
                  marginStart: moderateScale(10),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  fontSize: responsiveFontSize(1.4),
                  color: Colors.DARK_GREY,
                }}
              >
                {email}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={imagePath.PHONE}
              />
              <Text
                style={{
                  marginStart: moderateScale(10),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  fontSize: responsiveFontSize(1.4),
                  color: Colors.DARK_GREY,
                }}
              >
                {mobile_number}
              </Text>
            </View>
          </View>
        </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(navigationPath.PROFILE_FIELD)}
        style={{
          marginTop: verticalScale(40),
          marginHorizontal: moderateScale(20),
          justifyContent: "space-between",
          paddingVertical: responsiveHeight(2),
          flexDirection: "row",
          alignItems: "center",
          borderColor: Colors.CARD_GREY,
          borderWidth: 1,
          borderRadius: responsiveWidth(1.5),
        }}
      >
        <View
          style={{ flexDirection: "row", marginHorizontal: responsiveWidth(5) }}
        >
          <Image
            style={{ width: 18, height: 18 }}
            resizeMode={"center"}
            source={imagePath.ACCOUNT}
          />
          <Text
            style={{
              marginStart: responsiveWidth(5),
              fontFamily: FontFamily.POPPINS_REGULAR,
              color: Colors.BLACK,
              fontSize: responsiveFontSize(1.4),
            }}
          >
            Profile
          </Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate(navigationPath.PASSWORD)}
        style={{
          marginTop: verticalScale(10),
          marginHorizontal: moderateScale(20),
          justifyContent: "space-between",
          paddingVertical: responsiveHeight(2),
          flexDirection: "row",
          alignItems: "center",
          borderColor: Colors.CARD_GREY,
          borderWidth: 1,
          borderRadius: responsiveWidth(1.5),
        }}
      >
        <View
          style={{ flexDirection: "row", marginHorizontal: responsiveWidth(5) }}
        >
          <Image
            style={{ width: 14, height: 14 }}
            source={imagePath.PASSWORD}
          />
          <Text
            style={{
              marginStart: responsiveWidth(5),
              fontFamily: FontFamily.POPPINS_REGULAR,
              color: Colors.BLACK,
              fontSize: responsiveFontSize(1.4),
            }}
          >
            Password
          </Text>
        </View>
      </TouchableOpacity> */}
      <View
        style={{
          marginTop: verticalScale(10),
          marginHorizontal: moderateScale(20),
          justifyContent: "space-between",
          paddingVertical: responsiveHeight(2),
          flexDirection: "row",
          alignItems: "center",
          borderColor: Colors.CARD_GREY,
          borderWidth: 1,
          borderRadius: responsiveWidth(1.5),
        }}
      >
        <View
          style={{ flexDirection: "row", marginHorizontal: responsiveWidth(5) }}
        >
          <Image
            style={{ width: 18, height: 18 }}
            resizeMode={"center"}
            source={imagePath.NOTIFI}
          />
          <Text
            style={{
              marginStart: responsiveWidth(5),
              fontFamily: FontFamily.POPPINS_REGULAR,
              color: Colors.BLACK,
              fontSize: responsiveFontSize(1.4),
            }}
          >
            Notification
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            alignItems: "flex-end",
            marginEnd: moderateScale(10),
          }}
        >
          <Switch
            trackColor={{ false: "#666666", true: "#97DC21" }}
            thumbColor={isEnabled ? "#97DC21" : "#666666"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <TouchableOpacity
        // onPress={handleLogOut}

        onPress={() => {
          navigation.navigate(navigationPath.My_JOBS);
        }}
        style={{
          marginTop: verticalScale(10),
          marginHorizontal: moderateScale(20),
          justifyContent: "space-between",
          paddingVertical: responsiveHeight(2),
          flexDirection: "row",
          alignItems: "center",
          borderColor: Colors.CARD_GREY,
          borderWidth: 1,
          borderRadius: responsiveWidth(1.5),
        }}
      >
        <View
          style={{ flexDirection: "row", marginHorizontal: responsiveWidth(5) }}
        >
          <Image
            style={{ width: 20, height: 20 }}
            resizeMode={"center"}
            source={imagePath.MY_JOBS}
          />
          <Text
            style={{
              marginStart: responsiveWidth(5),
              responsiveFontSize: responsiveFontSize(1.4),
              color: Colors.BLACK,
              fontSize: responsiveFontSize(1.4),
              fontFamily: FontFamily.POPPINS_REGULAR,
            }}
          >
            My Jobs
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={handleLogOut}

        onPress={() => {
          dispatch(logout());
        }}
        style={{
          marginTop: verticalScale(10),
          marginHorizontal: moderateScale(20),
          justifyContent: "space-between",
          paddingVertical: responsiveHeight(2),
          flexDirection: "row",
          alignItems: "center",
          borderColor: Colors.CARD_GREY,
          borderWidth: 1,
          borderRadius: responsiveWidth(1.5),
        }}
      >
        <View
          style={{ flexDirection: "row", marginHorizontal: responsiveWidth(5) }}
        >
          <Image
            style={{ width: 15, height: 15 }}
            resizeMode={"center"}
            source={imagePath.LOGOUT}
          />
          <Text
            style={{
              marginStart: responsiveWidth(6),
              responsiveFontSize: responsiveFontSize(1.4),
              color: Colors.BLACK,
              fontSize: responsiveFontSize(1.4),
              fontFamily: FontFamily.POPPINS_REGULAR,
            }}
          >
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
