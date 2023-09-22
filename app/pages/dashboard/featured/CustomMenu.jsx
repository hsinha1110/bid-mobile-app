import { View, Text } from "react-native";
import React from "react";
import { Divider, Menu, Provider } from "react-native-paper";
import { responsiveWidth } from "react-native-responsive-dimensions";

const CustomMenu = ({ visible, anchor, setVisible, children }) => {
	return (
		<View
			style={{
				paddingTop: 2,
				flexDirection: "row",
				justifyContent: "center",
				marginHorizontal: responsiveWidth(2),
			}}
		>
			<Menu
				visible={visible}
				style={{ top: 150, flex: 1 }}
				onDismiss={() => {
					setVisible(false);
				}}
				anchor={anchor}
			>
				{children}
				{/* <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Menu.Item onPress={() => {}} title="Item 3" /> */}
			</Menu>
		</View>
	);
};

export default CustomMenu;
