import {
  View,
  Image,
  Text,
  SafeAreaView,
  Keyboard,
  TextInput,
  ScrollView,
} from "react-native";
import DropShadow from "react-native-drop-shadow";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Colors from "../../../styles/colors";
import * as Yup from "yup";
import { Formik } from "formik";
import styles from "../cart/styles";
import imagePath from "../../../constants/imagePath";
import FontFamily from "../../../constants/FontFamily";
import ButtonComp from "../../../components/Button/ButtonComp";
import TextComp from "../../../components/Text/TextComp";
import Header from "../../../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import navigationPath from "../../../constants/navigationPath";
const PaymentSuccess = (props) => {
  const navigation = useNavigation();
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile_number: Yup.string()
      .matches(/(\d){8}\b/, "Enter a valid Mobile number")
      .required("Mobile number is required"),
  });
  const {price} =props.route.params
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
      <View style={{ height: 65 }}>
        <Header
          onPress={() => navigation.goBack()}
          image={imagePath.LEFT}
          title="Payment Success"
          notification={imagePath.NOTIFICATION}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: responsiveHeight(2) }}></View>

        <View
          style={{
            height: responsiveHeight(60),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <DropShadow style={styles.shadowProp}>
              <View st>
                <View style={[styles.boxHeight]}>
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      bottom: 20,
                    }}
                  >
                    <Image
                      resizeMode={"center"}
                      style={{ width: 116, height: 40 }}
                      source={imagePath.SNIPPITT}
                    />
                  </View>
                  <View style={{ bottom: 15 }}>
                    <Text
                      style={{
                        fontFamily: FontFamily.POPPINS_SEMIBOLD,
                        fontSize: 16,
                        color: Colors.BLACK,
                        textAlign: "center",
                      }}
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                    >
                      Hey Damon Salvatore, {'\n'}Your Transaction was Successfull
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      botom: 20,
                    }}
                  >
                    <Image
                      resizeMode={"center"}
                      style={{ width: 33, height: 35, bottom: 10 }}
                      source={imagePath.CHECKK}
                    />
                  </View>

                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      bottom: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FontFamily.POPPINS_REGULAR,
                        fontSize: 12,
                        color: Colors.NAVY_BLUE,
                        textAlign: "center",
                        top: 10,
                        flexWrap: "wrap",
                      }}
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                    >
                      Payment of ${price} has been received {"\n"}successfully.
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      bottom: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FontFamily.POPPINS_MEDIUM,
                        fontSize: 12,
                        color: Colors.NAVY_BLUE,
                        textAlign: "center",
                        top: 15,
                        flexWrap: "wrap",
                      }}
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                    >
                      Transaction ID : SNIPPIT1458
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "90%",
                      justifyContent: "center",
                      alignItems: "center",
                      top: 20,
                    }}
                  >
                    <ButtonComp
                      onPress={() => navigation.navigate(navigationPath.JOBS)}
                      type="submit"
                      style={{
                        width: "60%",
                        height:45.5,
                        fontFamily:FontFamily.POPPINS_REGULAR,
                        fontSize:14
                      }}
                      title={"Pay"}
                    />
                  </View>
                </View>
              </View>
            </DropShadow>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentSuccess;
