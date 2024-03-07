import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Colors from '../../Colors';
import React from 'react';

const RButton = ({ title, color, onpress, width, height }) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={[
        style.touchbutton,

        {
          width: width ? wp(width) : wp(90),
          height: height ? wp(height) : wp(14),
          backgroundColor: color ? color : Colors.maincolor,
        },
      ]}>
      <Text style={style.textbutton}>{title}</Text>
    </TouchableOpacity>
  );
};

export default RButton;
const style = StyleSheet.create({
  touchbutton: {
    marginTop: wp(4),
    alignItems: 'center',
    // elevation: 2,
    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0.5,
    // },
    // shadowRadius: 1,
    // shadowOpacity: 0.5,
    justifyContent: 'center',
    borderRadius: wp(10),
  },
  textbutton: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
});
