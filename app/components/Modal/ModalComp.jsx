import { View, Text, Modal, TouchableOpacity, Image, PermissionsAndroid, Alert, Platform } from "react-native";
import React, { useState } from "react";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Colors from "../../styles/colors";
import FontFamily from "../../constants/FontFamily";
import imagePath from "../../constants/imagePath";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import { getUplodedDocuments, getUserProfile, uploadProfileQuestionsDocument } from "../../redux/asyncThunk";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";

const ModalComp = (props) => {
	const { user } = useSelector((state) => state.auth);
	const [sendData, setSendData] = useState(null);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const requestCameraPermission = async () => {
		if (Platform.OS === "ios") {
			camera();
			return;
		}
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
				title: "App Camera Permission",
				message: "App needs access to your camera ",
				buttonNeutral: "Ask Me Later",
				buttonNegative: "Cancel",
				buttonPositive: "OK",
			});
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				camera();
			} else {
				console.log("Camera permission denied");
			}
		} catch (err) {
			console.warn(err);
		}
	};

	const gallery = () => {
		setLoading(true);
		ImagePicker.openPicker({
			width: 300,
			height: 300,
			cropping: true,
			compressImageQuality: 0.7,
		})
			.then((image) => {
				let data = new FormData();
				data.append("attachment", {
					type: image.mime,
					uri: image.path,
					name: image.path.split("/").pop(),
				});
				data.append("question", props.question);
				// setSendData(data);
				dispatch(uploadProfileQuestionsDocument({ data }))
					.unwrap()
					.then((res) => {
						dispatch(
							getUplodedDocuments({
								params: { expand: "question" },
							}),
						);
						dispatch(getUserProfile({ id: user.id }));
						setLoading(false);
						Toast.show({
							type: "success",
							text1: "Great!",
							text2: "File Uploaded Successfully",
						});
						props.onCancel();
					})
					.catch((err) => {
						setLoading(false);
						Toast.show({
							type: "error",
							text1: "File Upload Failed",
							text2: err.error.message,
						});
						console.log(err);
					});
			})
			.catch((err) => {
				Toast.show({
					type: "error",
					text1: err.message,
				});
				setLoading(false);
			});
	};

	const camera = () => {
		setLoading(true);
		ImagePicker.openCamera({
			compressImageMaxWidth: 300,
			compressImageMaxHeight: 300,
			cropping: true,
			compressImageQuality: 0.7,
		})
			.then((image) => {
				let data = new FormData();
				data.append("attachment", {
					type: image.mime,
					uri: image.path,
					name: image.path.split("/").pop(),
				});

				data.append("question", props.question);
				data.append("owner", user.id);

				dispatch(uploadProfileQuestionsDocument({ data }))
					.unwrap()
					.then((res) => {
						dispatch(
							getUplodedDocuments({
								params: { expand: "question" },
							}),
						);
						dispatch(getUserProfile({ id: user.id }));
						setLoading(false);
						Toast.show({
							type: "success",
							text1: "Great!",
							text2: "File Uploaded Successfully",
						});
						props.onCancel();
					})
					.catch((err) => {
						setLoading(false);
						Toast.show({
							type: "error",
							text1: "File Upload Failed",
							text2: err.error.message,
						});
						console.log(err);
					});
			})
			.catch((err) => {
				Toast.show({
					type: "error",
					text1: err.message,
				});
				setLoading(false);
			});
	};

	return (
		<View>
			<Modal onRequestClose={props.modalVisible} visible={props.visible} animationType="slide">
				{loading ? (
					<View
						style={{
							justifyContent: "center",
							height: responsiveHeight(10),
							marginHorizontal: responsiveWidth(8),
							marginTop: responsiveHeight(40),
							borderColor: Colors.DARK_GREY,
						}}
					>
						<ActivityIndicator size={"large"} />
						<View
							style={{
								justifyContent: "center",
								alignContent: "center",
								alignItems: "center",
								marginTop: 20,
							}}
						>
							<Text>Please Wait</Text>
							<Text>File Is Uploading</Text>
						</View>
					</View>
				) : (
					<View
						style={{
							justifyContent: "center",
							backgroundColor: Colors.CARD_GREY,
							height: responsiveHeight(20),
							marginHorizontal: responsiveWidth(8),
							marginTop: responsiveHeight(40),
							borderColor: Colors.DARK_GREY,
						}}
					>
						<TouchableOpacity
							onPress={props.onCancel}
							style={{
								position: "absolute",
								bottom: responsiveHeight(18),
								right: responsiveWidth(-2),
								justifyContent: "flex-end",
								alignItems: "flex-end",
							}}
						>
							<Image style={{ width: 30, height: 30 }} source={imagePath.CANCEL} />
						</TouchableOpacity>
						<View
							style={{
								justifyContent: "center",
								width: "100%",
								marginStart: responsiveWidth(10),
								marginTop: responsiveHeight(2),
							}}
						>
							<TouchableOpacity
								style={{ flexDirection: "row" }}
								onPress={() => requestCameraPermission()}
							>
								<Image style={{ width: 30, height: 30 }} source={props.imgCamera} />
								<View style={{ marginHorizontal: responsiveWidth(4) }}></View>
								<Text
									style={{
										color: Colors.BLACK,
										fontFamily: FontFamily.POPPINS_MEDIUM,
										fontSize: responsiveFontSize(2),
									}}
								>
									{props.camera}
								</Text>
							</TouchableOpacity>

							<View style={{ marginVertical: responsiveWidth(4) }}></View>
							<TouchableOpacity onPress={() => gallery()} style={{ flexDirection: "row" }}>
								<Image style={{ width: 30, height: 30 }} source={props.imgGallery} />

								<View style={{ marginHorizontal: responsiveWidth(4) }}></View>

								<Text
									style={{
										color: Colors.BLACK,
										fontFamily: FontFamily.POPPINS_MEDIUM,
										fontSize: responsiveFontSize(2),
									}}
								>
									{props.gallery}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</Modal>
		</View>
	);
};

export default ModalComp;
