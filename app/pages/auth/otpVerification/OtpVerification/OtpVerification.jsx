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
import * as yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import DropShadow from "react-native-drop-shadow";
import FontFamily from "../../../../constants/FontFamily";
import Colors from "../../../../styles/colors";
import navigationPath from "../../../../constants/navigationPath";
import imagePath from "../../../../constants/imagePath";
import ButtonComp from "../../../../components/Button/ButtonComp";
import { useDispatch } from "react-redux";
import { sendOtpForRegistrationService } from "../../../../redux/services";
import { getUserProfile, otpSentForRegistrationAsync } from "../../../../redux/asyncThunk";
import Toast from "react-native-toast-message";

const OtpVerification = (props) => {
  const { mobile_number, email } = props.route.params;
  const [keybaordHeight, setKeyboardHeight] = useState(0);
  const [values, setValues] = useState({ email_otp: "", mobile_otp: "" });
  const scrollViewRef = useRef(null);
  const [disabledB, setDisabledB] = useState(true)
  useEffect(()=>{
    console.log(values.email_otp.length === 4 && values.mobile_otp.length === 4, values.email_otp, values.mobile_otp)
    if(values.email_otp.length === 4 && values.mobile_otp.length === 4){
      setDisabledB(false)
    }else {
      setDisabledB(true)
    }
  })
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        console.log("event trigger on show keyboard", event);
        setKeyboardHeight(event.endCoordinates.height - 20);
      }
    );
    const scrollViewSizeChanged = (height) => {
      // y since we want to scroll vertically, use x and the width-value if you want to scroll horizontally
      scrollViewRef.current?.scrollTo({ y: height, animated: true });
    };
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      (event) => {
        console.log("event trigger on hide keyboard", event);
        setKeyboardHeight(0);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const phoneInput = useRef(null);
  // const {otpType} = props.route.params;
  // const initialValue = {mobile_number: null, otp_type: otpType};
  // const [value, setValue] = useState(initialValue);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loginValidationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(/(\d){8}\b/, "Enter a valid phone number")
      .required("Phone number is required"),
  });

  const submitHandler = () => {
    const paylaod = { ...values, ...props.route.params };
    console.log(disabledB)
    dispatch(otpSentForRegistrationAsync(paylaod))
      .unwrap()
      .then((res) => {
        Toast.show({
          topOffset: 60,
          position: "top",
          type: "success",
          text1: "Welcome",
          text2: "Sign in successfully !!",
        });
        console.log(res)
        const id=res.data.data.user.id
        dispatch(getUserProfile({id: id}))
      })
      .catch((err) => {
        console.log(err)
        Toast.show({
          topOffset: 60,
          position: "top",
          type: "Error",
          text1: "Something went wrong",
          text2: err.response.data.message,
        });
      });
    console.log(paylaod, values, "rrrrrrrrrrrrrrrrrrrr");
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
                    marginTop: responsiveHeight(25),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "80%",
                      bottom: responsiveHeight(20),
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
                      For mobile
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "80%",
                      bottom: responsiveHeight(18),
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
                        {mobile_number}
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
                        onCodeChanged={(code) => {
                          setValues({ ...values, mobile_otp: code });
                        }}
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
                      width: "100%",
                      bottom: responsiveHeight(12),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
                      width: "100%",
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
                    <View style={{ alignItems: "flex-start", width: "70%" }}>
                      <Text
                        style={{
                          fontFamily: FontFamily.POPPINS_SEMIBOLD,
                          fontSize: responsiveFontSize(1.2),
                          color: Colors.BLUE,
                        }}
                      >
                        {email}
                      </Text>
                    </View>
                    <View
                      style={{ width: "72%", height: 60, alignItems: "center" }}
                    >
                      <OTPInputView
                        style={{
                          alignItems: "center",
                          width: "100%",
                          height: 30,
                          top: responsiveHeight(4),
                        }}
                        pinCount={4}
                        onCodeChanged={(code) => {
                         
                          setValues({ ...values, email_otp: code });
                        }}
                        
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={
                          styles.underlineStyleHighLighted
                        }
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
                      bottom: 30,
                      marginVertical: responsiveHeight(1),
                    }}
                  >
                    <ButtonComp
                      onPress={() => submitHandler()}
                      style={{
                        width: "70%",
                      }}
                      disabled={disabledB}
                      title={"Submit OTP"}
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

export default OtpVerification;
