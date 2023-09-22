import { View, Text, Image, ScrollView, Keyboard, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import FontFamily from "../../../constants/FontFamily";
import Colors from "../../../styles/colors";
import imagePath from "../../../constants/imagePath";
import navigationPath from "../../../constants/navigationPath";
import * as yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import DropShadow from "react-native-drop-shadow";
import PhoneInput from "react-native-phone-number-input";
import TextComp from "../../../components/Text/TextComp";
import ButtonComp from "../../../components/Button/ButtonComp";
import { useDispatch } from "react-redux";

import Toast from "react-native-toast-message";

import { getUserProfile, otpSentForLoginAsync } from "../../../redux/asyncThunk/auth.asyncThunk";
const OtpMobileVerification = (props) => {
	const { mobile_number, email } = props.route.params;
	const phoneInput = useRef(null);
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [code, setCode] = useState("");
	const loginValidationSchema = yup.object().shape({
		phoneNumber: yup
			.string()
			.matches(/(\d){8}\b/, "Enter a valid phone number")
			.required("Phone number is required"),
	});

	const submitHandler = () => {
		const payloadForMobile = {
			role_type: "service_worker",
			mobile_number: mobile_number,
			otp: code,
		};
		const payloadForEmail = {
			role_type: "service_worker",
			email: email,
			otp: code,
		};
		const handlePayload = () => (mobile_number ? payloadForMobile : payloadForEmail);
		dispatch(otpSentForLoginAsync(handlePayload()))
			.unwrap()
			.then((res) => {
				const id = res.data.data.user.id;

				dispatch(getUserProfile({ id: id }));
				Toast.show({
					topOffset: 60,
					position: "top",
					type: "success",
					text1: "Welcome",
					text2: "Sign in successfully !!",
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
		//dispatch(setToken())
	};
	console.log(mobile_number);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
			<ScrollView>
				{/* <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"}> */}
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
											{mobile_number ? "For mobile" : "For Email"}
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
												{mobile_number ? mobile_number : email}
											</Text>
										</View>
										<View style={{ width: "90%", height: 60, alignItems: "center" }}>
											<OTPInputView
												style={{
													alignItems: "center",
													width: "100%",
													height: 30,
													top: responsiveHeight(4),
												}}
												pinCount={4}
												//   onCodeChanged={handleChange('otp')}
												autoFocusOnLoad
												codeInputFieldStyle={styles.underlineStyleBase}
												codeInputHighlightStyle={styles.underlineStyleHighLighted}
												onCodeFilled={(code) => {
													console.log(code);
													setCode(code);
												}}
											/>
										</View>
										<View style={{ width: "87%", top: 30, alignItems: "center" }}>
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
											title={"Submit OTP"}
										/>
									</View>
								</View>
							</View>
						</DropShadow>
					</View>
				</View>
				<View style={{ marginBottom: responsiveHeight(40) }}>
					<View style={styles.logoContainer}>
						<Image style={styles.logo} source={imagePath.LOGO} resizeMode={"contain"} />
					</View>
				</View>
			</ScrollView>
			{/* </KeyboardAvoidingView> */}
		</SafeAreaView>
	);
};

export default OtpMobileVerification;
