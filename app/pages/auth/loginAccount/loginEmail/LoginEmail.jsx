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
import Toast from "react-native-toast-message";

import DropShadow from "react-native-drop-shadow";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
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
import { Formik } from "formik";
import navigationPath from "../../../../constants/navigationPath";
import { loginAsync } from "../../../../redux/asyncThunk";

const LoginWithEmail = () => {

	const navigation = useNavigation();

	const dispatch = useDispatch();

	const SignupSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email").required("Email is required"),
	});

	const submitHandler = (values) => {
		dispatch(loginAsync(values))
			.unwrap()
			.then((res) => {
				Toast.show({
					topOffset: 60,
					position: "top",
					type: "success",
					text1: "Login Information",
					text2: "An Otp is sent on your email successfully",
				});
				navigation.navigate(navigationPath.OTP_MOBILE_VERIFICATION, {
					email: values.email,
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
	return (
		<SafeAreaView
			style={{
				flex: 1,
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
					initialValues={{ email: "", otp_type: 1 }}
					validationSchema={SignupSchema}
					onSubmit={(values) => submitHandler(values)}
				>
					{({ handleChange, handleBlur, handleSubmit, errors, values }) => (
						<View
							style={{
								height: responsiveHeight(68),
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
												Login With Email Id
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
												E-MAIL ID
											</Text>
											<TextInput
												style={{
													borderBottomWidth: responsiveWidth(0.3),
													borderBottomColor: Colors.BORDER_GREY,
													marginTop: responsiveHeight(0.2),
												}}
												placeholder="Enter e-mail ID"
												onChangeText={handleChange("email")}
												onBlur={handleBlur("email")}
												value={values.email}
											/>
											{errors.email ? (
												<Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>
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
												style={styles.otpTitle}
												title={`A 4 digit OTP will be sent to verify your Email`}
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
											onPress={() => navigation.navigate(navigationPath.LOGIN_WITH_PHONE)}
										>
											Instead LogIn with Mobile Number
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

export default LoginWithEmail;
