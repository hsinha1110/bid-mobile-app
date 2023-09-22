import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationPath from "../constants/navigationPath";
import PointCheckList from "../pages/pointchecklist/PointCheckList";
const Stack = createNativeStackNavigator();

const PointCheckListStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={navigationPath.POINT_CHECK_LIST}
          component={PointCheckList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PointCheckListStack;
