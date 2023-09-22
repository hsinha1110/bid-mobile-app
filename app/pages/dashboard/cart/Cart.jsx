import { View, Text, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity, Alert, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import imagePath from "../../../constants/imagePath";
import Colors from "../../../styles/colors";
import HeaderCart from "../../../components/Header/HeaderCart";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import ButtonComp from "../../../components/Button/ButtonComp";
import FontFamily from "../../../constants/FontFamily";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import navigationPath from "../../../constants/navigationPath";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartDetailsAsync, getCartDetailsAsync } from "../../../redux/asyncThunk/cart.asyncThunk";
import Toast from "react-native-toast-message";

const Cart = () => {
	const { user } = useSelector((state) => state.auth);
	const { cartDetials, productIds, approved_count } = useSelector((state) => state.cartDetails);
	const [data, setData] = useState([]);
	const [changeColor, setChangeColor] = useState(false);
	const [confirmDialog, setConfirmDialog] = useState(true);
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		dispatch(
			getCartDetailsAsync({
				id: user.cart_id,
				params: { expand: "products.appointments.company" },
			}),
		)
			.unwrap()
			.then(() => {
				setRefreshing(false);
			})
			.catch((err) => {
				setRefreshing(false);
			});
	}, []);
	useEffect(() => {
		dispatch(
			getCartDetailsAsync({
				id: user.cart_id,
				params: { expand: "products.appointments.company" },
			}),
		);
	}, []);
	React.useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			dispatch(
				getCartDetailsAsync({
					id: user.cart_id,
					params: { expand: "products.appointments.company" },
				}),
			);
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [navigation]);

	const showConfirmDialog = (id) => {
		return Alert.alert("Are your sure?", "Do you want to remove item from cart ?", [
			// The "Yes" button
			{
				text: "Yes",
				onPress: () => {
					const product = productIds.filter((item) => item !== id);

					dispatch(
						deleteCartDetailsAsync({
							id: user.cart_id,
							params: { products: id },
						}),
					)
						.unwrap()
						.then((res) => {
							Toast.show({
								topOffset: 60,
								position: "top",
								type: "success",
								text1: "Deleted Successfully",
							});
							dispatch(
								getCartDetailsAsync({
									id: user.cart_id,
									params: { expand: "products.appointments.company" },
								}),
							);
						});
					setConfirmDialog(false);
				},
			},
			// The "No" button
			// Does nothing but dismiss the dialog when tapped
			{
				text: "No",
			},
		]);
	};

	const handleColorChange = (id) => {
		console.log(id, "kkkkkkkkkk");
		setChangeColor(!changeColor);
		showConfirmDialog(id);
	};

	const renderItem = ({ item }) => {
		return (
			<View
				style={{
					width: "100%",
					borderColor: "#99999926",
					borderWidth: 1,
					borderRadius: 5,
					padding: 12,
					marginBottom: 7,
				}}
			>
				<View style={{ flexDirection: "row" }}>
					{/* image */}
					<View style={{ marginRight: 28 }}>
						<Image style={{ width: 18, height: 18 }} source={imagePath.CUBE} />
					</View>
					{/* text */}
					<View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
						<View style={{}}>
							<Text
								style={{
									fontFamily: FontFamily.POPPINS_REGULAR,
									fontSize: 12,
									color: Colors.BLACK,
									flexWrap: "wrap",
									lineHeight: 18,
									marginBottom: 2,
								}}
								adjustsFontSizeToFit={true}
								numberOfLines={2}
							>
								{item?.type_of_requsest}
							</Text>
							<Text
								style={{
									fontFamily: FontFamily.POPPINS_REGULAR,
									fontSize: 10,
									color: Colors.RED,
									flexWrap: "wrap",
									lineHeight: 16,
								}}
							>
								{item.count} Appts
							</Text>
							<View style={{ flexDirection: "row" }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										fontSize: 10,
										lineHeight: 16,
										color: Colors.BLACK,
										flexWrap: "wrap",
										marginRight: 10,
									}}
									adjustsFontSizeToFit={true}
									numberOfLines={2}
								>
									Seller :
								</Text>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_MEDIUM,
										fontSize: 10,
										color: "#666666",
										flexWrap: "wrap",
										lineHeight: 16,
									}}
									adjustsFontSizeToFit={true}
									numberOfLines={2}
								>
									{item?.appointments[0]?.company.name}
								</Text>
							</View>
						</View>
						{/* delete */}
						<View style={{ justifyContent: "space-between" }}>
							<Text
								style={{
									fontFamily: FontFamily.POPPINS_MEDIUM,
									fontSize: 10,
									color: Colors.BLACK,
									flexWrap: "wrap",
								}}
							>
								{item.bid_price ? `$${item.bid_price}` : item.base_price ? `$${item.base_price}` : "NA"}
							</Text>
							<TouchableOpacity
								onPress={() => handleColorChange(item.id)}
								style={{ alignItems: "center" }}
							>
								<Image
									style={{
										width: 14,
										height: 14,
										tintColor: Colors.RED,
										marginBottom: 5,
									}}
									source={imagePath.BIN}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	};
	return (
		<SafeAreaView style={styles.safeAreaView}>
			<View style={{ backgroundColor: Colors.WHITE }}>
				<View style={{ marginEnd: responsiveWidth(-4) }}>
					<HeaderCart
						onPress={() => navigation.goBack()}
						image={imagePath.LEFT}
						title="Cart"
						menu={imagePath.MENU}
						notification={imagePath.NOTIFICATION}
					/>
				</View>
			</View>
			<View style={{ paddingLeft: 17, marginRight: 24 }}>
				<View style={{ marginTop: 50 }}>
					<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						<ButtonComp
						disabled={true}
							// onPress={() => {
								
								
							// 	//navigation.navigate(navigationPath.CHECKOUT)
							
							// }}
							activeOpacity={1}
							title={"GO TO CHECKOUT"}
							style={{
								width: responsiveWidth(63),
								minHeight: 47,
								borderRadius: 5,
								fontFamily: FontFamily.POPPINS_REGULAR,
								opacity: 10,
								fontSize: 16,
							}}
						/>
						<View style={{ justifyContent: "space-between" }}>
							<View style={{ flexDirection: "row" }}>
								<Image style={{ width: 18, height: 18, marginRight: 10 }} source={imagePath.CHECK} />
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										fontSize: 10,
										color: Colors.RED,
										flexWrap: "wrap",
									}}
									adjustsFontSizeToFit={true}
									numberOfLines={2}
								>
									{approved_count} Approved
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									backgroundColor: Colors.GREEN,
									height: 27,
									padding: 4,
									borderRadius: 5,
								}}
							>
								<Image
									source={imagePath.CLOCK}
									style={{ width: 16, height: 16, tintColor: Colors.WHITE, marginRight: 7 }}
								/>
								<View style={{ justifyContent: "center", alignItems: "center" }}>
									<Text
										style={{
											fontFamily: FontFamily.POPPINS_MEDIUM,
											fontSize: 8,
											color: Colors.WHITE,
											flexWrap: "wrap",
										}}
										adjustsFontSizeToFit={true}
										numberOfLines={2}
									>{`00 : 00 : 7 : 12`}</Text>
									<Text
										style={{
											fontFamily: FontFamily.POPPINS_MEDIUM,
											fontSize: 5,
											flexWrap: "wrap",

											color: Colors.WHITE,
										}}
									>{`DAYS HRS MIN SEC`}</Text>
								</View>
							</View>
						</View>
					</View>
					<View>
						<TouchableOpacity
							activeOpacity={1}
							style={{
								backgroundColor: Colors.GREEN,
								height: 38,
								marginVertical: 15,
								borderRadius: 5,
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "row",
							}}
						>
							<Image
								source={imagePath.CLOCK}
								style={{ width: 23, height: 23, tintColor: Colors.WHITE, marginRight: 20 }}
							/>

							<View>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_MEDIUM,
										fontSize: 14,
										color: Colors.WHITE,
										flexWrap: "wrap",
									}}
									adjustsFontSizeToFit={true}
									numberOfLines={2}
								>{`00 : 00 : 7 : 12`}</Text>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_MEDIUM,
										fontSize: 10,
										flexWrap: "wrap",

										color: Colors.WHITE,
									}}
								>{`DAYS HRS MIN SEC`}</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>

				<View
					style={{
						backgroundColor: Colors.WHITE,
						paddingBottom: responsiveHeight(20),
            
					}}
				>
					<FlatList
						showsVerticalScrollIndicator={false}
						data={cartDetials}
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
						renderItem={renderItem}
            style={{height : "100%"}}
            contentContainerStyle={{paddingBottom : 180}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Cart;
