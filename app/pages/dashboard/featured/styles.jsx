import { StyleSheet } from "react-native";
import Colors from "../../../styles/colors";

const styles = StyleSheet.create({
	safeAreaView: {
		backgroundColor: Colors.WHITE,
		top: 0,
	},
	viewBox: {
		
	},
	slider: {
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "pink",
	},
	dotContainer: {
		backgroundColor: "transparent",
		position: "absolute",
		bottom: 15,
	},
});
export default styles;
