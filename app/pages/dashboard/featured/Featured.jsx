import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	Image,
	TouchableOpacity,
	// TextInput,
	FlatList,
	Dimensions,
	Pressable,
	StyleSheet,
} from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import React from "react";
import HeaderCart from "../../../components/Header/HeaderCart";
import imagePath from "../../../constants/imagePath";
import styles from "./styles";
import { SliderBox } from "react-native-image-slider-box";
import Colors from "../../../styles/colors";
import _ from "lodash";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import FontFamily from "../../../constants/FontFamily";
import { useNavigation } from "@react-navigation/native";
import CustomRatingBar from "../../../components/Rating/CustomRating";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAppointmentDocuments,
	getAppointmentsAsync,
	getAppointmentsByIdAsync,
	getAppointmentWorkType,
} from "../../../redux/asyncThunk/appointment.asyncThunk";
import moment from "moment/moment";
import { getCartDetailsAsync, postABidAsync, updateCartDetailsAsync } from "../../../redux/asyncThunk";
import Toast from "react-native-toast-message";
import navigationPath from "../../../constants/navigationPath";
import ViewSlider from "react-native-view-slider";
import VideoPlayer from "react-native-video-player";
import { updateCurrentBatch } from "../../../redux/slices/appointment.slice";
import WS from "react-native-websocket";
import { mask } from "../../../helpers";

// `wss://api.buildblog.in/ws/bid/${group_id}/?token=${accessToken}

function Feature(props) {
	const navigation = useNavigation();
	const { id } = props.route.params;
	const { appt_featured } = useSelector((state) => state.appointments);
	const { productIds } = useSelector((state) => state.cartDetails);
	const { user, accessToken } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [bidPrice, setBidPrice] = useState("");
	const [apptDetails, setApptDetails] = useState({});
	const [img, setImg] = useState([]);
	const [isOpen, setIsOpen] = useState(true);
	const { width, height } = Dimensions.get("window");
	const [currentAppt, setCurrentAppt] = useState(null);
	const [currentBidPrice, setCurrentBidPrice] = useState(0);
	let wsRef = React.useRef(null);
	const [isWSConnected, setIsWSConnected] = useState(false);
	useEffect(() => {
		dispatch(
			getAppointmentsByIdAsync({
				id: id,
				params: {
					expand: "company,appointments,appointments.job,appointments.company,appointments.work_type,appointments.customer",
				},
			}),
		);
		dispatch(
			getCartDetailsAsync({
				id: user.cart_id,
				params: { expand: "products.appointments.company" },
			}),
		);
	}, []);
	// console.log(params,"wwwwwwwwwwwwwwwwww")
	useEffect(() => {
		if (appt_featured && appt_featured.appointments && appt_featured.appointments.length) {
			// console.log(imgUrl.length, appt_featured.appointments.id)
			dispatch(
				getAppointmentDocuments({
					params: { appointment: appt_featured.appointments[0].id },
				}),
			)
				.unwrap()
				.then((res) => {
					console.log(res.data.data)
					const imgUrl = res.data.data.data.map((item) => item.attachment);
					if (!imgUrl.length) {
						setImg([
							"https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/pavelstasevich181101028.jpg?ver=6",
						]);
						return;
					}
					console.log(imgUrl.length, appt_featured.appointments);
					setImg(imgUrl);
				})
				.catch((err) => {});
			setApptDetails(appt_featured.appointments[0]);
			setCurrentAppt(appt_featured.appointments[0].id);
			const { bid_price, base_price } = appt_featured;
			let min_price = parseInt(appt_featured.min_price);
			let max_price = parseInt(appt_featured.max_price);
			if (bid_price) {
				setCurrentBidPrice(parseInt(bid_price));
				// } else if (base_price) {
				// 	currentBidPrice = parseInt(base_price);
			} else {
				setCurrentBidPrice(appt_featured.bid_type === "up" ? min_price : max_price);
			}
  }
	}, [appt_featured]);
	const getPrice = () => {
		if (appt_featured?.bid_type === "up") {
			return appt_featured.max_price;
		} else if (appt_featured?.bid_type === "down") {
			return appt_featured.min_price;
		}
	};
	const handleApptOnPress = (data) => {
		dispatch(getAppointmentDocuments({ params: { appointment: data.id } }))
			.unwrap()
			.then((res) => {
				const imgUrl = res.data.data.data.map((item) => item.attachment);
				if (!imgUrl.length) {
					setImg([
						"https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/pavelstasevich181101028.jpg?ver=6",
					]);
					return;
				}
				setImg(imgUrl);
			})
			.catch((err) => {
				console.log(res, "image");
			});
		setApptDetails(data);
		setCurrentAppt(data.id);
	};
	const payments = [
		{
			id: "1",
			image: imagePath.PAYPAL,
		},
		{
			id: "2",
			image: imagePath.GPAY,
		},
		{
			id: "3",
			image: imagePath.VISA,
		},
		{
			id: "4",
			image: imagePath.MASTER,
		},
		{
			id: "5",
			image: imagePath.AMERICAN_EXPRESS,
		},
	];
 const finishedDate =()=>{
	const batchExpires =new Date (`${appt_featured.end_date} ${appt_featured.end_time}`)
	const todayDate =new Date()
	return todayDate>batchExpires

 }
	const similarJobs = [
		{
			id: "1",
			image: imagePath.BOTTLE,
			title: "Heat Pump Assessment",
		},
		{
			id: "2",
			image: imagePath.BOTTLE,
			title: "Heat Pump Assessment",
		},
		{
			id: "3",
			image: imagePath.BOTTLE,
			title: "Heat Pump Assessment",
		},
		{
			id: "4",
			image: imagePath.BOTTLE,
			title: "Heat Pump Assessment",
		},
	];
	const renderJobsItem = ({ item }) => {
		return (
			<View>
				<View
					style={{
						backgroundColor: Colors.CARD_GREY,
						marginHorizontal: responsiveWidth(4),
						borderRadius: 5,
					}}
				>
					<View
						style={{
							marginHorizontal: responsiveWidth(4),
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: Colors.WHITE,
							width: 200,
							margin: 10,
							padding: 20,
							borderRadius: 5,
						}}
					>
						<Image
							style={{
								height: responsiveHeight(20),
								width: responsiveWidth(20),
							}}
							source={item.image}
						/>
					</View>
				</View>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						padding: 10,
					}}
				>
					<Text
						style={{
							fontFamily: FontFamily.POPPINS_REGULAR,
							fontSize: responsiveFontSize(1.4),
							flexWrap: "wrap",
						}}
					>
						{item.title}
					</Text>
				</View>
			</View>
		);
	};
	const renderBidData = ({ item, index }) => {
		return (
			<View style={{ marginVertical: 10 }}>
				<View style={{ flexDirection: "row" }}>
					<View
						style={{
							flex: 0.3,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_MEDIUM,
								flexWrap: "wrap",
							}}
						>
							State
						</Text>
					</View>
					<View
						style={{
							flex: 0.7,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.DARK_GREY,
								fontFamily: FontFamily.POPPINS_LIGHT,
								flexWrap: "wrap",
							}}
						>
							{item?.state}
						</Text>
					</View>
				</View>
				<View style={{ flexDirection: "row", marginTop: responsiveHeight(1) }}>
					<View
						style={{
							flex: 0.3,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_MEDIUM,
								flexWrap: "wrap",
							}}
						>
							Type
						</Text>
					</View>
					<View
						style={{
							flex: 0.7,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.DARK_GREY,
								fontFamily: FontFamily.POPPINS_LIGHT,
								flexWrap: "wrap",
							}}
						>
							{_.startCase(apptDetails?.customer?.customer_type)}
						</Text>
					</View>
				</View>
				<View style={{ flexDirection: "row", marginTop: responsiveHeight(1) }}>
					<View
						style={{
							flex: 0.3,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_MEDIUM,
								flexWrap: "wrap",
							}}
						>
							Quantity
						</Text>
					</View>
					<View
						style={{
							flex: 0.7,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.DARK_GREY,
								fontFamily: FontFamily.POPPINS_LIGHT,
								flexWrap: "wrap",
							}}
						>
							{appt_featured?.appointments?.length} pieces
						</Text>
					</View>
				</View>
				<View style={{ flexDirection: "row", marginTop: responsiveHeight(1) }}>
					<View
						style={{
							flex: 0.3,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_MEDIUM,
								flexWrap: "wrap",
							}}
						>
							Post Code
						</Text>
					</View>
					<View
						style={{
							flex: 0.7,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.DARK_GREY,
								fontFamily: FontFamily.POPPINS_LIGHT,
								flexWrap: "wrap",
							}}
						>
							{item?.pincode}
						</Text>
					</View>
				</View>
				<View style={{ flexDirection: "row", marginTop: responsiveHeight(1) }}>
					<View
						style={{
							flex: 0.3,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_MEDIUM,
								flexWrap: "wrap",
							}}
						>
							Quantity
						</Text>
					</View>
					<View
						style={{
							flex: 0.7,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.DARK_GREY,
								fontFamily: FontFamily.POPPINS_LIGHT,
								flexWrap: "wrap",
							}}
						>
							{appt_featured?.appointments?.length} pieces
						</Text>
					</View>
				</View>
				<View style={{ flexDirection: "row", marginTop: responsiveHeight(1) }}>
					<View
						style={{
							flex: 0.3,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_MEDIUM,
								flexWrap: "wrap",
							}}
						>
							Description
						</Text>
					</View>
					<View
						style={{
							flex: 0.7,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.DARK_GREY,
								fontFamily: FontFamily.POPPINS_LIGHT,
								flexWrap: "wrap",
							}}
						>
							{_.startCase(apptDetails.instruction)}
						</Text>
					</View>
				</View>
			</View>
		);
	};
	const renderBidSeller = ({ item, index }) => {
		return (
			<View>
				<View style={{ flexDirection: "row", marginVertical: responsiveHeight(1) }}>
					<View
						style={{
							flex: 0.4,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_MEDIUM,
								flexWrap: "wrap",
							}}
						>
							Company Name
						</Text>
					</View>
					<View
						style={{
							flex: 0.9,
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.DARK_GREY,
								fontFamily: FontFamily.POPPINS_LIGHT,
								flexWrap: "wrap",
							}}
						>
							{mask(item?.name)}
						</Text>
					</View>
				</View>
				<View style={{ flexDirection: "row" }}>
					<View
						style={{
							flex: 0.3,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_MEDIUM,
								flexWrap: "wrap",
							}}
						>
							Rating
						</Text>
					</View>
					<View
						style={{
							flex: 0.7,
							alignItems: "flex-start",
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<CustomRatingBar />
					</View>
				</View>
				<View style={{ flexDirection: "row", marginTop: responsiveHeight(1) }}>
					<View
						style={{
							flex: 0.4,
							marginHorizontal: responsiveWidth(2),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_MEDIUM,
								flexWrap: "wrap",
							}}
						>
							Positive Feedback %
						</Text>
					</View>
					<View
						style={{
							marginEnd: responsiveWidth(13),
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.DARK_GREY,
								fontFamily: FontFamily.POPPINS_LIGHT,
								flexWrap: "wrap",
							}}
						>
							89.45%
						</Text>
					</View>
				</View>
			</View>
		);
	};
	//==============renderItem for Payments===================//
	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				activeOpacity={1}
				style={{
					width: 45,
					borderColor: Colors.CARD_GREY,
					borderWidth: 1,
					borderRadius: 5,
					marginRight: 10,
					justifyContent: "center",
					alignContent: "center",
					alignItems: "center",
				}}
				onPress={() => {}}
			>
				<Image source={item.image} style={{ height: 20, width: 35, resizeMode: "contain" }} />
			</TouchableOpacity>
		);
	};
	const hasError = () => {
		let currentBidPrice = 0;
		const { bid_price, base_price } = appt_featured;
		let min_price = parseInt(appt_featured.min_price);
		let max_price = parseInt(appt_featured.max_price);
		if (bid_price) {
			currentBidPrice = parseInt(bid_price);
			// } else if (base_price) {
			// 	currentBidPrice = parseInt(base_price);
		} else {
			currentBidPrice = appt_featured.bid_type === "up" ? min_price : max_price;
		}

		if (appt_featured.bid_type === "up") {
			if (bidPrice > max_price) {
				return "Bid Price can't be grater than " + max_price;
			} else if (bidPrice <= currentBidPrice) {
				return "Bid Price can't be less than or equal to " + currentBidPrice;
			}
			return null;
		} else if (appt_featured.bid_type === "down") {
			if (bidPrice > currentBidPrice) {
				return "Bid Price can't be grater than " + currentBidPrice;
			} else if (bidPrice <= min_price) {
				return "Bid Price can't be less than or equal to " + min_price;
			}
			return null;
		}
	};
	console.log(wsRef);
//	debugger
	return (
		<SafeAreaView style={styles.safeAreaView}>
			<WS
				ref={wsRef}
				url={`wss://api.buildblog.in/ws/bid/${
					appt_featured?.group_id ? appt_featured.group_id : ""
				}/?token=${accessToken}`}
				onOpen={() => {
					console.log("Open!");
					setIsWSConnected(true);
				}}
				onMessage={(e) => {
					let data = JSON.parse(e.data);
					if (data.bid_value === bidPrice) {
						Toast.show({
							type: "success",
							text1: "Great!",
							text2: "Bid Place Successfully",
						});
						setBidPrice(null);
					}
					dispatch(updateCurrentBatch({ bid_price: data.bid_value }));
				}}
				onError={(e) => {
					setIsWSConnected(false);
				}}
				onClose={(e) => {
					setIsWSConnected(false);
				}}
				reconnect={false} // Will try to reconnect onClose
			/>
			<View style={{ height: 60, backgroundColor: Colors.WHITE, marginEnd: responsiveWidth(-4) }}>
				<HeaderCart
					onPress={() => navigation.goBack()}
					image={imagePath.LEFT}
					title="Featured"
					menu={imagePath.MENU}
					notification={imagePath.NOTIFICATION}
				/>
			</View>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 70 }}>
				<View style={{ position: "relative" }}>
					<View
						style={{
							position: "absolute",
							flexDirection: "row",
							alignItems: "center",
							left: 7,
							top: isOpen ? 45 : 10,
						}}
					>
						<TouchableOpacity
							style={{
								width: 22,
								height: 22,
								borderRadius: 5,
								borderWidth: 0.5,
								borderColor: "#99999959",
								justifyContent: "center",
								alignItems: "center",
								zIndex: 3, // works on ios
								elevation: 1,
								backgroundColor: Colors.WHITE,
								marginRight: 8,
							}}
							onPress={() => setIsOpen(!isOpen)}
						>
							<Image
								source={imagePath.DROPDOWN}
								resizeMode={"center"}
								style={{
									width: 10,
									height: 10,
									transform: [{ rotate: !isOpen ? "90deg" : "270deg" }],
								}}
							/>
						</TouchableOpacity>
						{!isOpen && <Text style={{ color: "#0A84FF", fontSize: 10 }}>View APPT</Text>}
					</View>
					<View
						style={{
							height: 400,
							borderRadius: 10,
							borderWidth: 1,
							borderColor: "#99999959",
							paddingTop: 16,
							paddingLeft: 16,
							paddingBottom: 16,
							flexDirection: "row",
						}}
					>
						{isOpen && (
							<View style={{ flex: 0.2, position: "relative" }}>
								<TouchableOpacity
									style={{
										width: 22,
										height: 22,
										position: "absolute",
										borderRadius: 5,
										borderWidth: 0.5,
										borderColor: "#99999959",
										justifyContent: "center",
										alignItems: "center",
										zIndex: 99999, // works on ios
										elevation: 1,
										left: 28,
										top: -12,
										backgroundColor: Colors.WHITE,
									}}
								>
									<Image
										source={imagePath.DROPDOWN}
										resizeMode={"center"}
										style={{
											width: 10,
											height: 10,
											transform: [{ rotate: "0deg" }],
										}}
									/>
								</TouchableOpacity>
								<ScrollView showsVerticalScrollIndicator={false}>
									{appt_featured?.appointments?.map((obj) => {
										return (
											<Pressable onPress={() => handleApptOnPress(obj)}>
												<View
													style={{
														height: 87,
														width: 74,
														borderWidth: 1,
														borderColor: currentAppt === obj.id ? Colors.BLUE : "#99999959",
														marginBottom: 5,
														justifyContent: "center",
														alignItems: "center",
													}}
												>
													<Text
														style={{
															color: currentAppt === obj.id ? Colors.BLUE : "#0C1559",
															fontSize: 12,
														}}
													>
														{obj.ref_id}
													</Text>
												</View>
											</Pressable>
										);
									})}
								</ScrollView>
								<TouchableOpacity
									style={{
										width: 22,
										height: 22,
										position: "absolute",
										borderRadius: 5,
										borderWidth: 0.5,
										borderColor: "#99999959",
										justifyContent: "center",
										alignItems: "center",
										zIndex: 3, // works on ios
										elevation: 1,
										left: 28,
										bottom: -7,
										backgroundColor: Colors.WHITE,
									}}
								>
									<Image
										source={imagePath.DROPDOWN}
										resizeMode={"center"}
										style={{
											width: 10,
											height: 10,
											transform: [{ rotate: "180deg" }],
										}}
									/>
								</TouchableOpacity>
							</View>
						)}
						<View style={{ flex: !isOpen ? 1 : 0.8, overflow: "hidden", justifyContent: "center" }}>
							<ViewSlider
								renderSlides={
									<View
										style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}
									>
										{img.map((obj) => {
											if (obj.split(".").pop() !== "mp4") {
												return (
													<Image
														source={{
															uri: obj,
														}}
														style={{ height: 200, width: width, resizeMode: "contain" }}
													/>
												);
											}
											return (
												<View style={{ width: width }}>
													<VideoPlayer
														video={{ uri: obj }}
														autoplay={false}
														videoWidth={width - 300}
														videoHeight={500}
														thumbnail={{
															uri: "https://i.picsum.photos/id/866/1600/900.jpg",
														}}
													/>
												</View>
											);
										})}
									</View>
								}
								style={{
									alignSelf: "center",
									justifyContent: "center",
									alignItems: "center",
								}} //Main slider container style
								height={400} //Height of your slider
								slideCount={img.length} //How many views you are adding to slide
								dots={true} // Pagination dots visibility true for visibile
								dotActiveColor={Colors.BLUE} //Pagination dot active color
								dotInactiveColor={Colors.NAVY_BLUE} // Pagination do inactive color
								dotsContainerStyle={{
									backgroundColor: "transparent",
									position: "absolute",
									bottom: 15,
								}}
							/>
						</View>
					</View>
				</View>
				<View>
					<View
						style={{
							marginTop: responsiveHeight(2),
							marginHorizontal: responsiveWidth(3),
							flexDirection: "row",
						}}
					>
						<Text
							style={{
								fontSize: 16,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_SEMIBOLD,
								flexWrap: "wrap",
								// lineHeight : 17
							}}
						>
							{apptDetails?.work_type?.title}
						</Text>
						<Image
							style={{
								width: 20,
								height: 20,
								marginStart: responsiveWidth(2),
							}}
							source={imagePath.LOGO}
						/>
						<View
							style={{
								width: 20,
								height: 20,
								marginStart: 10,
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: Colors.NAVY_BLUE,
							}}
						>
							<Image
								resizeMode={"center"}
								style={{ width: 25, height: 20, tintColor: Colors.WHITE }}
								source={imagePath.CELLPHONE}
							/>
						</View>
					</View>
					<View
						style={{
							marginTop: responsiveHeight(1),
							marginHorizontal: responsiveWidth(3),
							flexDirection: "row",
							alignItems: "center",
							width: "95%",
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_REGULAR,
								flexWrap: "wrap",
							}}
						>
							Assessment Date :
						</Text>
						<Text
							style={{
								fontSize: 10,
								marginStart: responsiveWidth(2),
								color: Colors.GREEN,
								fontFamily: FontFamily.POPPINS_REGULAR,
								flexWrap: "wrap",
							}}
						>
							{moment(apptDetails.assesment_complete_date).format("hh:mm A, ddd Do of MMM YYYY")}
						</Text>
					</View>
					<View
						style={{
							marginTop: responsiveHeight(1),
							marginHorizontal: responsiveWidth(3),
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_REGULAR,
								flexWrap: "wrap",
							}}
						>
							Auction Date :
						</Text>
						<Text
							style={{
								fontSize: 8,
								marginStart: responsiveWidth(2),
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_SEMIBOLD,
								flexWrap: "wrap",
							}}
						>
							{moment(new Date(`${appt_featured?.start_date} ${appt_featured?.start_time}`)).format("hh:mm A, ddd Do of MMM YYYY")} - {moment(new Date(`${appt_featured?.end_date} ${appt_featured?.end_time}`)).format("hh:mm A, ddd Do of MMM YYYY")}
						</Text>
					</View>
					<View style={{ marginHorizontal: responsiveWidth(3) }}>
						<TouchableOpacity
							activeOpacity={1}
							style={{
								minHeight: 56,
								backgroundColor: Colors.NAVY_BLUE,
								width: "100%",
								borderRadius: 5,
								marginTop: responsiveHeight(1),
							}}
						>
							<Text
								style={{
									color: Colors.WHITE,
									fontSize: 12,
									fontFamily: FontFamily.POPPINS_LIGHT,
									margin: responsiveWidth(2),
									flexWrap: "wrap",
								}}
							>
								Base Price :
							</Text>
							<View
								style={{
									justifyContent: "center",
									bottom: 12,
									alignItems: "center",
								}}
							>
								<Text
									style={{
										color: Colors.WHITE,
										fontSize: 16,
										fontFamily: FontFamily.POPPINS_REGULAR,
										flexWrap: "wrap",
									}}
								>
									${currentBidPrice}
								</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{ marginHorizontal: responsiveWidth(3) }}>
						<TouchableOpacity
							activeOpacity={1}
							style={{
								minHeight: 56,
								backgroundColor: Colors.GREEN,
								width: "100%",
								borderRadius: 5,
								justifyContent: "center",
								alignItems: "center",
								marginTop: responsiveHeight(1),
							}}
							onPress={() => {
								navigation.navigate(navigationPath.CHECKOUT, {
									batch: [appt_featured],
									price: getPrice(),
								});
							}}
						>
							<Text
								style={{
									color: Colors.WHITE,
									fontSize: 16,
									fontFamily: FontFamily.POPPINS_REGULAR,
									flexWrap: "wrap",
								}}
							>
								BUY IT NOW AT {getPrice()}
							</Text>
						</TouchableOpacity>
					</View>
					<View
						style={{
							flex: 2,
							flexDirection: "row",
							marginHorizontal: responsiveWidth(3),
							marginTop: responsiveHeight(1),
						}}
					>
						<View style={{ flex: 1, marginRight: 10, padding: 0 }}>
							<TextInput
							disabled={finishedDate()}
								mode={"outlined"}
								type={"number"}
								activeOutlineColor={Colors.BLUE}
								keyboardType={"numeric"}
								style={{
									borderRadius: 5,
									color: Colors.BLACK,
								}}
								placeholder={finishedDate()?"Batch Expires":"Enter your Offer"}
								value={bidPrice}
								onChangeText={(text) => {
									setBidPrice(text);
								}}
								error={bidPrice.length > 0 && hasError()}
							/>
							<HelperText type="error" visible={true}>
								{bidPrice.length > 0 && hasError()}
							</HelperText>
						</View>

						<View style={{ flex: 1 }}
						>
							<TouchableOpacity
								onPress={() => {
									if (hasError()) {
										console.log("hasError")
										return;
									}
									if (wsRef.current) {
									if(appt_featured.last_bid_by_user_id==user.id){
										Toast.show({
											type: "error",
											text1: " Please wait...",
											text2: "Last Bid Prices is updated by you",
										});
										return

									}
										wsRef.current.send(JSON.stringify({ bid_value: parseFloat(bidPrice) }))
										console.log(wsRef.current,"current Status")
										Toast.show({
											type: "success",
											text1: "Great!",
											text2: "Bid Updated Successfully",
										});
									}
								}}
								activeOpacity={1}
								style={{
									height: responsiveHeight(6.5),
									backgroundColor: Colors.BLUE,
									width: "100%",
									borderRadius: 5,
									justifyContent: "center",
									alignItems: "center",
									marginTop: 5,
								}}
								disabled={!isWSConnected || finishedDate()}
								// disabled={ws.readyState !== 1}
							>
								<Text
									style={{
										color: Colors.WHITE,
										fontSize: 16,
										fontFamily: FontFamily.POPPINS_REGULAR,
										flexWrap: "wrap",
									}}
								>
									PLACE A BID
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View
						style={{
							marginHorizontal: responsiveWidth(3),
							marginTop: responsiveHeight(1),
						}}
					>
						<TouchableOpacity
						disabled={true}
							// disabled={ws.readyState !== 1}
							
							// disabled={!isWSConnected}
							// onPress={() => {

							// 	dispatch(
							// 		updateCartDetailsAsync({
							// 			id: user.cart_id,
							// 			data: {
							// 				user: user.id,
							// 				products: [...productIds, apptDetails.batch],
							// 			},
							// 		}),
							// 	)
							// 		.unwrap()
							// 		.then((res) => {
							// 			Toast.show({
							// 				type: "success",
							// 				text1: "Great!",
							// 				text2: "WatchList Updated Successfully",
							// 			});
							// 			navigation.navigate(navigationPath.CART);
							// 		})
							// 		.catch((err) => {});
							// }}
							activeOpacity={1}
							style={{
								height: responsiveHeight(5.8),
								backgroundColor: Colors.CARD_GREY,
								width: "100%",
								borderRadius: 5,
								justifyContent: "center",
								alignItems: "center",
								borderColor: Colors.DARK_GREY,
								borderWidth: 0.3,
							}}
						>
							<Text
								style={{
									color: Colors.BLACK,
									fontSize: 16,
									fontFamily: FontFamily.POPPINS_REGULAR,
									flexWrap: "wrap",
								}}
							>
								ADD TO WATCHLIST
							</Text>
						</TouchableOpacity>
					</View>
					<View
						style={{
							marginTop: responsiveHeight(1),
							marginHorizontal: responsiveWidth(3),
						}}
					>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text
								style={{
									color: Colors.BLACK,
									fontFamily: FontFamily.POPPINS_SEMIBOLD,
									fontSize: 14,
									flexWrap: "wrap",
								}}
							>
								Payments
							</Text>
							<View style={{ marginLeft: 10 }}>
								<FlatList
									horizontal
									showsHorizontalScrollIndicator={false}
									horizontaldata
									data={payments}
									contentContainerStyle={{
										paddingRight: responsiveWidth(12),
									}}
									renderItem={renderItem}
								/>
							</View>
						</View>
					</View>
					<View
						style={{
							marginTop: responsiveHeight(1),
							marginHorizontal: responsiveWidth(3),
						}}
					>
						<Text
							style={{
								fontSize: 16,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_SEMIBOLD,
								flexWrap: "wrap",
							}}
						>
							About this Bid
						</Text>
					</View>
					<View>
						<View
							style={{
								marginHorizontal: responsiveWidth(3),
								borderColor: Colors.CARD_GREY,
								borderWidth: 1,
								borderRadius: 5,
							}}
						>
							<View
								style={{
									marginTop: responsiveHeight(1),
									marginHorizontal: responsiveWidth(2),
								}}
							>
								<Text
									style={{
										fontSize: 12,
										color: Colors.BLACK,
										fontFamily: FontFamily.POPPINS_SEMIBOLD,
										flexWrap: "wrap",
									}}
								>
									Property Details
								</Text>
							</View>

							<FlatList data={[apptDetails?.job?.property_address]} renderItem={renderBidData} />
						</View>
					</View>
					{/* ///=====================renderBidSeller For JOb Address================// */}

					<View
						style={{
							marginTop: responsiveHeight(1),
							marginHorizontal: responsiveWidth(3),
						}}
					>
						<Text
							style={{
								fontSize: 16,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_SEMIBOLD,
								flexWrap: "wrap",
							}}
						>
							About this Seller
						</Text>
					</View>

					<View>
						<View
							style={{
								marginHorizontal: responsiveWidth(3),
								borderColor: Colors.CARD_GREY,
								borderWidth: 1,
								borderRadius: 5,
								paddingVertical: 5,
							}}
						>
							<View
								style={{
									marginTop: responsiveHeight(1),
									marginHorizontal: responsiveWidth(2),
								}}
							>
								<Text
									style={{
										fontSize: 12,
										color: Colors.BLACK,
										fontFamily: FontFamily.POPPINS_SEMIBOLD,
										flexWrap: "wrap",
									}}
								>
									Seller Information
								</Text>
							</View>
							<FlatList data={[apptDetails.company]} renderItem={renderBidSeller} />
						</View>
					</View>
					<View
						style={{
							marginTop: responsiveHeight(1),
							marginHorizontal: responsiveWidth(3),
						}}
					>
						<Text
							style={{
								fontSize: 16,
								color: Colors.BLACK,
								fontFamily: FontFamily.POPPINS_SEMIBOLD,
								flexWrap: "wrap",
							}}
						>
							Similar Job
						</Text>
					</View>
					{/* //=======================renderJobsItem for Similar Job================// */}
					<View style={{ marginTop: responsiveHeight(3) }}>
						<FlatList
							horizontal
							showsHorizontalScrollIndicator={false}
							data={similarJobs}
							renderItem={renderJobsItem}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default Feature;
