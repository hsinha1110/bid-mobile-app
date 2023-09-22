import {
	View,
	Image,
	Text,
	SafeAreaView,
	KeyboardAvoidingView,
	Keyboard,
	TextInput,
	ScrollView,
	Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropShadow from "react-native-drop-shadow";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import styles from "./styles";
import PhoneInput from "react-native-phone-number-input";
import _ from "lodash";
import { sendOtpAsync } from "../../../redux/asyncThunk/auth.AsyncThunk";
import { useEffect, useRef, useState } from "react";
import { yellow100 } from "react-native-paper/lib/typescript/styles/colors";
import Colors from "../../../../styles/colors";

import FontFamily from "../../../../constants/FontFamily";
import imagePath from "../../../../constants/imagePath";
import ButtonComp from "../../../../components/Button/ButtonComp";
import TextComp from "../../../../components/Text/TextComp";
import navigationPath from "../../../../constants/navigationPath";
import { loginAsync } from "../../../../redux/asyncThunk/auth.asyncThunk";
import Toast from "react-native-toast-message";

const LoginWithPhone = () => {

	const phoneInput = useRef(null);

	const navigation = useNavigation();
	const dispatch = useDispatch();

	const SignupSchema = Yup.object().shape({
		mobile_number: Yup.string()
			.matches(/(\d){8}\b/, "Enter a valid phone number")
			.required("Mobile number is required"),
	});

	const handleSubmit = (values) => {
		dispatch(loginAsync(values))
			.unwrap()
			.then((res) => {
				Toast.show({
					topOffset: 60,
					position: "top",
					type: "success",
					text1: "Login Information",
					text2: res.data.message,
				});
				navigation.navigate(navigationPath.OTP_MOBILE_VERIFICATION, {
					mobile_number: values.mobile_number,
				});
			})
			.catch((err) => {
				 console.log('......errr',err)
				Toast.show({
					topOffset: 60,
					position: "top",
					type: "error",
					text1: "Error",
 				});
			});
	};

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
			<ScrollView style={{ flexGrow: 1 }}>
				<View style={{ height: responsiveHeight(5) }}></View>
				<Formik
					initialValues={{ mobile_number: "", otp_type: 1 }}
					validationSchema={SignupSchema}
					onSubmit={(values) => handleSubmit(values)}
				>
					{({ handleChange, handleBlur, handleSubmit, setFieldValue, errors, values }) => (
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
												Login With Mobile Number
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
												onChangeFormattedText={(text) => setFieldValue("mobile_number", text)}
												onBlur={handleBlur("Mobile_number")}
												value={values.mobile_number}
											/>
											{errors.mobile_number ? (
												<Text style={{ fontSize: 10, color: "red" }}>
													{errors.mobile_number}
												</Text>
											) : null}
										</View>

										<View
											style={{
												width: "75%",
												bottom: 14,
												marginTop: responsiveHeight(2),
											}}
										>
											<TextComp
												style={[styles.otpTitle, { top: responsiveHeight(2) }]}
												title={`A 4 digit OTP will be sent to verify your number`}
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
										<Text
											style={{ color: Colors.BLUE }}
											onPress={() => navigation.navigate(navigationPath.LOGIN_WITH_EMAIL)}
										>
											Instead Login With Email-id
										</Text>
									</View>
								</DropShadow>
							</View>
							<Text
								style={{
									top: responsiveHeight(6),
									color: Colors.BLUE,
									fontSize: responsiveFontSize(1.8),
									fontFamily: FontFamily.POPPINS_SEMIBOLD,
								}}
								onPress={() => navigation.navigate(navigationPath.CREATE_AN_ACCOUNT)}
							>
								Create New Account
							</Text>
						</View>
					)}
				</Formik>
				<View style={{ marginBottom: 0 }}>
					<View style={styles.logoContainer}>
						<Image style={styles.logo} source={imagePath.LOGO} resizeMode={"contain"} />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default LoginWithPhone;
