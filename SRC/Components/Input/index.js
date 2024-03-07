import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Colors from '../../Colors';

const Input = ({
  lside,
  entrytyp,
  plas,
  onchang,
  val,
  limag,
  rimg,
  rcolor,
  lcolor,
  sub,
  end
}) => {
  const [secretyp, setsecretyp] = useState(true);
  return (
    <View style={[style.touchbutton]}>
      {lside == 'empty' ? null : (
        <View
          style={[
            style.imageview,
            {
              backgroundColor: limag
                ? lcolor
                  ? lcolor
                  : Colors.trasparentmin
                : Colors.white,
            },
          ]}>
          {limag ? (
            <Image
              source={limag}
              resizeMode="contain"
              style={style.imaginner}
            />
          ) : null}
        </View>
      )}
      <TextInput
        secureTextEntry={entrytyp == 'Securee' ? secretyp : false}
        value={val}
        style={[style.textinput]}
        onSubmitEditing={sub}
        onEndEditing={end}
        onChangeText={onchang}
        placeholder={plas}
        placeholderTextColor={Colors.gray}></TextInput>
      <TouchableOpacity
        onPress={() => {
          entrytyp == 'Securee' ? setsecretyp(!secretyp) : null;
        }}
        style={[
          style.imageview,
          {
            backgroundColor: rimg
              ? rcolor
                ? rcolor
                : Colors.trasparentmin
              : Colors.white,
          },
        ]}>
        {rimg ? (
          <Image source={rimg} resizeMode="contain" style={style.imaginner} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default Input;
const style = StyleSheet.create({
  textinput: {
    width: wp(60),
    height: wp(14),
    color: Colors.black,
    fontSize: 12,
    borderRadius: wp(10),
    backgroundColor: Colors.white,
  },
  imaginner: {
    width: wp(5),
    height: wp(5),
  },
  imageview: {
    width: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(10),

    borderRadius: wp(10),
  },
  touchbutton: {
    width: wp(90),
    height: wp(14),
    // elevation: 2,
    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0.5,
    // },
    // shadowRadius: 1,
    // shadowOpacity: 0.5,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    marginTop: wp(2),
    marginBottom: wp(2),
    borderRadius: wp(10),
  },
});
