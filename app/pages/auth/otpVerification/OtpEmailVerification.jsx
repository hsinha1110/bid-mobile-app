import {
  View,
  Text,
  Image,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../../styles/colors";
import imagePath from "../../../constants/imagePath";
import navigationPath from "../../../constants/navigationPath";
import * as yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import DropShadow from "react-native-drop-shadow";
import PhoneInput from "react-native-phone-number-input";
import TextComp from "../../../components/Text/TextComp";
import ButtonComp from "../../../components/Button/ButtonComp";
import FontFamily from "../../../constants/FontFamily";
const OtpEmailVerification = () => {
  const [keybaordHeight, setKeyboardHeight] = useState(0);
  const scrollViewRef = useRef(null);

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     "keyboardDidShow",
  //     (event) => {
  //       console.log("event trigger on show keyboard", event);
  //       setKeyboardHeight(event.endCoordinates.height - 20);
  //     }
  //   );
  //   const scrollViewSizeChanged = (height) => {
  //     // y since we want to scroll vertically, use x and the width-value if you want to scroll horizontally
  //     scrollViewRef.current?.scrollTo({ y: height, animated: true });
  //   };
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     "keyboardDidHide",
  //     (event) => {
  //       console.log("event trigger on hide keyboard", event);
  //       setKeyboardHeight(0);
  //     }
  //   );
  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);
  const phoneInput = useRef(null);
  // const {otpType} = props.route.params;
  // const initialValue = {mobile_number: null, otp_type: otpType};
  // const [value, setValue] = useState(initialValue);
  const navigation = useNavigation();
  // const dispatch = useDispatch();

  const loginValidationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(/(\d){8}\b/, "Enter a valid phone number")
      .required("Phone number is required"),
  });
  const handleChange = (e) => {
    // setValue({ ...initialValue, mobile_number: e });
  };
  const submitHandler = () => {
    navigation.navigate(navigationPath.OTP_VERIFICATION);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
      >
        <View style={{ height: responsiveHeight(5) }}></View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <DropShadow style={styles.shadowProp}>
              <View style={[styles.box]}>
                <View
                  style={{
                    marginTop: responsiveHeight(20),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "80%",
                      bottom: responsiveHeight(15),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FontFamily.POPPINS_SEMIBOLD,
                        fontSize: responsiveFontSize(2),
                        color: Colors.BLACK,
                      }}
                    >
                      OTP Verification
                    </Text>
                    <Text
                      style={{
                        fontFamily: FontFamily.POPPINS_SEMIBOLD,
                        fontSize: responsiveFontSize(1.4),
                        color: Colors.BLACK,
                      }}
                    >
                      For E-mail-ID
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "80%",
                      bottom: responsiveHeight(10),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FontFamily.POPPINS_SEMIBOLD,
                        fontSize: responsiveFontSize(2),
                        color: Colors.BLACK,
                      }}
                    >
                      Enter the OTP you received on
                    </Text>
                    <View style={{ width: "87%" }}>
                      <Text
                        style={{
                          fontFamily: FontFamily.POPPINS_SEMIBOLD,
                          fontSize: responsiveFontSize(1.2),
                          color: Colors.BLUE,
                        }}
                      >
                        jasonfer@gmail.com
                      </Text>
                    </View>
                    <View
                      style={{ width: "90%", height: 60, alignItems: "center" }}
                    >
                      <OTPInputView
                        style={{
                          alignItems: "center",
                          width: "100%",
                          height: 30,
                          top: responsiveHeight(4),
                        }}
                        pinCount={4}
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        //   onCodeChanged={handleChange('otp')}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={
                          styles.underlineStyleHighLighted
                        }
                        onCodeFilled={(code) => {}}
                      />
                    </View>
                    <View
                      style={{ width: "87%", top: 30, alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontFamily: FontFamily.POPPINS_SEMIBOLD,
                          fontSize: responsiveFontSize(1.0),
                          color: Colors.NAVY_BLUE,
                        }}
                      >
                        Resend OTP
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "90%",
                      justifyContent: "center",
                      alignItems: "center",
                      bottom: responsiveHeight(5),
                      marginVertical: responsiveHeight(1),
                    }}
                  >
                    <ButtonComp
                      onPress={() => submitHandler()}
                      style={{
                        width: "70%",
                      }}
                      title={"Send OTP"}
                    />
                  </View>
                </View>
              </View>
            </DropShadow>
          </View>
        </View>
        <View style={{ marginBottom: keybaordHeight }}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={imagePath.LOGO}
              resizeMode={"contain"}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpEmailVerification;