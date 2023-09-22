import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import Header from "../../../components/Header/Header";
import styles from "./styles";
import imagePath from "../../../constants/imagePath";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utils/Dimensions";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontFamily from "../../../constants/FontFamily";
import Colors from "../../../styles/colors";
import { Formik } from "formik";
import * as Yup from "yup";
import ButtonComp from "../../../components/Button/ButtonComp";
import { useNavigation } from "@react-navigation/native";
import navigationPath from "../../../constants/navigationPath";

const Password = () => {
  const navigation = useNavigation();
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .label("Password")
      .required()
      .min(4, "Password must have more than 4 characters "),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Confirm Password must matched Password")
      .required("Confirm Password is required"),
  });

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: moderateScale(14),
            flexDirection: "row",
            marginTop: 47,
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
                  height: 60,
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
                    style={{ width: 30, height: 30, tintColor: Colors.BLUE }}
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
                {/* {first_name} {last_name} */}
                Jason Stone
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
                {/* {email} */}
                jasonstone@gmail.com
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
                {/* {mobile_number} */}
                +61 7894568521
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            bottom: responsiveHeight(15),
          }}
        >
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => console.log(values)}
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
                  width: "100%",
                }}
              >
                <View
                  style={{ width: "92%", marginHorizontal: responsiveWidth(4) }}
                >
                  <TextInput
                    style={{
                      borderWidth: responsiveWidth(0.3),
                      borderColor: Colors.BORDER_GREY,
                      marginTop: responsiveHeight(0.2),
                      width: "100%",
                      paddingStart: 10,
                      borderRadius: 5,
                      fontFamily: FontFamily.POPPINS_LIGHT,
                      color: Colors.BLACK,
                      fontSize: responsiveFontSize(1.4),
                    }}
                    placeholder="Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={true}
                  />
                  {errors.password ? (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "red",
                        marginTop: responsiveHeight(1),
                      }}
                    >
                      {errors.password}
                    </Text>
                  ) : null}
                </View>
                <View
                  style={{
                    marginTop: responsiveHeight(2),
                    bottom: 14,
                    width: "92%",
                  }}
                >
                  <TextInput
                    style={{
                      marginTop: responsiveHeight(2),
                      fontFamily: FontFamily.POPPINS_LIGHT,
                      color: Colors.BLACK,
                      fontSize: responsiveFontSize(1.4),
                      borderWidth: responsiveWidth(0.3),
                      borderColor: Colors.BORDER_GREY,
                      paddingStart: responsiveWidth(2),
                      borderRadius: 5,
                    }}
                    placeholder="Confirm Password"
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    secureTextEntry={true}
                  />
                  {errors.confirmPassword ? (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "red",
                        marginTop: responsiveHeight(1),
                      }}
                    >
                      {errors.confirmPassword}
                    </Text>
                  ) : null}
                </View>

                <View
                  style={{
                    width: "92%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: responsiveHeight(2),
                    marginVertical: responsiveHeight(1),
                  }}
                >
                  <ButtonComp
                    onPress={handleSubmit}
                    type="submit"
                    style={{
                      width: "100%",
                    }}
                    title={"Save"}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Password;
