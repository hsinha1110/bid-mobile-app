import { View, Image, Text, SafeAreaView, Keyboard, TextInput, ScrollView } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
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
const CardDetails = (props) => {
	const navigation = useNavigation();
	const SignupSchema = Yup.object().shape({
		card_holder_name: Yup.string().required("Cardholder name is required"),
		card_number: Yup.string().required("Invalid card number"),
		exp_Date: Yup.string().required("Invalid expiry date"),
		cvc: Yup.string().required("Invalid cvc number"),
	});
  const { price } = props.route.params;
	const submitHandler = (values) => {
		navigation.navigate(navigationPath.PAYMENT_SUCCESS, {price});
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
			<View style={{ height: 65 }}>
				<Header
					onPress={() => navigation.goBack()}
					image={imagePath.LEFT}
					title="Payment Method"
					notification={imagePath.NOTIFICATION}
				/>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ height: responsiveHeight(2) }}></View>
				<View
					style={{
						backgroundColor: Colors.CARD_HEADER,
						marginHorizontal: responsiveWidth(4),
						justifyContent: "space-between",
						alignContent: "center",
						height: 70,
						borderRadius: 16,
					}}
				>
					<View
						style={{
							top: 20,
							marginHorizontal: responsiveWidth(4),
							flexDirection: "row",
							justifyContent: "space-between",
							alignContent: "center",
						}}
					>
						<Text
							style={{
								fontFamily: FontFamily.POPPINS_MEDIUM,
								fontSize: 14,
								color: Colors.BLACK,
								top: 5,
							}}
							adjustsFontSizeToFit={true}
							numberOfLines={1}
						>
							Total Amount :
						</Text>
						<ButtonComp
							onPress={() => handleSubmit()}
							type="submit"
							style={{
								width: "28%",
								height: 30,
								fontFamily: FontFamily.POPPINS_REGULAR,
								fontSize: 12,
							}}
							title={`$ ${price}`}
						/>
					</View>
				</View>
				<Formik
					initialValues={{
						card_holder_name: "",
						card_number: "",
						exp_Date: "",
						cvc: "",
					}}
					validationSchema={SignupSchema}
					onSubmit={(values) => {
						submitHandler(values);
					}}
				>
					{({ handleChange, handleBlur, handleSubmit, setFieldValue, errors, values }) => (
						<View
							style={{
								height: responsiveHeight(60),
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<View>
								<DropShadow style={styles.shadowProp}>
									<View style={[styles.box]}>
										<View
											style={{
												width: "100%",
												justifyContent: "center",
												alignItems: "center",
												top: 20,
											}}
										>
											<Text
												style={{
													color: Colors.BLACK,
													fontSize: 18,
													fontFamily: FontFamily.POPPINS_SEMIBOLD,
													marginVertical: responsiveHeight(3),
													marginStart: responsiveWidth(4),
													bottom: responsiveHeight(6),
												}}
												adjustsFontSizeToFit={true}
												numberOfLines={1}
											>
												Card Details
											</Text>
										</View>
										<View
											style={{
												marginTop: responsiveWidth(0.1),
												bottom: 45,
												width: "83%",
											}}
										>
											<Text
												style={{
													color: Colors.BLACK,
													fontSize: 14,
													fontFamily: FontFamily.POPPINS_REGULAR,
												}}
											>
												Cardholder name
											</Text>
											<TextInput
												style={{
													borderBottomWidth: responsiveWidth(0.3),
													borderBottomColor: Colors.BORDER_GREY,
													marginTop: responsiveHeight(0.2),
													height: 45.5,
												}}
												placeholder="Enter Card holder name"
												onChangeText={handleChange("card_holder_name")}
												onBlur={handleBlur("card_holder_name")}
												value={values.card_holder_name}
											/>
											{errors.card_holder_name ? (
												<Text style={{ fontSize: 10, color: "red" }}>
													{errors.card_holder_name}
												</Text>
											) : null}
										</View>
										<View
											style={{
												marginTop: responsiveWidth(0.1),
												bottom: 70,
												width: "83%",
											}}
										>
											<View
												style={{
													width: "100%",
													borderBottomWidth: responsiveWidth(0.3),
													borderBottomColor: Colors.BORDER_GREY,
												}}
											>
												<Text
													style={{
														color: Colors.BLACK,
														top: 30,
														fontSize: 14,
														fontFamily: FontFamily.POPPINS_REGULAR,
													}}
												>
													Card number
												</Text>
												<TextInput
													placeholder="Enter card number"
													onChangeText={handleChange("card_number")}
													onBlur={handleBlur("card_number")}
													value={values.card_number}
													style={{ top: 32, width: "80%", height: 45.5 }}
												/>
												{errors.card_number ? (
													<Text style={{ fontSize: 10, color: "red", top: 30 }}>
														{errors.card_number}
													</Text>
												) : null}
												<View style={{ alignItems: "flex-end", bottom: 10 }}>
													<Image
														source={imagePath.MASTER}
														style={{ width: 26.52, height: 16.4 }}
													/>
												</View>
											</View>
										</View>
										<View
											style={{
												marginHorizontal: responsiveWidth(4),
												width: "80%",
												flexDirection: "row",
												justifyContent: "space-between",
											}}
										>
											<View
												style={{
													bottom: 50,
													width: "50%",
												}}
											>
												<Text
													style={{
														color: Colors.BLACK,
														fontSize: 14,
														fontFamily: FontFamily.POPPINS_REGULAR,
													}}
													adjustsFontSizeToFit={true}
													numberOfLines={1}
												>
													Exp Date
												</Text>
												<TextInput
													style={{
														borderBottomWidth: responsiveWidth(0.3),
														borderBottomColor: Colors.BORDER_GREY,
														marginTop: responsiveHeight(0.2),
														width: "100%",
														height: 45.5,
													}}
													placeholder="Enter exp date"
													onChangeText={handleChange("exp_Date")}
													onBlur={handleBlur("exp_Date")}
													value={values.exp_Date}
												/>
												{errors.exp_Date ? (
													<Text
														style={{ fontSize: 10, color: "red" }}
														adjustsFontSizeToFit={true}
														numberOfLines={1}
													>
														{errors.exp_Date}
													</Text>
												) : null}
											</View>
											<View style={{ width: responsiveWidth(3) }}></View>
											<View
												style={{
													marginTop: responsiveWidth(0.1),
													bottom: 50,
													width: "50%",
												}}
											>
												<Text
													style={{
														color: Colors.BLACK,
														fontSize: responsiveFontSize(1.4),
														fontFamily: FontFamily.POPPINS_REGULAR,
													}}
													adjustsFontSizeToFit={true}
													numberOfLines={1}
												>
													CVC
												</Text>
												<TextInput
													style={{
														width: "100%",
														borderBottomWidth: responsiveWidth(0.3),
														borderBottomColor: Colors.BORDER_GREY,
														marginTop: responsiveHeight(0.2),
														height: 45.5,
													}}
													placeholder="Enter cvc number"
													onChangeText={handleChange("cvc")}
													onBlur={handleBlur("cvc")}
													value={values.cvc}
												/>
												{errors.cvc ? (
													<Text style={{ fontSize: 10, color: "red" }}>{errors.cvc}</Text>
												) : null}
											</View>
										</View>
										<View
											style={{
												width: "90%",
												justifyContent: "center",
												alignItems: "center",
												bottom: 30,
											}}
										>
											<ButtonComp
												onPress={() => handleSubmit()}
												type="submit"
												style={{
													width: "70%",
													height: 45.5,
												}}
												title={"Pay"}
											/>
										</View>
									</View>
								</DropShadow>
							</View>
						</View>
					)}
				</Formik>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CardDetails;
