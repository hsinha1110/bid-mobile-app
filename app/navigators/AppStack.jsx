import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationPath from "../constants/navigationPath";
import BottomTabStack from "./BottomTabStack";
import Profile from "../pages/dashboard/profile/Profile";
import Password from "../pages/dashboard/profile/Password";
import ProfileField from "../pages/dashboard/profile/ProfileField";
import MyJobs from "../pages/dashboard/featured/MyJobs";
import Featured from "../pages/dashboard/featured/Featured";
import CardDetails from "../pages/dashboard/cart/CardDetails";
import PaymentSuccess from "../pages/dashboard/cart/PaymentSuccess";
import CheckOut from "../pages/dashboard/cart/CheckOut";
const Stack = createNativeStackNavigator();

const AppStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name={navigationPath.BOTTOM_TAB_Stack} component={BottomTabStack} />
				<Stack.Screen name={navigationPath.PROFILE} component={Profile} />
				<Stack.Screen name={navigationPath.PROFILE_FIELD} component={ProfileField} />
				<Stack.Screen name={navigationPath.PASSWORD} component={Password} />
				<Stack.Screen name={navigationPath.My_JOBS} component={MyJobs} />
				<Stack.Screen name={navigationPath.FEATURED} component={Featured} />
				<Stack.Screen name={navigationPath.CARD_DETAILS} component={CardDetails} />
				<Stack.Screen name={navigationPath.PAYMENT_SUCCESS} component={PaymentSuccess} />
				<Stack.Screen name={navigationPath.CHECKOUT} component={CheckOut} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;
