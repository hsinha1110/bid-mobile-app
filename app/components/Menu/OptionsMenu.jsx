import { View, Text, Image } from "react-native";
import React from "react";
import { RadioButton, Menu } from "react-native-paper";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Colors from "../../styles/colors";
import imagePath from "../../constants/imagePath";
import FontFamily from "../../constants/FontFamily";

const OptionsMenu = ({ visible, anchor, setVisible }) => {
  const [view, setView] = React.useState("view");
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: responsiveWidth(2),
      }}
    >
      <View>
        <Menu
          visible={visible}
          style={{ top: responsiveHeight(34.4) }}
          onDismiss={() => {
            setVisible(false);
          }}
          anchor={anchor}
        >
          <Menu.Item
            onPress={() => {
              console.log("view");
            }}
            contentStyle={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              width: 10,
            }}
            icon={({ size, color }) => (
              <View style={{ flexDirection: "row" }}>
                <RadioButton.Group
                  onValueChange={(newValue) => setView(newValue)}
                  value={view}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <RadioButton color={Colors.BLUE} value="view" />
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{ width: 15, height: 15 }}
                          source={imagePath.VIEW}
                        />
                        <Text
                          style={{
                            fontFamily: FontFamily.POPPINS_REGULAR,
                            fontSize: responsiveFontSize(1.4),
                            color: Colors.DARK_GREY,
                            marginStart: responsiveWidth(2),
                            alignSelf: "center",
                            top: 2,
                          }}
                        >
                          View
                        </Text>
                      </View>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
            )}
          />
          <Menu.Item
            onPress={() => {
              console.log("edit");
            }}
            contentStyle={{
              width: 20,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginLeft: responsiveWidth(10),
            }}
            icon={({ size, color }) => (
              <View style={{ flexDirection: "row" }}>
                <RadioButton.Group
                  onValueChange={(newValue) => setView(newValue)}
                  value={view}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      <RadioButton color={Colors.BLUE} value="edit" />
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{ width: 15, height: 15 }}
                          source={imagePath.EDIT}
                        />
                        <Text
                          style={{
                            fontFamily: FontFamily.POPPINS_REGULAR,
                            fontSize: responsiveFontSize(1.4),
                            color: Colors.DARK_GREY,
                            marginStart: responsiveWidth(2),
                            alignSelf: "center",
                            top: 2,
                          }}
                        >
                          Edit
                        </Text>
                      </View>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
            )}
          />
          <Menu.Item
            onPress={() => {
              console.log("apply");
            }}
            contentStyle={{
              width: 20,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
            icon={({ size, color }) => (
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  bottom: responsiveHeight(2.4),
                }}
              >
                <RadioButton.Group
                  onValueChange={(newValue) => setView(newValue)}
                  value={view}
                >
                  <View style={{ top: responsiveHeight(2) }}>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <RadioButton color={Colors.BLUE} value="delete" />
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{ width: 15, height: 15 }}
                          source={imagePath.BIN}
                        />
                        <Text
                          style={{
                            fontFamily: FontFamily.POPPINS_REGULAR,
                            fontSize: responsiveFontSize(1.4),
                            color: Colors.DARK_GREY,
                            marginStart: responsiveWidth(2),
                            alignSelf: "center",
                            top: 2,
                          }}
                        >
                          Delete
                        </Text>
                      </View>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
            )}
          />
          <Menu.Item
            onPress={() => {
              console.log("delete");
            }}
            contentStyle={{
              width: 20,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginLeft: responsiveWidth(10),
            }}
            icon={({ size, color }) => (
              <View style={{ flexDirection: "row" }}>
                <RadioButton.Group
                  onValueChange={(newValue) => setView(newValue)}
                  value={view}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          backgroundColor: "center",
                          width: "100%",
                          marginStart: responsiveWidth(2),
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: FontFamily.POPPINS_SEMIBOLD,
                            fontSize: responsiveFontSize(1.4),
                            color: Colors.BLUE,
                          }}
                        >
                          Apply
                        </Text>
                      </View>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
            )}
          />
        </Menu>
      </View>
    </View>
  );
};

export default OptionsMenu;
