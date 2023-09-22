import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View, TouchableOpacity, Text } from "react-native";
import imagePath from "../constants/imagePath";
import navigationPath from "../constants/navigationPath";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../styles/colors";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utils/Dimensions"; 
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import Home from "../pages/dashboard/home/Home";
 import Profile from "../pages/dashboard/profile/Profile";
import Cart from "../pages/dashboard/cart/Cart"; 
import Jobs from "../pages/dashboard/featured/Jobs";
import {useSelector} from 'react-redux';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabStack = () => {
  //   const dispatch = useDispatch();
  const navigation = useNavigation();
    const {cartDetials} = useSelector(state => state.cartDetails);

  //   useEffect(() => {
  //     dispatch(getUserProfile());
  //   }, []);

  return (
    <>
      <Tab.Navigator
        initialRouteName={navigationPath.HOME}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
          tabBarStyle: {
            // position: 'absolute',
            backgroundColor: Colors.WHITE,
            // borderRadius: 50,
            // bottom: 20,
            // marginHorizontal: 16
            height: 76,
          },
        }}
      >
        {/* <Tab.Screen
          name={navigationPath.HOME}
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Image
                    style={{
                      marginTop: verticalScale(10),
                      tintColor: focused ? Colors.BLUE : null,
                      width: moderateScale(28),
                      height: moderateScale(28),
                    }}
                    source={imagePath.HOME}
                  />
                  <View
                    style={{
                      borderRadius: 2.5,
                      width: 5,
                      height: 5,
                      marginTop: verticalScale(5),
                      backgroundColor: focused ? Colors.BLUE : null,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: verticalScale(5),
                      marginLeft: horizontalScale(10),
                    }}
                  ></View>
                </View>
              );
            },
          }}
        /> */}

        <Tab.Screen
          name={navigationPath.JOBS}
          component={Jobs}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <View style={{ position: "relative" }}>
                    <Image
                      style={{
                        // marginTop: verticalScale(10),
                        tintColor: focused ? Colors.BLUE : null,
                        width: moderateScale(28),
                        height: moderateScale(28),
                        marginTop: responsiveHeight(1),
                      }}
                      source={imagePath.PAPER_PLANE}
                    />
                  </View>
                  <View
                    style={{
                      borderRadius: 2.5,
                      width: 5,
                      height: 5,
                      marginTop: verticalScale(5),
                      backgroundColor: focused ? Colors.BLUE : Colors.null,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: verticalScale(5),
                      marginLeft: horizontalScale(10),
                    }}
                  ></View>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name={navigationPath.CART}
          component={Cart}
          options={{
            tabBarBadge: cartDetials.length,
            tabBarBadgeStyle: {
              backgroundColor: Colors.YELLOW,
              top: 15,
              left: 5,
              alignItems: "center",
              color: Colors.WHITE,
            },
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <View>
                    <Image
                      style={{
                        marginTop: verticalScale(10),
                        tintColor: focused ? Colors.BLUE : Colors.DARK_GREY,
                        width: moderateScale(28),
                        height: moderateScale(28),
                      }}
                      source={imagePath.SHOPPING}
                    />
                  </View>
                  <View
                    style={{
                      borderRadius: 2.5,
                      width: 5,
                      height: 5,
                      marginTop: verticalScale(5),
                      backgroundColor: focused ? Colors.BLUE : Colors.null,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: verticalScale(5),
                      marginLeft: horizontalScale(15),
                    }}
                  ></View>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name={navigationPath.PROFILE}
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Image
                    style={{
                      marginTop: verticalScale(10),
                      tintColor: focused ? Colors.BLUE : Colors.DARK_GREY,
                      width: moderateScale(28),
                      height: moderateScale(28),
                    }}
                    source={imagePath.ACCOUNT}
                  />
                  <View
                    style={{
                      borderRadius: 2.5,
                      width: 5,
                      height: 5,
                      marginTop: verticalScale(5),
                      backgroundColor: focused ? Colors.BLUE : Colors.null,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: verticalScale(5),
                      marginLeft: horizontalScale(10),
                    }}
                  ></View>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};
export default BottomTabStack;
