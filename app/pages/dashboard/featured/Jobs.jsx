import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	Image,
	TouchableOpacity,
	FlatList,
	Pressable,
	RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Search from "../../../components/Search/Search";
import imagePath from "../../../constants/imagePath";
import styles from "../../../components/Header/styles";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import HeaderCart from "../../../components/Header/HeaderCart";
import Colors from "../../../styles/colors";
import { Chip, Menu } from "react-native-paper";
import _ from "lodash";
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from "accordion-collapse-react-native";
import FontFamily from "../../../constants/FontFamily";
import { moderateScale, verticalScale } from "../../../utils/Dimensions";
import ModalOffer from "../../../components/Modal/ModalOffer";
import navigationPath from "../../../constants/navigationPath";
import { useNavigation } from "@react-navigation/native";
import CustomMenu from "./CustomMenu";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentsAsync, getAppointmentWorkType } from "../../../redux/asyncThunk/appointment.asyncThunk";
import moment from "moment/moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import WS from "react-native-websocket";

const Jobs = (props) => {
	// const {recieveBack}=props?.route?.params
	const { batch_appointments, workType } = useSelector((state) => state.appointments);
	const { accessToken } = useSelector((state) => state.auth);
	const [showPrimary, setShowPrimary] = useState(null);
	const navigation = useNavigation();
	const [visible, setVisible] = useState(false);
	const [visible1, setVisible1] = useState(false);
	const [visible3, setVisible3] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [datePickerVisible, setDatePickerVisible] = useState(false);
	// `wss://api.buildblog.in/ws/batch/?token=${accessToken}`;
	const initialFilter ={
		work_type: null,
		start_date: null,
		big_type: null,
		group_type: null,
		search: null,
	}
	const [filterData, setFilterData] = useState(initialFilter);
	const [refreshing, setRefreshing] = React.useState(false);
	const wsRef = React.useRef(null);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		let params = _.omitBy(filterData, _.isNull);
		
		dispatch(getAppointmentsAsync({ params: { ...params, expand: "appointments.work_type" } }))
			.unwrap()
			.then(() => {
				setRefreshing(false);
			})
			.catch((err) => {
				setRefreshing(false);
			});
	}, []);
	console.log(_.omitBy(filterData, _.isNull),"filters.................")
	const showDatePicker = () => {
		setDatePickerVisible(true);
	};
	const hideDatePicker = () => {
		setDatePickerVisible(false);
	};
	const handleConfirm = (date) => {
		setFilterData({ ...filterData, start_date:moment(date).format("YYYY-MM-DD")});
		hideDatePicker();
	};
	useEffect(() => {
		dispatch(getAppointmentWorkType());
	}, []);
	useEffect(() => {
		let params = _.omitBy(filterData, _.isNull);
		dispatch(getAppointmentsAsync({ params: { ...params, expand: "appointments.work_type" } }));
	}, [filterData]);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			let params = _.omitBy(filterData, _.isNull);
			dispatch(getAppointmentsAsync({ params: { ...params, expand: "appointments.work_type" } }));
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return () => {
			unsubscribe;
		};
	}, [navigation]);
	const showModal = (props) => {
		setModalVisible(true);
	};
	const hideModal = () => {
		setModalVisible(false);
	};
	const renderItem = ({ item, index }) => {
		
		return (
			<>
				<Pressable
					onPress={() => {
						setFilterData(initialFilter)
						
						navigation.navigate(navigationPath.FEATURED, { id: item.id })}}
					style={{
						// height: responsiveHeight(20),
						backgroundColor: Colors.WHITE,
						marginHorizontal: responsiveWidth(3),
						borderTopLeftRadius: 5,
						borderTopRightRadius: 5,
						borderColor: "#99999926",
						borderWidth: 1,
					}}
					key={item.id}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							padding: 10,
							backgroundColor: Colors.CARD_HEADER,

							justifyContent: "space-between",
							// borderWidth: 0.2,
							// borderTopLeftRadius: 5,
							// borderTopRightRadius: 5,
							borderColor: Colors.BORDER_GREY,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								marginHorizontal: responsiveWidth(2),
							}}
						>
							<Image style={{ width: 19, height: 18 }} source={imagePath.CUBE} />
							<Text
								style={{
									marginStart: responsiveWidth(4),
									fontFamily: FontFamily.POPPINS_SEMIBOLD,
									color: Colors.BLACK,
									fontSize: 12,
									flexWrap: "wrap",
								}}
								adjustsFontSizeToFit={true}
								numberOfLines={1}
							>
								{item.type_of_requsest}
							</Text>
						</View>
					</View>
					<View
						style={{
							marginLeft: 12,
							marginBottom: 12,
							marginTop: 8,
						}}
					>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<View style={{ flex: 0.35, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: Colors.BLACK,
										fontSize: 10,
										lineHeight: 16,
										flexWrap: "wrap",
									}}
								>
									Post Code
								</Text>
							</View>
							<View style={{ flex: 0.65, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: "#666666",
										fontSize: 10,
										flexWrap: "wrap",
										lineHeight: 16,
									}}
								>
									{item.post_code}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<View style={{ flex: 0.35, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: Colors.BLACK,
										fontSize: 10,
										lineHeight: 16,
										flexWrap: "wrap",
									}}
								>
									Grouping Type
								</Text>
							</View>
							<View style={{ flex: 0.65, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: "#666666",
										fontSize: 10,
										flexWrap: "wrap",
										lineHeight: 16,
									}}
								>
									{_.startCase(item.grouping_type)}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<View style={{ flex: 0.35, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: Colors.BLACK,
										fontSize: 10,
										lineHeight: 16,
										flexWrap: "wrap",
									}}
								>
									Bid start and end date :
								</Text>
							</View>
							<View style={{ flex: 0.65, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: "#666666",
										fontSize: 10,
										flexWrap: "wrap",
										lineHeight: 16,
									}}
								>
									{moment(item.start_date).format("ddd Do of MMMM")} -{" "}
									{moment(item.end_date).format("ddd Do MMM")}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<View style={{ flex: 0.35, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: Colors.BLACK,
										fontSize: 10,
										lineHeight: 16,
										flexWrap: "wrap",
									}}
								>
									Bid Type :
								</Text>
							</View>
							<View style={{ flex: 0.65, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: "#666666",
										fontSize: 10,
										flexWrap: "wrap",
										lineHeight: 16,
									}}
								>
									{_.startCase(item.bid_type)}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<View style={{ flex: 0.35, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: Colors.BLACK,
										fontSize: 10,
										lineHeight: 16,
										flexWrap: "wrap",
									}}
								>
									Base Price :
								</Text>
							</View>
							<View style={{ flex: 0.65, marginBottom: 4 }}>
								<View
									style={{
										height: 17,
										alignItems: "flex-start",
										marginTop: 4,
									}}
								>
									<Text
										style={{
											paddingHorizontal: 4,
											backgroundColor: Colors.GREEN,
											fontFamily: FontFamily.POPPINS_REGULAR,
											color: Colors.WHITE,
											fontSize: 10,
											flexWrap: "wrap",
											lineHeight: 16,
											paddingHorizontal: 7,
										}}
									>
										{item.base_price ? "$" + item.bid_price : (item.bid_type ==="up")?item.min_price:item.max_price}
									</Text>
								</View>
							</View>
						</View>
					</View>
				</Pressable>
				{item.appointments.length > 0 && (
					<ScrollView showsVerticalScrollIndicator={false}>
						<View>
							<View
								style={{
									marginHorizontal: responsiveWidth(3),
									marginBottom: 13,
									backgroundColor: Colors.WHITE,
									flexDirection: "row",
									alignItems: "center",
									backgroundColor: Colors.CARD_GREY,
									borderWidth: 0.5,
									borderBottomLeftRadius: 5,
									borderBottomRightRadius: 5,
									borderColor: Colors.BORDER_GREY,
								}}
							>
								<Collapse
									onToggle={(e) => setShowPrimary({ [item.id]: e })}
									style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
								>
									<CollapseHeader>
										<View
											style={{
												flexDirection: "row",
												height: 35,
												alignItems: "center",
												backgroundColor: Colors.CARD_GREY,
												justifyContent: "space-between",
											}}
										>
											<View
												style={{
													flexDirection: "row",
													justifyContent: "center",
													alignItems: "center",
													marginHorizontal: responsiveWidth(4),
												}}
											>
												<View
													style={{
														flex: 1,
														alignItems: "center",
														flexDirection: "row",
														justifyContent: "center",
														marginHorizontal: responsiveWidth(1.8),
													}}
												>
													<Image style={{ width: 20, height: 18 }} source={imagePath.LIST} />

													<Text
														style={{
															color: "#666666",
															marginStart: responsiveWidth(4),
															fontFamily: FontFamily.POPPINS_MEDIUM,
															fontSize: 12,
															flexWrap: "wrap",
														}}
													>
														Appointments
													</Text>
													<Text
														style={{
															color: Colors.RED,
															marginStart: responsiveWidth(2),
															fontFamily: FontFamily.POPPINS_REGULAR,
															fontSize: 12,
															flexWrap: "wrap",
														}}
													>
														{item.appointments.length} Apps
													</Text>
													<Image
														style={{
															width: 10,
															height: 10,
															marginStart: responsiveWidth(2),
															transform: [
																{
																	rotate: showPrimary?.[item.id]
																		? "360deg"
																		: "180deg",
																},
															],
														}}
														source={imagePath.DROPDOWN}
													/>
												</View>
											</View>
										</View>
									</CollapseHeader>
									<CollapseBody
										style={{
											borderColor: Colors.CARD_GREY,
											borderWidth: 0.5,
											borderBottomLeftRadius: 5,
											borderBottomRightRadius: 5,
										}}
									>
										{headPrimary(item.appointments)}
									</CollapseBody>
								</Collapse>
							</View>
						</View>
					</ScrollView>
				)}
			</>
		);
	};
	const headPrimary = (item) => {
		return (
			<View
				style={{
					width: "100%",
					backgroundColor: Colors.WHITE,
					borderBottomLeftRadius: 5,
					borderBottomRightRadius: 5,
				}}
			>
				<FlatList
					horizontal={true}
					scrollEnabled={true}
					showsHorizontalScrollIndicator={false}
					data={item}
					contentContainerStyle={{
						flexDirection: "row",
					}}
					renderItem={({ item, index }) => {
						return (
							<View
								bordered
								style={{
									backgroundColor: Colors.WHITE,
									marginHorizontal: 10,
									marginVertical: 10,
									maxWidth: 162,
									minWidth: 162,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										width: "100%",
										backgroundColor: Colors.WHITE,
									}}
								>
									<Pressable
										style={{
											backgroundColor: index % 2 == 1 ? Colors.NAVY_BLUE : "#F7FAFD",
											paddingVertical: 6,
											paddingHorizontal: 5,
											width: "100%",
										}}
									>
										<View
											style={{
												flexDirection: "row",
												paddingBottom: 6,
												borderBottomWidth: 0.2,
												borderBottomColor: Colors.CARD_GREY,
											}}
										>
											<Image
												style={{
													width: 13,
													height: 12,
													tintColor: index % 2 == 1 ? Colors.WHITE : Colors.BLACK,
												}}
												source={imagePath.APPOINTMENT}
											/>

											<Text
												style={{
													fontSize: 10,
													flex: 1,
													textAlign: "center",
													color: index % 2 == 1 ? Colors.WHITE : Colors.BLACK,
													marginStart: 7,
												}}
											>
												{item?.work_type?.title}
											</Text>
											{/* <Image
												style={{
													width: 10,
													height: 10,
													marginStart: responsiveWidth(2),
													tintColor: index % 2 == 1 ? Colors.WHITE : Colors.BLACK,
												}}
												source={imagePath.CLOSE}
											/> */}
										</View>
										<View
											style={{
												paddingRight: 10,
											}}
										>
											<View
												style={{
													flexDirection: "row",
													justifyContent: "space-between",
													marginTop: 8,
													marginBottom: 3,
												}}
											>
												<Text
													style={{
														fontSize: 10,
														lineHeight: 16,
														fontFamily: FontFamily.POPPINS_REGULAR,
														color: index % 2 == 1 ? Colors.WHITE : Colors.BLACK,
														flexWrap: "wrap",
														flex: 0.5,
													}}
												>
													Appt Id :
												</Text>
												<Text
													style={{
														fontSize: 10,
														lineHeight: 16,
														color: index % 2 == 1 ? Colors.WHITE : "#666666",
														flex: 0.5,
														textAlign: "right",
													}}
												>
													{item.ref_id}
												</Text>
											</View>
											<View
												style={{
													flexDirection: "row",
													justifyContent: "space-between",
													marginBottom: 8,
												}}
											>
												<Text
													style={{
														fontSize: 10,
														lineHeight: 16,
														fontFamily: FontFamily.POPPINS_REGULAR,
														color: index % 2 == 1 ? Colors.WHITE : Colors.BLACK,
														flex: 0.5,
														flexWrap: "wrap",
													}}
												>
													Assessment Date :
												</Text>
												<Text
													style={{
														fontSize: 10,
														lineHeight: 16,
														color: index % 2 == 1 ? Colors.WHITE : "#666666",
														flex: 0.5,
														textAlign: "right",
													}}
												>
													{moment(item.start_date).format("DD-MMM-yyyy")}
												</Text>
											</View>
											<View
												style={{
													flexDirection: "row",
													justifyContent: "space-between",
													// marginBottom: 8,
												}}
											>
												<Text
													style={{
														fontSize: 10,
														lineHeight: 16,
														fontFamily: FontFamily.POPPINS_REGULAR,
														color: index % 2 == 1 ? Colors.WHITE : Colors.BLACK,
														flex: 0.5,
														flexWrap: "wrap",
													}}
												>
													Validation :
												</Text>
												<View style={{ flex: 0.5, alignItems: "flex-end" }}>
													<View
														style={{
															backgroundColor:
																index % 2 == 1 ? Colors.WHITE : Colors.NAVY_BLUE,
															marginBottom: 5,
															height: 25,
															width: 25,
															borderRadius: 2,
															justifyContent: "center",
															alignItems: "center",
														}}
													>
														<Image
															resizeMode="center"
															style={{ width: 18, height: 18 }}
															source={
																index % 2 == 1
																	? imagePath.CELLPHONE_BLUE
																	: imagePath.CELLPHONE
															}
														/>
													</View>
												</View>
											</View>
										</View>
									</Pressable>
								</View>
							</View>
						);
					}}
				/>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<WS
				ref={wsRef}
				url={`wss://api.buildblog.in/ws/batch/?token=${accessToken}`}
				onOpen={() => {
					console.log("Open!");
				}}
				onMessage={(e) => console.log(e)}
				onError={(e) => console.log(e)}
				onClose={(e) => console.log(e, "close")}
				reconnect={false} // Will try to reconnect onClose
			/>
			<DateTimePickerModal
				date={new Date()}
				isVisible={datePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
			/>
			<View style={{ marginEnd: responsiveWidth(-4) }}>
				<HeaderCart
					onPress={() => navigation.goBack()}
					image={imagePath.LEFT}
					title="Jobs"
					menu={imagePath.MENU}
					notification={imagePath.NOTIFICATION}
				/>
			</View>
			<View style={{ marginTop: responsiveHeight(4) }}>
				<Search
					search={imagePath.SEARCH}
					value={filterData.search}
					onChange={(search) => setFilterData({ ...filterData, search })}
					placeholder={"Search"}
				/>
			</View>
			<View>
				<ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginTop: 20 }}>
					<View
						style={{
							flexDirection: "row",
							margin: 1,
						}}
					>
						<CustomMenu
							setVisible={setVisible}
							visible={visible}
							anchor={
								<Chip
									onPress={() => {
										setVisible(true);
									}}
									closeIcon={visible ? "angle-up" : "angle-down"}
									onClose={() => setVisible(true)}
								>
									<Text
										style={{
											flexWrap: "wrap",
											color: Colors.BLACK,
											fontFamily: FontFamily.POPPINS_LIGHT,
											fontSize: responsiveFontSize(1.2),
										}}
									>
										Type of request
									</Text>
								</Chip>
							}
						>
							{workType?.map((obj) => {
								return (
									<Menu.Item
										onPress={() => {
											setFilterData({ ...filterData, work_type: obj.id });
											setVisible(false);
										}}
										title={obj.title}
									/>
								);
							})}
						</CustomMenu>

						<CustomMenu
							setVisible={setVisible1}
							visible={visible1}
							anchor={
								<Chip
									onPress={() => {
										setVisible1(true);
									}}
									closeIcon={visible1 ? "angle-up" : "angle-down"}
									onClose={() => setVisible1(true)}
								>
									<Text
										style={{
											flexWrap: "wrap",
											color: Colors.BLACK,
											fontFamily: FontFamily.POPPINS_LIGHT,
											fontSize: responsiveFontSize(1.2),
										}}
									>
										Grouping Type
									</Text>
								</Chip>
							}
						>
							{["Suburb", "State", "LGA"].map((obj) => {
								return (
									<Menu.Item
										onPress={() => {
											setFilterData({ ...filterData, group_type: obj });
											setVisible1(false);
										}}
										title={obj}
									/>
								);
							})}
						</CustomMenu>

						<Chip onPress={showDatePicker} closeIcon={"calendar"} onClose={showDatePicker}>
							<Text
								style={{
									flexWrap: "wrap",
									color: Colors.BLACK,
									fontFamily: FontFamily.POPPINS_LIGHT,
									fontSize: responsiveFontSize(1.2),
								}}
							>
								Date
							</Text>
						</Chip>
						<CustomMenu
							setVisible={setVisible3}
							visible={visible3}
							anchor={
								<Chip
									onPress={() => {
										setVisible3(true);
									}}
									closeIcon={visible3 ? "angle-up" : "angle-down"}
									onClose={() => setVisible3(true)}
								>
									<Text
										style={{
											flexWrap: "wrap",
											color: Colors.BLACK,
											fontFamily: FontFamily.POPPINS_LIGHT,
											fontSize: responsiveFontSize(1.2),
										}}
									>
										Bid Type
									</Text>
								</Chip>
							}
						>
							{["up", "down"].map((obj) => {
								return (
									<Menu.Item
										onPress={() => {
											setFilterData({ ...filterData, bid_type: obj });
											setVisible3(false);
										}}
										title={obj}
									/>
								);
							})}
						</CustomMenu>
					</View>
				</ScrollView>
			</View>
			<View>
				{_.keys(_.omitBy(filterData, _.isNull)).length > 0 && (
					<Text style={{ marginLeft: 10, marginTop: 10, fontSize: 10 }}>Applied Filters</Text>
				)}
				<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
					<View
						style={{
							flexDirection: "row",
							margin: 1,
							marginTop: 10,
						}}
					>
						{_.keys(_.omitBy(filterData, _.isNull)).map((obj) => {
							let val = filterData[obj];
							if (obj === "start_date") {
								val = moment(val).format("YYYY-MM-DD");
							}
							if (obj === "work_type") {
								val = workType.filter((o) => o.id === val)[0].title;
							}
							return (
								<Chip
									style={{
										marginLeft: 10,
										backgroundColor: Colors.BLUE,
										color: Colors.WHITE,
									}}
									closeIcon={"close"}
									onClose={() => setFilterData({ ...filterData, [obj]: null })}
								>
									<Text
										style={{
											flexWrap: "wrap",
											color: Colors.WHITE,
											fontFamily: FontFamily.POPPINS_LIGHT,
											fontSize: responsiveFontSize(1.2),
										}}
									>
										{val}
									</Text>
								</Chip>
							);
						})}
					</View>
				</ScrollView>
			</View>
			<View style={{ marginTop: responsiveHeight(2) }}>
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: _.keys(_.omitBy(filterData, _.isNull)).length > 0 ? 220 : 150,
					}}
					data={batch_appointments}
					renderItem={renderItem}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				/>

				<ModalOffer visible={modalVisible} onCancel={hideModal} />
			</View>
		</SafeAreaView>
	);
};

export default Jobs;
