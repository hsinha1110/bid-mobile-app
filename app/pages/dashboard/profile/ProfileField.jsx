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
import FontFamily from "../../../constants/FontFamily";
import Colors from "../../../styles/colors";
import { Formik } from "formik";
import * as Yup from "yup";
import ButtonComp from "../../../components/Button/ButtonComp";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateProfile } from "../../../redux/asyncThunk/auth.asyncThunk";
import Toast from "react-native-toast-message";

const ProfileField = () => {
  const navigation = useNavigation();
  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("First name is required"),
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    mobile_number: Yup.string()
      .matches(/(\d){8}\b/, "Enter a valid Mobile number")
      .required("Mobile number is required"),
  });
  const {id, email,username, last_name, first_name, mobile_number } = useSelector(
    (state) => state.auth?.user
  );
const dispatch =useDispatch()
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{ height: 40, backgroundColor: Colors.WHITE }}>
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
              backgroundColor: '#FFFFFF',
              width: 60,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              marginLeft:16.5,
              flexDirection: "row",
              borderRadius: 0.5,
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
                    style={{ width: 26.91, height: 31.8, tintColor: Colors.BLUE }}
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
                    width: 5.33,
                    height: 5.33,
                    tintColor: Colors.WHITE,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ width: 314.5,marginLeft:20.42 }}>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row"}}
            >
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  fontSize: 14,
                  color: Colors.BLACK,
                   width:86,
                   lineHeight:21
                }}
              >
                {first_name} {last_name}
              </Text>
            </View>
            <View style={{ flexDirection: "row",}}>
              <Image
                style={{ width: 11.15, height: 7.84,marginTop:5 }}
                source={imagePath.EMAIL}
              />

              <Text
                style={{
                  marginStart: moderateScale(10),
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  fontSize: 12,
                  lineHeight:18,
                  color: Colors.DARK_GREY,
                }}
              >
                {email}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ width: 12, height: 12.5 }}
                source={imagePath.PHONE}
              />
              <Text
                style={{
                  marginStart: moderateScale(10),
                  fontFamily: FontFamily.POPPINS_LIGHT,
                  fontSize: 12,
                  color: Colors.DARK_GREY,
                  lineHeight:18,
                }}
              >
                {mobile_number}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
             
          }}
        >
          <Formik
            initialValues={{
              username: username,
              email: email,
              first_name: first_name,
              last_name: last_name,
              mobile_number: mobile_number,
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => 
              
            {  dispatch(updateProfile({id:id,data:values})).unwrap().then(res=>{
              dispatch(getUserProfile({id:id}))
              Toast.show({
                topOffset: 60,
                position: "top",
                type: "success",
                text1: "Profile Updated",
               
              });
              navigation.goBack()
            }).catch(err=>{console.log(err)})
              
              console.log(values)}
            }
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
                  marginTop:40,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{ width: 360 }}
                >
                  <TextInput
                    style={{
                      borderWidth: 0.5,
                      borderColor: Colors.BORDER_GREY,
                      marginTop: 12,
                      width: "100%",
                      paddingStart: 28.07,
                      fontFamily: FontFamily.POPPINS_LIGHT,
                      color: Colors.BLACK,
                      fontSize: 14,
                      borderRadius: 5,
                      height:61,
                      
                    }}
                    placeholder="Username"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                  />
                  {errors.username ? (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "red",
                        marginTop: 10,
                      }}
                    >
                      {errors.username}
                    </Text>
                  ) : null}
                </View>
                <View
                  style={{
                    marginTop: 10,
                    bottom: 14,
                    width: 360,
                  }}
                >
                  <TextInput
                    style={{
                      marginTop: 12,
                      fontFamily: FontFamily.POPPINS_LIGHT,
                      color: Colors.BLACK,
                      fontSize: 14,
                      borderWidth: 0.5,
                      borderColor: Colors.BORDER_GREY,
                      paddingStart: 28.07,
                      borderRadius: 5,
                      height:61
                    }}
                    placeholder="E-mail ID"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {errors.email ? (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "red",
                        marginTop: 10,
                      }}
                    >
                      {errors.email}
                    </Text>
                  ) : null}
                </View>
                <View
                  style={{
                    bottom: 14,
                    width: 360,
                  }}
                >
                  <TextInput
                    style={{
                      marginTop: 12,
                      fontFamily: FontFamily.POPPINS_LIGHT,
                      color: Colors.BLACK,
                      fontSize: 14,
                      borderWidth: 0.5,
                      borderColor: Colors.BORDER_GREY,
                      paddingStart: 28.07,
                      borderRadius: 5,
                      height:61
                    }}
                    placeholder="First Name"
                    onChangeText={handleChange("first_name")}
                    onBlur={handleBlur("first_name")}
                    value={values.first_name}
                  />
                  {errors.first_name ? (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "red",
                        marginTop: 10,
                      }}
                    >
                      {errors.first_name}
                    </Text>
                  ) : null}
                </View>
                <View
                  style={{
                    bottom: 14,
                    width: 360,
                  }}
                >
                  <TextInput
                    style={{
                      marginTop: 12,
                      fontFamily: FontFamily.POPPINS_LIGHT,
                      color: Colors.BLACK,
                      fontSize: 14,
                      borderWidth: 0.5,
                      borderColor: Colors.BORDER_GREY,
                      paddingStart: 28.07,
                      borderRadius: 5,
                      height:61
                    }}
                    placeholder="Last Name"
                    onChangeText={handleChange("last_name")}
                    onBlur={handleBlur("last_name")}
                    value={values.last_name}
                  />
                  {errors.last_name ? (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "red",
                        marginTop: 10,
                      }}
                    >
                      {errors.last_name}
                    </Text>
                  ) : null}
                </View>
                <View
                  style={{
                    bottom: 14,
                    width: 360,
                    
                  }}
                >
                  <TextInput
                    style={{
                      marginTop: 12,
                      fontFamily: FontFamily.POPPINS_LIGHT,
                      color: Colors.BLACK,
                      fontSize: 14,
                      borderWidth: 0.5,
                      borderColor: Colors.BORDER_GREY,
                      paddingStart: 28.07,
                      borderRadius: 5,
                      height:61
                      
                    }}
                    placeholder="Mobile Number"
                    onChangeText={handleChange("mobile_number")}
                    onBlur={handleBlur("mobile_number")}
                    value={values.mobile_number}
                  />
                  {errors.mobile_number ? (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "red",
                        marginTop: 10,
                      }}
                    >
                      {errors.mobile_number}
                    </Text>
                  ) : null}
                </View>
                <View
                  style={{
                    width: 360,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop:40,
                    marginBottom:40,
                    
                  }}
                >
                  <ButtonComp
                    onPress={handleSubmit}
                    type="submit"
                    style={{
                      width: "100%",
                      height:56,
                      fontSize:16,
                      fontFamily:FontFamily.POPPINS_REGULAR
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

export default ProfileField;
