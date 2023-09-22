import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import imagePath from "../../../constants/imagePath";
import Colors from "../../../styles/colors";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ButtonComp from "../../../components/Button/ButtonComp";
import FontFamily from "../../../constants/FontFamily";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import navigationPath from "../../../constants/navigationPath";
import Header from '../../../components/Header/Header'
const CheckOut = (props) => {
  const [changeColor, setChangeColor] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(true);
  const navigation = useNavigation();
  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Do you want to remove item from cart ?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            setConfirmDialog(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  const handleColorChange = () => {
    setChangeColor(!changeColor);
    showConfirmDialog();
  };
  const {batch, price} = props.route.params;
  const data = [
    {
      id: "1",
      title: "Heat Pump Assessmet",
      appt: "3 Appt",
      seller: "East Pvt Ltd",
      price: "$ 1200",
      cube: imagePath.CUBE,
      delete: imagePath.BIN,
    },
    {
      id: "2",
      title: "Heat Pump Assessmet",
      seller: "East Pvt Ltd",
      appt: "3 Appt",

      price: "$ 1200",
      cube: imagePath.CUBE,
      delete: imagePath.BIN,
    },
    {
      id: "3",
      title: "Heat Pump Assessmet",
      seller: "East Pvt Ltd",
      appt: "3 Appt",

      price: "$ 1200",
      cube: imagePath.CUBE,
      delete: imagePath.BIN,
    },
    {
      id: "4",
      title: "Heat Pump Assessmet",
      seller: "East Pvt Ltd",
      appt: "3 Appt",

      price: "$ 1200",
      cube: imagePath.CUBE,
      delete: imagePath.BIN,
    },
    {
      id: "5",
      title: "Heat Pump Assessmet",
      seller: "East Pvt Ltd",
      appt: "3 Appt",

      price: "$ 1200",
      cube: imagePath.CUBE,
      delete: imagePath.BIN,
    },
    {
      id: "6",
      title: "Heat Pump Assessmet",
      seller: "East Pvt Ltd",
      appt: "3 Appt",

      price: "$ 1200",
      cube: imagePath.CUBE,
      delete: imagePath.BIN,
    },
    {
      id: "7",
      title: "Heat Pump Assessmet",
      seller: "East Pvt Ltd",
      appt: "3 Appt",
      price: "$ 1200",
      cube: imagePath.CUBE,
      delete: imagePath.BIN,
    },
    {
      id: "8",
      title: "Heat Pump Assessmet",
      seller: "East Pvt Ltd",
      appt: "3 Appt",
      price: "$ 1200",
      cube: imagePath.CUBE,
      delete: imagePath.BIN,
    },
    {
      id: "9",
      title: "Heat Pump Assessmet",
      seller: "East Pvt Ltd",
      appt: "3 Appt",
      price: "$ 1200",
      cube: imagePath.CUBE,
      delete: imagePath.BIN,
    },
    {
      id: "10",
      title: "Heat Pump Assessmet",
      seller: "East Pvt Ltd",
      appt: "3 Appt",
      price: "$ 1200",
      cube: imagePath.CUBE,
      delete: imagePath.BIN,
    },
  ];
  const renderItem = ({ item }) => {
    console.log(item, "23423423424234")
    return (
      <View
        style={{
          marginHorizontal: responsiveWidth(3),
          borderWidth: 0.5,
          paddingVertical: responsiveHeight(1.5),
          marginVertical: responsiveHeight(0.5),
          borderColor: Colors.BORDER_GREY,
          borderRadius: 5,
        }}
      >
        {/* <View style={{ marginHorizontal:responsiveWidth(2),marginVertical: responsiveHeight(4) }}>
            <Image style={{ width: 18, height: 18 }} source={item.cube} />
          </View> */}

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
          >
            <Image
              style={{ width: 18, height: 18, top: 4, left: 10 }}
              source={imagePath.CUBE}
            />
          </View>
          <View
            style={{
              justifyContent: "space-between",
              flex: 1,
              marginStart: responsiveWidth(8),
            }}
          >
            <Text
              style={{
                fontFamily: FontFamily.POPPINS_REGULAR,
                fontSize: 12,
                color: Colors.BLACK,
                flexWrap: "wrap",
              }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              {item.type_of_requsest}
            </Text>
            <Text
              style={{
                fontFamily: FontFamily.POPPINS_REGULAR,
                fontSize: 10,
                color: Colors.RED,
                flexWrap: "wrap",
              }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              {item.count} Appts
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  fontSize:10,
                  color: Colors.BLACK,
                  flexWrap: "wrap",
                  marginRight : 5
                }}
              >
                Seller :
              </Text>
              <Text
                style={{
                  fontFamily: FontFamily.POPPINS_MEDIUM,
                  fontSize: 10,
                  color: Colors.DARK_GREY,
                  flexWrap: "wrap",
                }}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
              >
                {item.company?.name}
              </Text>
            </View>
          </View>
          <View style={{ marginHorizontal: responsiveWidth(4) }}>
            <Text
              style={{
                fontFamily: FontFamily.POPPINS_MEDIUM,
                fontSize: 10,
                color: Colors.BLACK,
                flexWrap: "wrap",
              }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              ${price}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{ backgroundColor: Colors.WHITE }}>
        <View >
          <Header
            onPress={() => navigation.goBack()}
            image={imagePath.LEFT}
            title="Checkout"
            menu={imagePath.MENU}
            notification={imagePath.NOTIFICATION}
          />
        </View>
      </View>

      <View>
        <View
          style={{
            marginHorizontal: responsiveWidth(4),
            flexDirection: "row",
            marginTop: responsiveHeight(6),
          }}
        ></View>
      </View>

      <View
        style={{
          backgroundColor: Colors.WHITE,
          flex: 1
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={batch || []}
          renderItem={renderItem}
        />
        <View>
        <View
          style={{
            backgroundColor: Colors.CARD_HEADER,
            marginHorizontal: responsiveWidth(3),
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
                fontFamily: FontFamily.POPPINS_BOLD,
                fontSize:14,
                color: Colors.BLACK,
                top: 5,
              }}
              adjustsFontSizeToFit={true}
              numberOfLines={2}
            >
              Total Amount :
            </Text>
            <Text
              style={{
                fontFamily: FontFamily.POPPINS_MEDIUM,
                fontSize: 16,
                color: Colors.BLACK,
                top: 5,
              }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
            $ {price}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 20,
            marginTop:responsiveHeight(2)
          }}
        >
          <ButtonComp
            onPress={() => navigation.navigate(navigationPath.CARD_DETAILS, {price})}
            activeOpacity={1}
            title={"Make Payment"}
            style={{
              width: "70%",
              height: responsiveHeight(6),
              borderRadius: 5,
              fontFamily: FontFamily.POPPINS_REGULAR,
              opacity: 10,
            }}
          />
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckOut;
