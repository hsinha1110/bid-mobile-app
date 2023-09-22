import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationPath from "../constants/navigationPath";
import CreateAnAccount from "../pages/auth/createAnAccount/CreateAnAccount";
import LoginWithEmail from "../pages/auth/loginAccount/loginEmail/LoginEmail";
import LoginWithPhone from "../pages/auth/loginAccount/LoginPhone/LoginWithPhone";
import Home from "../pages/dashboard/home/Home";
import OtpEmailVerification from "../pages/auth/otpVerification/OtpEmailVerification";
import OtpMobileVerification from "../pages/auth/otpVerification/OtpMobileVerification";
import OtpVerification from "../pages/auth/otpVerification/OtpVerification/OtpVerification";
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen
          name={navigationPath.CREATE_AN_ACCOUNT}
          component={CreateAnAccount}
        />
        <Stack.Screen
          name={navigationPath.LOGIN_WITH_PHONE}
          component={LoginWitPhone}
        />
        <Stack.Screen
          name={navigationPath.LOGIN_WITH_EMAIL}
          component={LoginWithEmail}
        />

        <Stack.Screen
          name={navigationPath.OTP_MOBILE_VERIFICATION}
          component={OtpMobileVerification}
        />
        <Stack.Screen
          name={navigationPath.OTP_EMAIL_VERIFICATION}
          component={OtpEmailVerification}
        /> */}

        {/* <Stack.Screen name={navigationPath.HOME} component={Home} /> */}
        <Stack.Screen
          name={navigationPath.LOGIN_WITH_PHONE}
          component={LoginWithPhone}
        />
        <Stack.Screen
          name={navigationPath.OTP_MOBILE_VERIFICATION}
          component={OtpMobileVerification}
        />
        <Stack.Screen
          name={navigationPath.LOGIN_WITH_EMAIL}
          component={LoginWithEmail}
        />
        <Stack.Screen
          name={navigationPath.OTP_EMAIL_VERIFICATION}
          component={OtpEmailVerification}
        />
        <Stack.Screen
          name={navigationPath.CREATE_AN_ACCOUNT}
          component={CreateAnAccount}
        />
        <Stack.Screen
          name={navigationPath.OTP_VERIFICATION}
          component={OtpVerification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
