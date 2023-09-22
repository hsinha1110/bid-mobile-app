import { View, Text, TextInput } from "react-native";
import React from "react";

const TextInputField = ({ placeholder, placeholderTextColor }) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
};

export default TextInputField;
