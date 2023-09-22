import {
  View,
  Image,
  Text,
  SafeAreaView,
  Keyboard,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropShadow from "react-native-drop-shadow";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Colors from "../../../styles/colors";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import styles from "./styles";
import PhoneInput from "react-native-phone-number-input";
import _ from "lodash";
import navigationPath from "../../../constants/navigationPath";
import FontFamily from "../../../constants/FontFamily";
import { sendOtpAsync } from "../../../redux/asyncThunk/auth.AsyncThunk";
import imagePath from "../../../constants/imagePath";
import ButtonComp from "../../../components/Button/ButtonComp";
import TextComp from "../../../components/Text/TextComp";
import { useEffect, useRef, useState } from "react";
import { yellow100 } from "react-native-paper/lib/typescript/styles/colors";
import { registrationAsync } from "../../../redux/asyncThunk";
import Toast from "react-native-toast-message";

const CreateAnAccount = (props) => {
  const phoneInput = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const submitHandler = (values) => {
    dispatch(registrationAsync(values))
      .unwrap()
      .then((res) => {
        Toast.show({
          topOffset: 60,
          position: "top",
          type: "success",
          text1: "Login Information",
          text2: "An Otp is sent on your number and email successfully",
        });
        navigation.navigate(navigationPath.OTP_VERIFICATION, {
          email: values.email,
          mobile_number: values.mobile_number,
        });
      })
      .catch((err) => {
        Toast.show({
          topOffset: 60,
          position: "top",
          type: "error",
          text1: "Error",
          text2: err.response.data.message,
        });
      });
  
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile_number: Yup.string()
      .matches(/(\d){8}\b/, "Enter a valid Mobile number")
      .required("Mobile number is required"),
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column", 
        justifyContent: "center",
        backgroundColor: Colors.WHITE,
      }}
      behavior="height"
      enabled
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={{ height: responsiveHeight(5) }}></View>
        <Formik
          initialValues={{
            email: "",
            name: "",
            mobile_number: "", 
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            submitHandler(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            errors,
            values,
          }) => (
            <View
              style={{
                height: responsiveHeight(65),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <DropShadow style={styles.shadowProp}>
                  <View style={[styles.box]}>
                    <View style={{ width: "100%" }}>
                      <Text
                        style={{
                          color: Colors.BLACK,
                          fontSize: responsiveFontSize(1.8),
                          fontFamily: FontFamily.POPPINS_SEMIBOLD,
                          marginVertical: responsiveHeight(3),
                          marginStart: responsiveWidth(6),
                          bottom: responsiveHeight(1),
                        }}
                      >
                        Create an Account
                      </Text>
                      <Text
                        style={{
                          color: Colors.BLACK,
                          fontSize: responsiveFontSize(1.8),
                          fontFamily: FontFamily.POPPINS_LIGHT,
                          marginStart: responsiveWidth(6),
                          bottom: responsiveHeight(3),
                        }}
                      >
                        Lets get started
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: responsiveWidth(0.1),
                        bottom: 14,
                        width: "83%",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.BLACK,
                          fontSize: responsiveFontSize(1.4),
                          fontFamily: FontFamily.POPPINS_REGULAR,
                        }}
                      >
                        Name
                      </Text>
                      <TextInput
                        style={{
                          borderBottomWidth: responsiveWidth(0.3),
                          borderBottomColor: Colors.BORDER_GREY,
                          marginTop: responsiveHeight(0.2),
                          color : Colors.BLACK
                        }}
                        placeholder="Enter Name"
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                      />
                      {errors.name ? (
                        <Text style={{ fontSize: 10, color: "red" }}>
                          {errors.name}
                        </Text>
                      ) : null}
                    </View>
                    <View
                      style={{
                        marginTop: responsiveWidth(0.1),
                        bottom: 14,
                        width: "83%",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.BLACK,
                          fontSize: responsiveFontSize(1.4),
                          fontFamily: FontFamily.POPPINS_REGULAR,
                        }}
                      >
                        E-MAIL ID
                      </Text>
                      <TextInput
                        style={{
                          borderBottomWidth: responsiveWidth(0.3),
                          borderBottomColor: Colors.BORDER_GREY,
                          marginTop: responsiveHeight(0.2),
                          color : Colors.BLACK
                        }}
                        placeholder="Enter e-mail ID"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                      />
                      {errors.email ? (
                        <Text style={{ fontSize: 10, color: "red" }}>
                          {errors.email}
                        </Text>
                      ) : null}
                    </View>

                    <View
                      style={{
                        marginTop: responsiveWidth(2),
                        bottom: 14,
                        width: "83%",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.BLACK,
                          fontSize: responsiveFontSize(1.4),
                          fontFamily: FontFamily.POPPINS_REGULAR,
                        }}
                      >
                        Mobile Number
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 50,
                        marginTop: responsiveHeight(0.3),
                        bottom: 14,
                        marginHorizontal: responsiveWidth(0.1),
                      }}
                    >
                      <PhoneInput
                        ref={phoneInput}
                        defaultCode="AU"
                        layout="first"
                        // value={value.mobile_number}
                        containerStyle={styles.phoneNumberView}
                        textContainerStyle={{
                          justifyContent: "center",
                          alignItems: "center",
                          borderLeftWidth: responsiveWidth(0.3),
                          borderColor: Colors.BORDER_GREY,
                          height: responsiveHeight(6),
                          paddingBottom: 0.1,
                          alignContent: "center",
                          paddingTop: 0.1,
                          backgroundColor: Colors.WHITE,
                        }}
                        onChangeFormattedText={(text) =>
                          setFieldValue("mobile_number", text)
                        }
                        onBlur={handleBlur("mobile_number")}
                        value={values.mobile_number}

                        // onChangeFormattedText={text => {
                        //   handleChange(text);
                        // }}
                      />
                      {errors.mobile_number ? (
                        <Text style={{ fontSize: 10, color: "red" }}>
                          {errors.mobile_number}
                        </Text>
                      ) : null}
                    </View>

                    <View
                      style={{
                        width: "85%",
                        bottom: 14,
                        marginTop: responsiveHeight(2),
                      }}
                    >
                      <TextComp
                        style={[styles.otpTitle, { top: responsiveHeight(1) }]}
                        title={`A 4 digit OTP will be sent to verify \nyour number & email id`}
                      />
                    </View>
                    <View
                      style={{
                        width: "90%",
                        justifyContent: "center",
                        alignItems: "center",
                        bottom: 20,
                        marginVertical: responsiveHeight(1),
                      }}
                    >
                      <ButtonComp
                        onPress={handleSubmit}
                        type="submit"
                        style={{
                          width: "70%",
                        }}
                        title={"Send OTP"}
                      />
                    </View>
                  </View>
                </DropShadow>
              </View>
            </View>
          )}
        </Formik>
        <View style={{ marginBottom: 0 }}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={imagePath.LOGO}
              resizeMode={"contain"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAnAccount;
