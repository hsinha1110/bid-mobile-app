import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Colors from "../../styles/colors";
import FontFamily from "../../constants/FontFamily";
import imagePath from "../../constants/imagePath";

const ModalOffer = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (props) => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <Modal
        onRequestClose={props.modalVisible}
        visible={props.visible}
        transparent={true}
        animationType="slide"
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              justifyContent: "center",
              backgroundColor: Colors.MODAL_COLOR,
              height: responsiveHeight(30),
              marginHorizontal: responsiveWidth(14),
              marginTop: responsiveHeight(35),
              borderColor: Colors.DARK_GREY,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: responsiveHeight(23),
                  backgroundColor: Colors.WHITE,
                  marginTop: responsiveHeight(5),
                  width: "77%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                <TouchableOpacity
                  onPress={props.onCancel}
                  style={{
                    position: "absolute",
                    bottom: responsiveHeight(25),
                    right: responsiveWidth(-6),
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <Image
                    style={{ width: 10, height: 10, tintColor: Colors.BLACK }}
                    source={imagePath.CLOSE}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "80%",
                    padding: 10,
                  }}
                >
                  <View
                    style={{
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FontFamily.POPPINS_REGULAR,
                        fontSize: responsiveFontSize(1.4),
                        color: Colors.BLACK,
                        margin: responsiveWidth(2),
                      }}
                    >
                      Make An Offer
                    </Text>
                  </View>
                  <TextInput
                    style={{
                      fontFamily: FontFamily.POPPINS_REGULAR,
                      fontSize: responsiveFontSize(1),
                      marginStart: responsiveWidth(2),
                      width: "90%",
                      backgroundColor: Colors.WHITE,
                      borderWidth: 0.5,
                      borderColor: Colors.BLUE,
                      borderRadius:5,
                    }}
                    placeholder=""
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "90%",
                      marginStart: responsiveWidth(2),
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.NAVY_BLUE,
                        borderRadius: responsiveWidth(1),
                        height: responsiveHeight(4),
                        marginTop: responsiveHeight(3),
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                          }}
                        >
                          <View style={{ flex: 0 }}>
                            <Text
                              style={{
                                fontFamily: FontFamily.POPPINS_REGULAR,
                                fontSize: responsiveFontSize(1.2),
                                color: Colors.WHITE,
                                marginHorizontal: responsiveWidth(2),
                              }}
                            >
                              Add to cart
                            </Text>
                          </View>
                          <Image
                            style={{
                              width: 18,
                              height: 18,
                              tintColor: Colors.WHITE,
                            }}
                            source={imagePath.SHOPPING}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{ marginVertical: responsiveWidth(4) }}></View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalOffer;
