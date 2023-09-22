import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import imagePath from "../../constants/imagePath";
import styles from "./styles";
import { useState } from "react";

const CustomRatingBar = () => {
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [defaultRating, setDefaultRating] = useState(0);
  return (
    <View style={styles.customRatingBarStyle}>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => setDefaultRating(item)}
          >
            <Image
              style={styles.starImageStyle}
              source={
                item <= defaultRating ? imagePath.FILLED_STAR : imagePath.FILLED_STAR
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomRatingBar;
