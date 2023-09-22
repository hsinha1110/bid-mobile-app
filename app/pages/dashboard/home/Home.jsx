import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import HeaderCart from "../../../components/Header/HeaderCart";
import imagePath from "../../../constants/imagePath";
import styles from "./styles";
import Colors from "../../../styles/colors";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontFamily from "../../../constants/FontFamily";
import ButtonComp from "../../../components/Button/ButtonComp";
import { useNavigation } from "@react-navigation/native";
import navigationPath from "../../../constants/navigationPath";
const Home = () => {
  const navigation = useNavigation();
  const similarJobs = [
    {
      id: "1",
      image: imagePath.BOTTLE,
      title: "Heat Pump Assessment",
      clock: imagePath.CLOCK,
      time: " 04  :  03  :  40  : 12",
      time_format: "DAY HRS MIN SEC",
      max_bid: "$ 10.00",
      user_name: "Jason Stone",
      profile: imagePath.PROFILEE,
      company: "East Trading Co. ltd",
    },
    {
      id: "2",
      image: imagePath.BOTTLE,
      title: "Heat Pump Assessment",
      clock: imagePath.CLOCK,
      time: " 04  :  03  :  40  : 12",
      time_format: "DAY HRS MIN SEC",
      max_bid: "$ 10.00",
      user_name: "Jason Stone",
      profile: imagePath.PROFILEE,
      company: "East Trading Co. ltd",
    },
    {
      id: "3",
      image: imagePath.BOTTLE,
      title: "Heat Pump Assessment",
      clock: imagePath.CLOCK,
      time: " 04  :  03  :  40  : 12",
      time_format: "DAY HRS MIN SEC",
      max_bid: "$ 10.00",
      user_name: "Jason Stone",
      profile: imagePath.PROFILEE,
      company: "East Trading Co. ltd",
    },
    {
      id: "4",
      image: imagePath.BOTTLE,
      title: "Heat Pump Assessment",
      clock: imagePath.CLOCK,
      time: " 04  :  03  :  40  : 12",
      time_format: "DAY HRS MIN SEC",
      max_bid: "$ 10.00",
      user_name: "Jason Stone",
      profile: imagePath.PROFILEE,
      company: "East Trading Co. ltd",
    },
  ];
  const renderJobsItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View
          style={{
            backgroundColor: Colors.CARD_GREY,
            marginHorizontal: responsiveWidth(2),
            borderRadius: 5,
            width: 300,
            marginBottom: 20,
            borderColor: Colors.BORDER_GREY,
            borderWidth: 1,
            bottom: 10,
            height: 392,
          }}
        >
          <View
            style={{
              padding: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={2}
              style={{
                fontSize: 16,
                fontFamily: FontFamily.POPPINS_SEMIBOLD,
                color: Colors.BLACK,
              }}
            >
              {item.title}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.WHITE,
              padding: 20,
            }}
          >
            <Image
              style={{
                height: responsiveHeight(20),
                width: responsiveWidth(20),
              }}
              source={item.image}
            />
          </View>
          <View
            style={{
              padding: 7,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                marginStart: responsiveWidth(0.7),
              }}
              source={imagePath.CLOCK}
            />
            <View>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={2}
                style={{
                  fontFamily: FontFamily.POPPINS_SEMIBOLD,
                  fontSize: 16,
                  top: 5,
                  color: Colors.NAVY_BLUE,
                  marginStart: responsiveWidth(2),
                }}
              >
                {item.time}
              </Text>

              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={2}
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  fontSize: 12,
                  color: Colors.NAVY_BLUE,
                  marginStart: responsiveWidth(3),
                  top: 3,
                }}
              >
                {item.time_format}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={2}
                style={{
                  fontFamily: FontFamily.POPPINS_SEMIBOLD,
                  fontSize: 10,
                  color: Colors.NAVY_BLUE,
                  top: 4,
                  marginEnd: responsiveWidth(1),
                }}
              >
                Max Bid :
              </Text>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={2}
                style={{
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  fontSize: 12,
                  color: Colors.BLUE,
                  top: 7,
                  marginEnd: responsiveWidth(2),
                }}
              >
                {item.max_bid}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: Colors.WHITE,
                justifyContent: "space-between",
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}
            >
              <View style={{ marginStart: responsiveWidth(2) }}>
                <Image
                  style={{ width: 35, height: 35, top: 5 }}
                  source={imagePath.PROFILEE}
                />
              </View>
              <View
                style={{ flex: 1, marginStart: responsiveWidth(2), top: 5 }}
              >
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
                  style={{
                    fontFamily: FontFamily.POPPINS_SEMIBOLD,
                    fontSize: 16,
                    color: Colors.BLACK,
                  }}
                >
                  {item.user_name}
                </Text>
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
                  style={{
                    fontFamily: FontFamily.POPPINS_REGULAR,
                    fontSize: 12,
                    bottom: 8,
                    color: Colors.BLACK,
                  }}
                >
                  {item.company}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.NAVY_BLUE,
                  width: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomRightRadius: 5,
                }}
              >
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
                  style={{ color: Colors.WHITE }}
                >
                  Buy Bid
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <View style={{ backgroundColor: Colors.WHITE }}>
          <View>
            <HeaderCart
              onPress={() => navigation.goBack()}
              home={imagePath.LOGO}
              menu={imagePath.MENU}
              search={imagePath.SEARCH}
              notification={imagePath.NOTIFICATION}
            />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ marginTop: responsiveHeight(11) }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              backgroundColor: Colors.CARD_HEADER,
              height: 269,
            }}
          >
            <View style={{ marginTop: 31 }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={2}
                style={{
                  color: Colors.BLACK,
                  fontFamily: FontFamily.POPPINS_SEMIBOLD,
                  fontSize: 27,
                  textAlign: "center",
                  lineHeight: 35,
                }}
              >{`Everything to grow \nyour business`}</Text>
            </View>
            <View style={{ marginTop: 31, marginHorizontal: 35 }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={2}
                style={{
                  color: Colors.BLACK,
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  fontSize: 9,
                  textAlign: "center",
                }}
              >{`Cogncise does everything you need to start and grow your business.\n Come join us.`}</Text>
            </View>

            <View
              style={{
                marginHorizontal: responsiveWidth(4),
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 35,
              }}
            >
              <ButtonComp
                onPress={() =>
                  navigation.navigate(navigationPath.LOGIN_WITH_PHONE)
                }
                title={"Get Started"}
                style={{
                  width: 205,
                  height: 40,
                  borderRadius: 5,
                  fontSize: 14,
                  fontFamily: FontFamily.POPPINS_REGULAR,
                  backgroundColor: Colors.NAVY_BLUE,
                }}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 18,
            }}
          >
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={2}
              style={{
                fontFamily: FontFamily.POPPINS_SEMIBOLD,
                color: Colors.NAVY_BLUE,
                fontSize: 16,
              }}
            >
              Most Trusted Bidding Website
            </Text>
          </View>
          <View
            style={{
              marginTop: 14,
              height: 200,
              width: "100%",
            }}
          >
            <Image
              style={{ height: 172, width: "100%" }}
              source={imagePath.BIDDING_WEBSITE}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              bottom: 10,
            }}
          >
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={2}
              style={{
                fontFamily: FontFamily.POPPINS_SEMIBOLD,
                color: Colors.NAVY_BLUE,
                fontSize: 16,
              }}
            >
              Bidding Process
            </Text>
          </View>
          <View
            style={{
              top: 2,
              height: 172,
              width: "100%",
            }}
          >
            <View>
              <Image
                style={{ height: 172, width: "100%" }}
                source={imagePath.BIDDING_PROCESS}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={2}
              style={{
                fontFamily: FontFamily.POPPINS_SEMIBOLD,
                color: Colors.NAVY_BLUE,
                fontSize: responsiveFontSize(2),
                marginBottom: responsiveHeight(4),
              }}
            >
              Current Auctions
            </Text>
          </View>
          <View style={{ bottom: 20 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={similarJobs}
              renderItem={renderJobsItem}
            />
            <View
              style={{
                flexDirection: "row",
                flex: 3,
                width: "100%",
                height: responsiveHeight(40),
                backgroundColor: Colors.NAVY_BLUE,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    marginTop: responsiveHeight(2),
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FontFamily.POPPINS_SEMIBOLD,
                      fontSize: responsiveFontSize(2),
                      color: Colors.WHITE,
                    }}
                  >
                    CONTENT
                  </Text>
                  <TouchableOpacity>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                      style={{
                        fontFamily: FontFamily.POPPINS_LIGHT,
                        fontSize: responsiveFontSize(1.6),
                        color: Colors.WHITE,
                        marginTop: responsiveHeight(4),
                      }}
                    >
                      Jobs
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                      style={{
                        fontFamily: FontFamily.POPPINS_LIGHT,
                        fontSize: responsiveFontSize(1.6),
                        color: Colors.WHITE,
                        marginTop: responsiveHeight(2),
                      }}
                    >
                      Appointments
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                      style={{
                        fontFamily: FontFamily.POPPINS_LIGHT,
                        fontSize: responsiveFontSize(1.6),
                        color: Colors.WHITE,
                        marginTop: responsiveHeight(2),
                      }}
                    >
                      Bid
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                      style={{
                        fontFamily: FontFamily.POPPINS_LIGHT,
                        fontSize: responsiveFontSize(1.6),
                        color: Colors.WHITE,
                        marginTop: responsiveHeight(2),
                      }}
                    >
                      Buy
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                      style={{
                        fontFamily: FontFamily.POPPINS_LIGHT,
                        fontSize: responsiveFontSize(1.4),
                        color: Colors.WHITE,
                        marginTop: responsiveHeight(9.8),
                      }}
                    >
                      Terms & Conditions
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    marginTop: responsiveHeight(2),
                  }}
                >
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={2}
                    style={{
                      fontFamily: FontFamily.POPPINS_SEMIBOLD,
                      fontSize: responsiveFontSize(2),
                      color: Colors.WHITE,
                    }}
                  >
                    HELP
                  </Text>
                  <TouchableOpacity>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                      style={{
                        fontFamily: FontFamily.POPPINS_LIGHT,
                        fontSize: responsiveFontSize(1.6),
                        color: Colors.WHITE,
                        marginTop: responsiveHeight(4),
                      }}
                    >
                      Support
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                      style={{
                        fontFamily: FontFamily.POPPINS_LIGHT,
                        fontSize: responsiveFontSize(1.6),
                        color: Colors.WHITE,
                        marginTop: responsiveHeight(2),
                      }}
                    >
                      FAQs
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                      style={{
                        fontFamily: FontFamily.POPPINS_LIGHT,
                        fontSize: responsiveFontSize(1.4),
                        color: Colors.WHITE,
                        marginTop: responsiveHeight(18.8),
                      }}
                    >
                      Privacy Policy
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    marginTop: responsiveHeight(2),
                  }}
                >
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={2}
                    style={{
                      fontFamily: FontFamily.POPPINS_SEMIBOLD,
                      fontSize: responsiveFontSize(2),
                      color: Colors.WHITE,
                    }}
                  >
                    COMPANY
                  </Text>
                  <TouchableOpacity>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                      style={{
                        fontFamily: FontFamily.POPPINS_LIGHT,
                        fontSize: responsiveFontSize(1.6),
                        color: Colors.WHITE,
                        marginTop: responsiveHeight(4),
                      }}
                    >
                      About
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                      style={{
                        fontFamily: FontFamily.POPPINS_LIGHT,
                        fontSize: responsiveFontSize(1.6),
                        color: Colors.WHITE,
                        marginTop: responsiveHeight(2),
                      }}
                    >
                      Contact Us
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                      style={{
                        fontFamily: FontFamily.POPPINS_LIGHT,
                        fontSize: responsiveFontSize(1.6),
                        color: Colors.WHITE,
                        marginTop: responsiveHeight(2),
                      }}
                    >
                      Our License
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                      style={{
                        fontFamily: FontFamily.POPPINS_LIGHT,
                        fontSize: responsiveFontSize(1.6),
                        color: Colors.WHITE,
                        marginTop: responsiveHeight(2),
                      }}
                    >
                      Pricing
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                      style={{
                        fontFamily: FontFamily.POPPINS_LIGHT,
                        fontSize: responsiveFontSize(1.6),
                        color: Colors.WHITE,
                        marginTop: responsiveHeight(2),
                      }}
                    >
                      What's New
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={2}
                    style={{
                      fontFamily: FontFamily.POPPINS_LIGHT,
                      fontSize: responsiveFontSize(1.4),
                      color: Colors.WHITE,
                      marginTop: responsiveHeight(5),
                    }}
                  >
                    Cookies Policy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
