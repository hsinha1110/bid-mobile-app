import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../Button/styles';
 const ButtonComp = ({activeOpacity,title, onPress,styleBtn={}, style = {}, disabled}) => {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} disabled={disabled} style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.buttonTitle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComp;
